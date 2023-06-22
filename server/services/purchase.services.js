const { Product, User, Purchase } = require('../db');

// Función para crear una compra

const createPurchase = async (productId, userId, size) => {
    try {
        // Verificar si el producto y el usuario existen
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            throw new Error('El producto o el usuario no existen');
        }

        if (!product.size[size] || product.size[size].stock <= 0) {
            throw new Error(
                'No hay suficiente stock disponible para este tamaño'
            );
        }

        const purchase = await Purchase.create({ productId, userId, size });

        await purchase.setUser(user);
        await purchase.setProduct(product);

        const updatedStock = product.size[size].stock - 1;

        await Product.update(
            {
                size: {
                    ...product.size,
                    [size]: {
                        stock: updatedStock,
                    },
                },
            },
            {
                where: { id: productId },
            }
        );

        return purchase;
    } catch (error) {
        throw error; // Lanzar el error original en lugar de crear uno nuevo
    }
};
module.exports = {
    createPurchase,
};
