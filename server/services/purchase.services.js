const { Product, User, Purchase } = require('../db');

// Función para crear una compra
const createPurchase = async (productId, userId, sizes) => {
    try {
        // Verificar si el producto y el usuario existen
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            throw new Error('El producto o el usuario no existen');
        }

        const updatedStocks = {};

        for (const { size, quantity } of sizes) {
            if (!product.size[size] || product.size[size].stock <= 0) {
                throw new Error(
                    `No hay suficiente stock disponible para el tamaño ${size}`
                );
            }

            if (quantity > product.size[size].stock) {
                throw new Error(
                    `La cantidad solicitada para el tamaño ${size} excede el stock disponible`
                );
            }

            updatedStocks[size] = product.size[size].stock - quantity;
        }

        const purchase = await Purchase.create({ productId, userId, sizes });

        await purchase.setUser(user);
        await purchase.setProduct(product);

        // Actualizar el stock para los tamaños especificados
        const updatedSizes = { ...product.size };

        for (const { size, quantity } of sizes) {
            updatedSizes[size].stock -= quantity;
        }

        await Product.update(
            {
                size: updatedSizes,
                active: hasAvailableSizes(updatedSizes), // Actualizar el campo 'active'
            },
            {
                where: { id: productId },
            }
        );

        return purchase;
    } catch (error) {
        throw error;
    }
};

const hasAvailableSizes = (sizes) => {
    const sizesArray = Object.values(sizes);
    for (const size of sizesArray) {
        if (size.stock > 0) {
            return true;
        }
    }
    return false;
};

module.exports = {
    createPurchase,
};
