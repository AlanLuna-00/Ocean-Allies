"use client";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

const CheckoutButton = ({ price }) => {
  const { getPurchaseData } = useContext(AuthContext);
  const [id, setId] = useState();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setId(JSON.parse(localStorage.getItem("user")).id);
    }
  }, []);
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `https://ocean-allies-production.up.railway.app/api/payment/create-order`,
        {
          price: price,
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        await axios.delete(
          `https://ocean-allies-production.up.railway.app/api/cart/all/${id}`
        );
        await getPurchaseData();

        const data = response.data;
        window.location.href = data.init_point;
      } else {
        // Manejar el caso de error
        console.error("Error al crear la orden de pago");
      }

      const data = response.data;
      window.location.href = data.init_point;
    } catch (error) {
      console.error(error);
    }
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
