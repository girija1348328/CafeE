import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js"; // Import correctly

const router = express.Router();

router.post("/add", addToCart); // Add item to cart
router.get("/:userId", getCartItems); // Get user's cart items
router.put("/update", updateCartItem); // Update cart item quantity
router.delete("/remove/:cartItemId", removeCartItem); // Remove specific item
router.delete("/clear/:userId", clearCart); // Clear all items

export default router;
