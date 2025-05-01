import express from "express";
import CartController  from "../controller/CartController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/add", authMiddleware, CartController.addToCart);
router.get("/", authMiddleware, CartController.getCart);
export default router;
