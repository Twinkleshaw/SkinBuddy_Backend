import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    // Fetch user cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { paymentMethod, shippingAddress } = req.body;

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    // Create new order
    const order = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      subtotal,
      paymentMethod,
      shippingAddress,
    });

    await order.save();

    // Optional: Clear cart after placing order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};
