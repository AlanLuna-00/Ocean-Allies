const { Router } = require('express');
const data = require('../data.json');

const productRoute = Router();

productRoute.get('/', (req, res) => {
    res.json(data);
});
// productRoute.get('/:id', getProductById);
// productRoute.post('/', createProduct);
// productRoute.delete('/:id', deleteProduct);
// productRoute.put('/:id', updateProduct);

module.exports = productRoute;
