const mercadopago = require('mercadopago');

const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token:
            'TEST-6619587556601191-062220-c2d4ba69bb09fd7b7e6f3d555a38011d-1405925790',
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: 'Mi producto',
                unit_price: 100,
                currency_id: 'ARS',
                quantity: 1,
            },
        ],

        back_urls: {
            success: 'http://localhost:8080/success',
            failure: 'http://localhost:8080/failure',
            pending: 'http://localhost:8080/pending',
        },
        notification_url: 'https://ed23-181-9-174-108.sa.ngrok.io/webhook',
    });

    console.log(result);

    res.send(result.body);
};

const receiveWebhook = async (req, res) => {
    const payment = req.query;
    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log(data);
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message });
    }
};

module.exports = { createOrder, receiveWebhook };
