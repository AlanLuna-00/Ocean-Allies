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
            let total = 0;

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
                total += product.price * quantity;
            }

            if (!hasSufficientStock) {
                continue;
            }

            const purchase = await Purchase.create({
                productId,
                userId,
                sizes,
                quantity: sizes.reduce((acc, curr) => acc + curr.quantity, 0),
                total,
            });

            await purchase.setUser(user);
            await purchase.setProduct(product);

            await Product.update(
                {
                    size: updatedSizes,
                    active: hasAvailableSizes(updatedSizes),
                },
                {
                    where: { id: productId },
                }
            );

            const purchaseWithSizes = {
                purchase: {
                    userId,
                    productId,
                    sizes,
                    quantity: sizes.reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                    ),
                    total,
                },
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
