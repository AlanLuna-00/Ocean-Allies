const { createPurchase } = require('../services/purchase.services');

// Controlador para crear una compra
const createPurchaseController = async (req, res) => {
    const { purchases } = req.body;
    try {
        const results = await createPurchase(purchases);
        const successfulPurchases = results.filter((result) => result.purchase);
        if (successfulPurchases.length === 0) {
            res.status(400).json({
                msg: 'No se pudo realizar ninguna compra debido a la falta de stock',
            });
        } else {
            res.status(201).json({
                msg: 'Compras realizadas con éxito',
                results,
            });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createPurchaseController,
};
