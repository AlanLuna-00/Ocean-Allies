const axios = require('axios');

const checkPaymentStatus = async (paymentId) => {

    try {
        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${paymentId}`,
            {
                headers: {
                    Authorization:
                        'Bearer TEST-2813884876235311-062302-f4bf34cc3eabf346794efec484b6be97-1405925646', // Reemplaza ACCESS_TOKEN con tu token de acceso de Mercado Pago
                },
            }
        );

        const { status } = response.data;
        return status;
    } catch (error) {
        throw error;
    }
};

module.exports = { checkPaymentStatus };
