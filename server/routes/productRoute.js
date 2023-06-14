const { Router } = require('express');
const {
    getAllProductsController,
    getProductByIdController,
} = require('../controllers/products.controller');

const productRoute = Router();

productRoute.get('/', getAllProductsController);
productRoute.get('/:id', getProductByIdController);
// productRoute.post('/', createProduct);
// productRoute.delete('/:id', deleteProduct);
// productRoute.put('/:id', updateProduct);

module.exports = productRoute;
