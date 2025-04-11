import express from "express";
import productController from "../controller/ProductController.js";
import upload from "../middleware/multer.js";
const router=express.Router();
router.get("/",productController.getAllProducts);
router.get("/byCategory",productController.getProductByCategory);
router.get("/bestseller",productController.getBestseller);
router.post("/products", upload.single('image'), productController.postAllProduct);
export default router;