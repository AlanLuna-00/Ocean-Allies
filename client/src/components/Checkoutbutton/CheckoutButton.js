import axios from "axios";

const CheckoutButton = ({ price }) => {
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        {
          price: price,
        }
      );
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
