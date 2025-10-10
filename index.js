import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import jwt from "jsonwebtoken";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
    res.send("Backend running successfully 🚀");
});

// app.post("/api/register", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
//     res.json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query(
            "SELECT * FROM test_users WHERE email=$1 AND password=$2",
            [email, password]
        );
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const item = user.rows[0];

        res.json({ message: "Login successful", role: item.user_role, isParticipate: item.is_participate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.post("/api/test", async (req, res) => {
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
                    is_fullscreen_out, time, is_finish;
            `;


        const result = await pool.query(query, [preferred_lang, email, is_participate]);

        const user = await pool.query("SELECT questions->preferred_lang FROM test_users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ message: user, res: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/istab", async (req, res) => {
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
});

app.post("/api/isfull", async (req, res) => {
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
});

// app.post("/api/isSubmit", async (req, res) => {
//     const { email, total_marks, questions } = req.body;
//     try {
//         if (!email) return res.status(500).json("Invalid Ceredentials")
//         const query = `
//             UPDATE test_users 
//             SET 
//             questions = $1,
//             total_marks = $2,
//             submitted_at = NOW()
//             WHERE email = $3
//         `;

//         await pool.query(query, [JSON.stringify(questions), total_marks, email]);
//         res.json({ message: "Submitted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.post("/api/isFinish", async (req, res) => {
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
            JSON.stringify(answers), // <-- important for JSONB
            email,
        ]);

        res.json({ message: "Test submitted successfully", data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/admin/users", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, password, email, questions, total_marks, time, preferred_lang, is_tab_change, is_participate
       FROM test_users
       ORDER BY total_marks DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// POST add a new user
app.post("/admin/add-user", async (req, res) => {
    const { name, email, questions } = req.body;

    if (!name || !email || !questions) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO test_users (password, email, questions, total_marks, time)
       VALUES ($1, $2, $3::jsonb, 0, '00:00:00')
       RETURNING id, password, email, questions`,
            [name, email, JSON.stringify(questions)]
        );

        res.status(201).json({ message: "User added successfully", user: result.rows[0] });
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ error: "Failed to add user" });
    }
});


app.delete("/admin/delete-user/:email", async (req, res) => {
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
})


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
