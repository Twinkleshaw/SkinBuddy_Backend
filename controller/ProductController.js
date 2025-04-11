import Product from "../models/Products.js";
class ProductController {
  async getAllProducts(req, res) {
    try {
      const product = await Product.find({});
      if (!product || product.length === 0) {
        return res.status(404).json({ error: "no products found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async postAllProduct(req, res) {
    try {
      const {
        name,
        description,
        category,
        price,
        stock,
        weight,
        rating,
        bestseller,
      } = req.body;
      const image = req.file.path;
      const productExists = await Product.findOne({ name });
      if (productExists) {
        return res.status(400).json({ message: "product already exists" });
      }
      const newProduct = new Product({
        name,
        description,
        category,
        price,
        image,
        stock,
        weight,
        rating,
        bestseller,
      });
      await newProduct.save();
      res
        .status(201)
        .json({ message: "product created successfully", data: newProduct });
    } catch (error) {
      res
        .status(500)
        .json({ message: "product creation failed", error: error.message });
    
    }
  }

  async getProductByCategory(req, res) {
    try {
        const {category}=req.query;
        if(!category){
            return res.status(401).json({message:"missing params"});
        }
        const findProduct=await Product.find({category});
        if(!findProduct || findProduct.length===0){
            return res.status(404).json({ error: "no products by category found" });
        }
        return res.status(200).json(findProduct);
    } catch (error) {
        res
        .status(500)
        .json({ message: "product creation failed", error: error.message });
 
    }
  }

  async getBestseller(req, res) {
    try {
      const isBestseller = req.query.bestseller;
      if (isBestseller === "true") {
        const products = await Product.find({ bestseller: true });
  
        if (!products || products.length === 0) {
          return res.status(404).json({ error: "No bestseller products found" });
        }
  
        return res.status(200).json(products);
      }
  
      return res.status(400).json({ error: "Missing or invalid bestseller query parameter" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch bestseller products", error: error.message });
    }
  }
  
}

export default new ProductController();
