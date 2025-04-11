import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Oily", "Dry", "Combination", "Sensitive"],
      require: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },
    weight: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
