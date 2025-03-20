import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMenu = async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items" });
  }
};

// ✅ Create a new menu item
export const addMenuItem = async (req, res) => {
  try {
    const { name, price, categoryId, description, imageUrl, available } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        available,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    res.status(201).json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get menu items by categoryId
export const getMenuByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    const menuItems = await prisma.menuItem.findMany({
      where: { categoryId },
    });

    if (menuItems.length === 0) {
      return res.status(404).json({ message: "No menu items found for this category" });
    }

    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    res.status(500).json({ error: error.message });
  }
};
