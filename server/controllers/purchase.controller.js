const { createPurchase } = require('../services/purchase.services');

// Controlador para crear una compra
const createPurchaseController = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const purchase = await createPurchase(productId, userId);
        res.status(201).json({ msg: 'Compra realizada con éxito', purchase });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al crear la compra NASHE' });
    }
};

module.exports = {
    createPurchaseController,
};
