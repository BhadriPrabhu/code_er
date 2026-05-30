import express from "express";
import { isFullScreenOut, isTabChange, isTestEnd, testEndpoint } from "../controllers/testController.js";

import Router from "express";
const router = Router();

router.post("/test", testEndpoint);
router.post("/istab", isTabChange);
router.post("/isfull", isFullScreenOut);
router.post("/isFinish", isTestEnd);

export default router;