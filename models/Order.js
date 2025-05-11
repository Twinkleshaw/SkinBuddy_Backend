import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      road: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
