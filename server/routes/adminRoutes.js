import express from "express";
import { addUser, bulkAddUsers, createQuestionSet, deleteQuestionSet,
    deleteUser, getAllQuestionSets, getAllUsers, replaceQuestionSet, updateUser,
    userDetails, userDownload } from "../controllers/adminController.js";

import { verifyAdmin } from "../middleware/authMiddleware.js";

import Router from "express";
const router = Router();

router.get("/users",verifyAdmin, getAllUsers);
router.post("/add-user", verifyAdmin, addUser);
router.delete("/delete-user/:email", verifyAdmin, deleteUser);
router.post("/user-details", verifyAdmin, userDetails);
router.post("/bulk-add-users", verifyAdmin, bulkAddUsers);
router.post("/update-user", verifyAdmin, updateUser);
router.get("/user-download", verifyAdmin, userDownload);
router.post("/create-qset", verifyAdmin, createQuestionSet);
router.delete("/delete-qset/:set_key", verifyAdmin, deleteQuestionSet);
router.get("/qsets", verifyAdmin, getAllQuestionSets);
router.post("/replace-qset", verifyAdmin, replaceQuestionSet);

export default router;
