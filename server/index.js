import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testRoutes from "./routes/testRoutes.js";


dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(express.json());
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://ieeehack.bitsathy.ac.in'];

// app.use(cors({
//   origin: allowedOrigins
// }));

app.use(cors());

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use("/api", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api", testRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
