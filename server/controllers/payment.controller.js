const mercadopago = require('mercadopago');

const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token:
            'TEST-2813884876235311-062302-f4bf34cc3eabf346794efec484b6be97-1405925646',
    });
    try {
        const { price } = req.body;
        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: 'Mi producto',
                    unit_price: price,
                    currency_id: 'ARS',
                    quantity: 1,
                },
            ],
            back_urls: {
                success: 'http://localhost:3000',
                // failure: 'http://localhost:8080/failure',
                // pending: 'http://localhost:8080/pending',
            },
            notification_url:
                'https://10ba-186-158-240-67.ngrok-free.app/webhook',
        });

        // console.log("este es result", result);

        res.send(result.body);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' });
    }
};

const receiveWebhook = async (req, res) => {
    try {
        const payment = req.body;
        console.log('ESTE ES PAYMENT', payment);
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log(data);
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something goes wrong' });
    }
};

module.exports = { createOrder, receiveWebhook };
