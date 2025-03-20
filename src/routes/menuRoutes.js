import express from "express";
import { getMenu, addMenuItem, getMenuByCategory } from "../controllers/menuController.js"; // Use .js extension for ES Modules

const router = express.Router();

router.get("/", getMenu); // Get all menu items
router.post("/addMenu", addMenuItem); // Add a new menu item
router.get("/:categoryId", getMenuByCategory); // Get menu items by category

export default router;
