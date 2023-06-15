const { Product, User, Purchase } = require('../db');

// Función para crear una compra
const createPurchase = async (productId, userId) => {
    try {
        // Verificar si el producto y el usuario existen
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);
        // console.log('product:', product);

        if (!product || !user) {
            throw new Error('El producto o el usuario no existen');
        }

        // Crear una nueva instancia de Purchase
        const purchase = await Purchase.create({ productId, userId });

        await purchase.setUser(user);
        await purchase.setProduct(product);

        return purchase;
    } catch (error) {
        throw new Error('Error al crear la compra aa');
    }
};

module.exports = {
    createPurchase,
};
