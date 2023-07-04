import React, { useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "@/components/SweetAlerts";

export default function ChangeImage({ user, image, setImage, onImageUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(image);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateImage = async (id, image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:8080/api/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product created:", response.data);
      showSuccess();
      setImageUrl(response.data.image); // Actualizar la URL de la imagen

      onImageUpdate();
    } catch (error) {
      console.error("Error creating product:", error.message);
      showError();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateImage(user.id, image);
    closeModal();
  };

  return (
    <div>
      <div className="p-2 flex justify-center border-r">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={openModal}
        >
          Change Image
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-8 shadow-xl">
            <h2 className="text-lg font-bold mb-4 flex justify-center">
              Change Image
            </h2>

            <form onSubmit={handleSubmit}>
              <hr className="border border-gray-300 my-4" />

              <div className={`mb-4 `}>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  New Image
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <hr className="border border-gray-300 my-4" />

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-md"
                  type="submit"
                >
                  Save
                </button>

                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
