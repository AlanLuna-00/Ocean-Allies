// controllers/cartController.js

const cartService = require('../services/cart.services');

// Obtener el carrito de un usuario por su ID
exports.getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { cart, total } = await cartService.getCartByUserId(userId);
        if (!cart) {
            return res.status(204).json({ cart: [] });
        }
        return res.status(200).json({ cart, total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Agregar un item al carrito
exports.addToCart = async (req, res) => {
    const { userId } = req.params;
    const { ...itemData } = req.body;

    try {
        const cartItem = await cartService.addToCart(userId, itemData);
        res.status(200).json({ success: true, cartItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Failed to add item to cart.',
        });
    }
};

// Eliminar un item del carrito
exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.params;

    try {
        await cartService.removeFromCart(cartItemId);
        res.status(200).json({
            message: 'Item removed from cart successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
};

// Eliminar todo el carrito
exports.deleteCart = async (req, res) => {
    const { userId } = req.params;

    try {
        await cartService.deleteCart(userId);
        res.status(200).json({
            message: 'Cart deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete cart' });
    }
};
