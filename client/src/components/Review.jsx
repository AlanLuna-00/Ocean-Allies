"use client";
import { useEffect, useState } from "react";
import axios from "axios";

function Review({ userId, productId }) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar solicitud PUT al servidor para actualizar la contraseña del usuario
      await updateUserPasswordHandler(
        formData.rating,
        formData.comment,
        productId,
        userId
      );

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  async function updateUserPasswordHandler(rating, comment, productId, userId) {
    try {
      const response = await axios.post(`http://localhost:8080/api/reviews`, {
        rating,
        comment,
        productId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="text-center">
        <button onClick={openModal} className="text-indigo-600 hover:underline">
          Agregar review
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="dark:bg-gray-600 w-1/2 rounded-lg p-8">
            <div className="text-center mt-4 mb-10 border-b-2 border-gray-500">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-white ">
                Review
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <select
                  name="rating"
                  id="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                >
                  <option value="">-- Calificacion --</option>
                  <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                  <option value="2">⭐⭐ ☆ ☆ ☆</option>
                  <option value="3">⭐⭐⭐ ☆ ☆</option>
                  <option value="4">⭐⭐⭐⭐ ☆</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="text-2xl font-semibold text-gray-700 dark:text-white "
                  htmlFor="comment"
                >
                  Comment:
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  maxLength={255}
                  placeholder="Este producto me cambio la vida!"
                  onChange={handleInputChange}
                  className="block max-h-64 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  className="font-bold bg-sky-500  px-6 py-3 rounded-full mr-2 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
                  type="submit"
                >
                  Guardar
                </button>
                <button
                  className="bg-gray-300  text-gray-800 font-bold px-6 py-3 mr-2 rounded-full transition hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
