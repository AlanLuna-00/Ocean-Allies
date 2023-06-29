const { Router } = require('express');
const {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController,
} = require('../controllers/products.controller');
const upload = require('../multer/multer'); // Asegúrate de que la ruta sea correcta
const verifyJWT = require('../middlewares/verifyJwt');

const productRoute = Router();

productRoute.get('/', getAllProductsController);
productRoute.get('/:id', getProductByIdController);
productRoute.post('/', upload.single('image'), createProductController);
productRoute.delete('/:id', verifyJWT, deleteProductController);
productRoute.put('/:id', verifyJWT, updateProductController);

module.exports = productRoute;
