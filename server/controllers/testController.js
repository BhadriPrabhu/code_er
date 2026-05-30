import pool from "../config/db.js";

export const testEndpoint = async (req, res) => {
    const { email, preferred_lang, is_participate } = req.body;

    try {
        if (!email && !preferred_lang) return res.status(500).json({ message: "Credentials Missing" });

        const query = `
            UPDATE test_users
            SET preferred_lang = $1,
                is_participate = $3
            WHERE email = $2
            RETURNING id, email, password, preferred_lang, total_marks,
                      is_participate, is_tab_change, is_end,
                      is_fullscreen_out, time, is_finish, assigned_set_id, start_time, end_time, allotted_duration; 
        `;

        const updateResult = await pool.query(query, [preferred_lang, email, is_participate]);

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = updateResult.rows[0]; // Fix: Define user

        // Fix: Define the actual query string to fetch questions
        const questionQuery = `
            SELECT * FROM test_questions 
            WHERE set_id = $1 AND language = $2
            ORDER BY question_index ASC;
        `;

        const questionsResult = await pool.query(questionQuery, [user.assigned_set_id, preferred_lang]);

        res.json({
            success: true,
            questions: questionsResult.rows,
            userConfig: user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const isTabChange = async (req, res) => {
    const { email, is_tab_change, is_end } = req.body;
    try {
        if (!email) return res.status(500).json("Invalid Ceredentials")
        const query = `
            UPDATE test_users
            SET is_tab_change = $1,
                is_end = $3
            WHERE email = $2;
            `;

        const result = await pool.query(query, [is_tab_change, email, is_end]);
        res.json({ message: "Is Tab Change is Recorded" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const isFullScreenOut = async (req, res) => {
    const { email, is_fullscreen_out, is_end } = req.body;
    try {
        if (!email) return res.status(500).json("Invalid Ceredentials")
        const query = `
            UPDATE test_users
            SET is_fullscreen_out = $1,
                is_end = $3
            WHERE email = $2;
            `;

        await pool.query(query, [is_fullscreen_out, email, is_end]);
        res.json({ message: "Is Full Screen Change is Recorded" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const isTestEnd = async (req, res) => {
    const { email, total_marks, is_finish, is_end, time, answers } = req.body;
    try {
        if (!email) return res.status(400).json({ error: "Invalid Credentials" });

        const query = `
      UPDATE test_users 
      SET 
        is_finish = $1,
        is_end = $2,
        time = $3,
        total_marks = $4,
        answers = $5
      WHERE email = $6
      RETURNING id, email, total_marks, answers, is_finish, is_end, time;
    `;

        const result = await pool.query(query, [
            is_finish,
            is_end,
            time,
            total_marks,
            JSON.stringify(answers),
            email,
        ]);

        res.json({ message: "Test submitted successfully", data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};