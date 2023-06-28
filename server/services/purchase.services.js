const { Product, User, Purchase } = require('../db');

// Función para crear una compra
const createPurchase = async (purchases) => {
    try {
        const results = [];

        for (const { productId, userId, sizes } of purchases) {
            // Verificar si el producto y el usuario existen
            const product = await Product.findByPk(productId);
            const user = await User.findByPk(userId);

            if (!product || !user) {
                results.push({
                    productId,
                    error: 'El producto o el usuario no existen',
                });
                continue;
            }

            let hasSufficientStock = true;
            const updatedSizes = { ...product.size };

            for (const { size, quantity } of sizes) {
                if (
                    !updatedSizes[size] ||
                    updatedSizes[size].stock < quantity
                ) {
                    hasSufficientStock = false;
                    results.push({
                        productId,
                        size,
                        error: `No hay suficiente stock disponible para el tamaño ${size}`,
                    });
                    break;
                }

                updatedSizes[size].stock -= quantity;
            }

            if (!hasSufficientStock) {
                continue;
            }

            const purchase = await Purchase.create({
                productId,
                userId,
                sizes,
            });

            await purchase.setUser(user);
            await purchase.setProduct(product);

            await Product.update(
                {
                    size: updatedSizes,
                    active: hasAvailableSizes(updatedSizes), // Actualizar el campo 'active'
                },
                {
                    where: { id: productId },
                }
            );

            // Add sizes and quantities to the purchase object
            const purchaseWithSizes = {
                productId,
                purchase,
                sizes: sizes.map(({ size, quantity }) => ({
                    size,
                    quantity,
                })),
            };

            results.push(purchaseWithSizes);
        }

        return results;
    } catch (error) {
        throw error;
    }
};

const getPurchase = async (id) => {
    try {
        const purchase = await Purchase.findByPk(id);
        return purchase;
    } catch (error) {
        throw new Error('Fail to get purchase');
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
    getPurchase,
};
