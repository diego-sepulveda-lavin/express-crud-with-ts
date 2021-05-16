import { Router } from "express";
const router = Router();

import { createNewUser, deleteUserById, getUserById, getUsers, updateUserById } from "../controllers/user.controller";

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createNewUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
