const { Router } = require('express');
const {
    getAllProductsController,
    getProductByIdController,
    deleteProductController,
    createProductController,
} = require('../controllers/products.controller');

const productRoute = Router();

productRoute.get('/', getAllProductsController);
productRoute.get('/:id', getProductByIdController);
productRoute.post('/', createProductController);
productRoute.delete('/:id', deleteProductController);
// productRoute.put('/:id', updateProduct);

module.exports = productRoute;
