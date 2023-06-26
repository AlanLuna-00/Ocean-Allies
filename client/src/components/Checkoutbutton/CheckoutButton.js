import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

const CheckoutButton = ({ price }) => {
  const { clearUserCart, getPurchaseData } = useContext(AuthContext);
  const handleClick = async () => {
    try {
      const response = await axios
        .post("http://localhost:8080/api/payment/create-order", {
          price: price,
        })
        .then((response) => {
          const purchaseData = getPurchaseData();
          axios.post("http://localhost:8080/api/purchase", purchaseData);
        });
      clearUserCart();
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
