import express from "express";
import { createOrder, getUserOrders, updateOrderStatus } from "../controllers/orderController.js"; // Use .js extension for ES Modules

const router = express.Router();

router.post("/createOrder", createOrder); // ✅ Create a new order
router.get("/:userId", getUserOrders); // ✅ Get all orders for a user
router.put("/:orderId/status", updateOrderStatus); // ✅ Update order status

export default router;
