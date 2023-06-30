const { Router } = require('express');
const cartController = require('../controllers/cart.controller');

const cartRoute = Router();

cartRoute.get('/:userId', cartController.getCartByUserId);
cartRoute.post('/:userId', cartController.addToCart);
cartRoute.delete('/:cartItemId', cartController.removeFromCart);
cartRoute.delete('/all/:userId', cartController.deleteCart);

module.exports = cartRoute;
