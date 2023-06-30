const { Router } = require('express');
const {
    createPurchaseController,
    getPurchaseController,
} = require('../controllers/purchase.controller');

const purchaseRoute = Router();

purchaseRoute.post('/', createPurchaseController);
purchaseRoute.get('/:id', getPurchaseController)


module.exports = purchaseRoute;
