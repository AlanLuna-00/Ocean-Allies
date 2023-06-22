import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Importa la configuración de Stripe
const { publicKey } = require('../stripe.config');

// Carga la instancia de Stripe
const stripePromise = loadStripe(publicKey);

const CheckoutForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            // Crea una sesión de pago en el backend
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: 'PRODUCTO_ID', // Reemplaza con el ID de tu producto
                    amount: 1000, // Reemplaza con el monto en centavos (ejemplo: 1000 para $10.00)
                }),
            });

            const session = await response.json();

            // Redirige al usuario a la página de pago de Stripe
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (error) {
                console.error(error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                {isLoading ? 'Procesando...' : 'Comprar'}
            </button>
        </div>
    );
};

export default CheckoutForm;
