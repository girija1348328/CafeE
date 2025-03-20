import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, menuItemId, quantity } = req.body;

    // Check if the item already exists in the cart
    const existingCartItem = await prisma.cart.findFirst({
      where: { userId, menuItemId },
    });

    if (existingCartItem) {
      // If exists, update the quantity
      const updatedCart = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
      return res.json(updatedCart);
    }

    // Otherwise, add new item to cart
    const newCartItem = await prisma.cart.create({
      data: { userId, menuItemId, quantity },
    });
    console.log("Here is the data:",newCartItem)
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item to cart" });
  }
};

// Get all cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { menuItem: true }, // Include item details
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart items" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    const updatedCartItem = await prisma.cart.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    res.json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart item" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await prisma.cart.delete({
      where: { id: cartItemId },
    });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error removing cart item" });
  }
};

// Clear entire cart for a user
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.cart.deleteMany({
      where: { userId },
    });

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart" });
  }
};
