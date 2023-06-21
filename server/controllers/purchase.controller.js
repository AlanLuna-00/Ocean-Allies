const { createPurchase } = require('../services/purchase.services');

// Controlador para crear una compra
const createPurchaseController = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const purchase = await createPurchase(productId, userId);
        res.status(201).json({ msg: 'Compra realizada con éxito', purchase });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createPurchaseController,
};
