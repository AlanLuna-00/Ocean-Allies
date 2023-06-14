const {
    getAllProducts,
    getProductsById,
} = require('../services/product.services');

const getAllProductsController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 4;
        const category = req.query.category || null;
        const price = req.query.price || null;
        const size = req.query.size || null;

        const products = await getAllProducts(
            page,
            pageSize,
            category,
            price,
            size
        );
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error getting products' });
    }
};

const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getProductsById(id);
        response
            ? res.status(200).json(response)
            : res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error getting a product' });
    }
};

module.exports = {
    getAllProductsController,
    getProductByIdController,
};
