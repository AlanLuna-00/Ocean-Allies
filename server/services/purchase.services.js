const { Product, User, Purchase } = require('../db');

// Función para crear una compra

const createPurchase = async (productId, userId) => {
    try {
        // Verificar si el producto y el usuario existen
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            throw new Error('El producto o el usuario no existen');
        }

        if (product.stock <= 0) {
            throw new Error(
                'No hay suficiente stock disponible para este producto'
            );
        }

        const purchase = await Purchase.create({ productId, userId });

        await purchase.setUser(user);
        await purchase.setProduct(product);

        await product.decrement('stock', { by: 1 }); // Restar 1 al stock del producto

        return purchase;
    } catch (error) {
        throw error; // Lanzar el error original en lugar de crear uno nuevo
    }
};

module.exports = {
    createPurchase,
};
