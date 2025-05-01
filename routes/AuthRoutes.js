import express from "express";
const router = express.Router();
import { getUserInfo, googleLogin } from "../controller/AuthController.js";

router.post("/google", googleLogin);
router.get("/user", getUserInfo);
export default router;
