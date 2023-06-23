import { useState } from 'react';

const CheckoutButton = () => {
    const handleClick = async () => {
        const response = await fetch("/api/create-order", {
            method: "POST",
        });
        const data = await response.json();
        window.location.href = data.preference.init_point;
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