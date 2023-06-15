const { Router } = require('express');
const {
    createPurchaseController,
} = require('../controllers/purchase.controller');

const purchaseRoute = Router();

purchaseRoute.post('/', createPurchaseController);

module.exports = purchaseRoute;
