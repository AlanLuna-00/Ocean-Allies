const { Router } = require('express');

const productRoute = Router();

productRoute.get('/', getAllProducts);
productRoute.get('/:id', getProductById);
productRoute.post('/', createProduct);
productRoute.delete('/:id', deleteProduct);
productRoute.put('/:id', updateProduct);

module.exports = productRoute;
