import Cart from "../models/Cart.js";

class CartController {
  async addToCart(req, res) {
    try {
      const { items } = req.body;
      const userId = req.user.id;
  
      console.log("Received items:", items);
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "items array is required" });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({
          userId,
          items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity || 1,
          })),
        });
      } else {
        for (const item of items) {
          const existingIndex = cart.items.findIndex((i) =>
            i.productId.equals(item.productId)
          );
  
          if (existingIndex > -1) {
            cart.items[existingIndex].quantity += item.quantity || 1;
          } else {
            cart.items.push({
              productId: item.productId,
              quantity: item.quantity || 1,
            });
          }
        }
      }
  
      await cart.save();
  
      return res.status(200).json({
        success: true,
        message: "Items added to cart",
        cart,
      });
    } catch (err) {
      console.error("Add to cart error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

  async getCart(req, res){
    const userId = req.user.id;

    try {
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) {
        return res.status(200).json({ success: true, items: [] });
      }
      res.status(200).json({ success: true, items: cart.items });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  }

  async removeFromCart(req, res) {
    const productId = req.params.productId;
    const userId = req.user.id;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Filter out the product to remove it
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
  
      await cart.save();
  
      return res.status(200).json({
        success: true,
        message: "Product removed from cart",
        cart,
      });
    } catch (err) {
      console.error("Remove from cart error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateQuantity(req, res) {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;
  
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
  
      return res.status(200).json({ success: true, message: "Quantity updated", cart });
    } catch (error) {
      console.error("Error updating quantity:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  

}

export default new CartController();
