import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, password, email, answers, total_marks, time, preferred_lang, is_tab_change, is_participate, user_role, is_fullscreen_out, assigned_set_id
       FROM test_users
       ORDER BY total_marks DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const addUser = async (req, res) => {
    const { name, email, question_set_key, user_role, start_time, end_time, allotted_duration } = req.body;

    try {
        const setQuery = await pool.query("SELECT id FROM question_sets WHERE set_key = $1", [question_set_key]);
        if (setQuery.rows.length === 0) return res.status(400).json({ message: "Invalid question set selected" });

        const setId = setQuery.rows[0].id;

        const result = await pool.query(
            `INSERT INTO test_users (password, email, assigned_set_id, user_role, start_time, end_time, allotted_duration, total_marks, time)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 0, '00:00:00')
             RETURNING id, email`,
            [name, email, setId, user_role, start_time, end_time, allotted_duration]
        );

        res.status(201).json({ message: "User added successfully", user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ message: "Cerendentials Missing" });
    }

    try {
        await pool.query(`DELETE FROM test_users WHERE email = $1`, [email]);
        res.status(201).json({ message: "User Deleted Successfully" });
    } catch (err) {
        console.error("Error Deleting User", err);
        res.status(500).json({ error: "Failed to Delete" })
    }
};

export const userDetails = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Cerendentials Missing" })
    }

    try {
        const result = await pool.query(`SELECT id, email, password, preferred_lang, answers, total_marks FROM test_users WHERE email = $1`, [email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const updateUser = async (req, res) => {
    const { email, newName, newEmail, total_marks, answers } = req.body;

    if (!email) return res.status(400).json({ error: "Missing Ceredentials" });

    try {
        const result = await pool.query(
            `UPDATE test_users 
       SET total_marks = $1, password = $2, email = $3, answers = $4
       WHERE email = $5
       RETURNING email, total_marks`,
            [total_marks, newName, newEmail, JSON.stringify(answers), email]
        );

        if (result.rowCount === 0)
            return res.status(404).json({ error: "User not found" });

        res.json({ message: "Marks updated successfully!", user: result.rows[0] });
    } catch (error) {
        console.error("Error updating marks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const bulkAddUsers = async (req, res) => {
    const { users, setId, start_time, end_time, allotted_duration } = req.body; 

    if (!users || !Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: "No users provided" });
    }

    try {
        for (const user of users) {
            const { name, email, user_role } = user;
            if (!name || !email || !user_role) continue;

            // Updated to use assigned_set_id instead of questions
            await pool.query(
                `INSERT INTO test_users (password, email, assigned_set_id, user_role, total_marks, time, start_time, end_time, allotted_duration)
                 VALUES ($1, $2, $3, $4, 0, '00:00:00', $5, $6, $7)`,
                [name, email, setId, user_role, start_time || null, end_time || null, allotted_duration || null]
            );
        }

        res.status(201).json({ message: "Users uploaded successfully", count: users.length });
    } catch (err) {
        console.error("Error uploading users:", err);
        res.status(500).json({ error: "Failed to upload users" });
    }
};

export const userDownload = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM test_users ORDER BY total_marks DESC`);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const createQuestionSet = async (req, res) => {
    const { set_key, description, questions, start_time, end_time, allotted_duration } = req.body;
    // Expects questions to be an array: [{ language, question_index, title, buggy_code, expected_output, evaluation_answers }, ...]

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const setRes = await client.query(
            "INSERT INTO question_sets (set_key, description, start_time, end_time, allotted_duration) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [set_key, description, start_time, end_time, allotted_duration]
        );
        const setId = setRes.rows[0].id;

        if (questions && questions.length > 0) {
            const insertQQuery = `
                INSERT INTO test_questions (set_id, language, question_index, title, buggy_code, expected_output, evaluation_answers)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;
            for (const q of questions) {
                await client.query(insertQQuery, [
                    setId,
                    q.language,
                    q.question_index,
                    q.title,
                    q.buggy_code,
                    q.expected_output,
                    JSON.stringify(q.evaluation_answers)
                ]);
            }
        }

        await client.query("COMMIT");
        res.status(201).json({ message: "Question set created successfully!", setId });
    } catch (err) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

export const deleteQuestionSet = async (req, res) => {
    const { set_key } = req.params;
    try {
        const result = await pool.query("DELETE FROM question_sets WHERE set_key = $1", [set_key]);

        if (result.rowCount === 0) return res.status(404).json({ error: "Question set not found" });
        res.json({ message: "Question set and all associated questions deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const replaceQuestionSet = async (req, res) => {
    const { set_key, questions, start_time, end_time, allotted_duration } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const setRes = await client.query("SELECT id FROM question_sets WHERE set_key = $1", [set_key]);
        if (setRes.rows.length === 0) return res.status(404).json({ error: "Question set not found" });
        const setId = setRes.rows[0].id;

        await client.query("DELETE FROM test_questions WHERE set_id = $1", [setId]);

        const insertQQuery = `
            INSERT INTO test_questions (set_id, language, question_index, title, buggy_code, expected_output, evaluation_answers)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        for (const q of questions) {
            await client.query(insertQQuery, [
                setId,
                q.language,
                q.question_index,
                q.title,
                q.buggy_code,
                q.expected_output,
                JSON.stringify(q.evaluation_answers)
            ]);
        }

        await client.query("COMMIT");
        res.json({ message: "Question set replaced/updated successfully!" });
    } catch (err) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

export const getAllQuestionSets = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, set_key, description, start_time, end_time, allotted_duration FROM question_sets ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// export const getQuestionsBySetKey = async (req, res) => {
//     const { set_key } = req.params;
//     try {
//         const setRes = await pool.query("SELECT id FROM question_sets WHERE set_key = $1", [set_key]);
//         if (setRes.rows.length === 0) return res.status(404).json({ error: "Question set not found" });
//         const setId = setRes.rows[0].id;
//         const questionsRes = await pool.query("SELECT language, question_index, title, buggy_code, expected_output, evaluation_answers FROM test_questions WHERE set_id = $1 ORDER BY question_index ASC", [setId]);
//         res.json(questionsRes.rows);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };