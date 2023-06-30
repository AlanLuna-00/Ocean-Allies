const {
    createPurchase,
    getPurchase,
} = require('../services/purchase.services');

// Controlador para crear una compra
const createPurchaseController = async (req, res) => {
    const { userId, productId, sizes } = req.body;
    try {
        const results = await createPurchase([{ productId, userId, sizes }]);
        const successfulPurchases = results.filter((result) => result.purchase);
        if (successfulPurchases.length === 0) {
            res.status(400).json({
                msg: 'No se pudo realizar la compra debido a la falta de stock',
            });
        } else {
            res.status(201).json({
                msg: 'Compra realizada con éxito',
                result: {
                    purchase: successfulPurchases[0].purchase,
                },
            });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getPurchaseController = async (req, res) => {
    const { id } = req.params;

    try {
        const purchase = await getPurchase(id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPurchaseController,
    getPurchaseController,
};
