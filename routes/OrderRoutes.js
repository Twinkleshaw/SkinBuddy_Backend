import express from "express";
import { createOrder, getUserOrders } from "../controller/OrderController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);

export default router;
