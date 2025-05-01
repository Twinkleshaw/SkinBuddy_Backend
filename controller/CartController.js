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

}

export default new CartController();
