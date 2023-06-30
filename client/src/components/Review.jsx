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
      console.log(error)
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
          <div className="bg-white w-1/2 rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Review</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="rating"
                >
                  Rating:
                </label>
                <select
                  name="rating"
                  id="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1">1 estrella</option>
                  <option value="2">2 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="5">5 estrellas</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="comment"
                >
                  Comment:
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  maxLength={255}
                  onChange={handleInputChange}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  type="submit"
                >
                  Guardar
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
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
