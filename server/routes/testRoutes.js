import express from "express";
import { isFullScreenOut, isTabChange, isTestEnd, testEndpoint } from "../controllers/testController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

import Router from "express";
const router = Router();

router.post("/test", verifyToken, testEndpoint);
router.post("/istab", verifyToken, isTabChange);
router.post("/isfull", verifyToken, isFullScreenOut);
router.post("/isFinish", verifyToken, isTestEnd);

export default router;