import express from "express";
import { addUser, bulkAddUsers, createQuestionSet, deleteQuestionSet,
    deleteUser, getAllQuestionSets, getAllUsers, replaceQuestionSet, updateUser,
    userDetails, userDownload } from "../controllers/adminController.js";

import Router from "express";
const router = Router();

router.get("/users", getAllUsers);
router.post("/add-user", addUser);
router.delete("/delete-user/:email", deleteUser);
router.post("/user-details", userDetails);
router.post("/bulk-add-users", bulkAddUsers);
router.post("/update-user", updateUser);
router.get("/user-download", userDownload);
router.post("/create-qset", createQuestionSet);
router.delete("/delete-qset/:set_key", deleteQuestionSet);
router.get("/qsets", getAllQuestionSets);
router.post("/replace-qset", replaceQuestionSet);

export default router;
