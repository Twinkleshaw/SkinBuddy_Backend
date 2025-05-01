import express from "express";
const router = express.Router();
import userController from "../controller/UserController.js";
router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;
