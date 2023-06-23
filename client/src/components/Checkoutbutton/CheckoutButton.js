import axios from 'axios';
import { useState } from 'react';


const CheckoutButton = () => {
    const handleClick = async () => {
        const response = await axios.post("http://localhost:8080/api/payment/create-order")
        const data = response.data;
        window.location.href = data.init_point;
    };

    return (
        <button
            id="checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm"
            onClick={handleClick}
        >
            PAY
        </button>
    );
};

export default CheckoutButton;