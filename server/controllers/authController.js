// controllers/authController.js
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
 const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM test_users WHERE email=$1 AND password=$2", [email, password]);
        if (user.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });
        
        const item = user.rows[0];
        
        const hasAttended = item.is_participate || item.is_end || item.is_finish;

        res.json({ 
            message: "Login successful", 
            role: item.user_role,
            start_time: item.start_time,
            end_time: item.end_time,
            allotted_duration: item.allotted_duration,
            isParticipate: hasAttended
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};