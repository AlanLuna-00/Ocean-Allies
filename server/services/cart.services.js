// services/cartService.js

const { Cart, CartItem, User, sequelize } = require('../db');

// Obtener el carrito de un usuario por su ID
exports.getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({
        where: { userId: userId },
        include: {
            model: CartItem,
        },
    });

    if (!cart) {
        return { cart: null, total: 0 };
    }

    const cartItems = cart.cartItems;
    let total = 0;

    // Calcular el total sumando el precio por la cantidad de cada tamaño
    cartItems.forEach((item) => {
        const sizes = item.sizes;
        const sizeValues = Object.values(sizes);
        const quantity = sizeValues.reduce((acc, curr) => acc + curr, 0);
        total += item.price * quantity;
    });

    return { cart, total };
};

// Agregar un item al carrito
exports.addToCart = async (userId, itemData) => {
    const { id } = itemData;
    console.log(userId, itemData, id);
    const cart = await Cart.findOne({
        where: { userId: userId },
    });
    console.log(cart);
    if (!cart) {
        const newCart = await Cart.create({ userId: userId });
        return CartItem.create({
            cartId: newCart.id,
            productId: itemData.id,
            // ..itemData menos el id
            name: itemData.name,
            color: itemData.color,
            description: itemData.description,
            image: itemData.image,
            price: itemData.price,
            sizes: itemData.sizes,
        });
    }

    return CartItem.create({
        cartId: cart.id,
        productId: itemData.id,
        // ..itemData menos el id
        name: itemData.name,
        color: itemData.color,
        description: itemData.description,
        image: itemData.image,
        price: itemData.price,
        sizes: itemData.sizes,
    });
};

exports.removeFromCart = async (cartItemId) => {
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
        throw new Error('Cart item not found.');
    }

    await cartItem.destroy();
};

// Eliminar todo el carrito
exports.deleteCart = async (userId) => {
    return Cart.destroy({
        where: { userId: userId },
    });
};
