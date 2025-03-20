import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js"; // Use .js extension for ES Modules

const router = express.Router();

router.post("/createCategory", createCategory); // Create a category
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategoryById); // Get a single category by ID
router.put("/:id", updateCategory); // Update a category
router.delete("/:id", deleteCategory); // Delete a category

export default router;
