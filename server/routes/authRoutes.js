// routes/authRoutes.js
import express from "express";
import { login } from "../controllers/authController.js";

import Router from "express";
const router = Router();

router.post("/login", login);

export default router;