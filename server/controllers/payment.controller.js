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
                success: 'https://ocean-allies.vercel.app/shop',
                // failure: 'https://ocean-allies-production.up.railway.app/failure',
                // pending: 'https://ocean-allies-production.up.railway.app/pending',
            },
            notification_url:
                'https://10ba-186-158-240-67.ngrok-free.app/webhook',
        });



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

        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something goes wrong' });
    }
};

module.exports = { createOrder, receiveWebhook };
