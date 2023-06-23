const { Router } = require('express');
const {
    createOrder,
    receiveWebhook,
} = require('../controllers/payment.controller');

const paymentRoute = Router();

paymentRoute.post('/create-order', createOrder);

paymentRoute.get('/success', (req, res) => res.send('creating order'));

paymentRoute.get('/failure', (req, res) => res.send('failure'));

paymentRoute.get('/pending', (req, res) => res.send('pending'));

paymentRoute.post('/webhook', receiveWebhook);

module.exports = paymentRoute;
