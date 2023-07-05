import React, { useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "@/components/SweetAlerts";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default function ChangeImage({ user, image, setImage, onImageUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(image);
  const [previewImage, setPreviewImage] = useState(null); // Nuevo estado para la imagen seleccionada

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreviewImage(null);
  };

  const updateImage = async (id, image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.put(
        `https://ocean-allies-production.up.railway.app/api/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


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

    // Generar una URL temporal para la imagen seleccionada
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateImage(user.id, image);
    closeModal();
  };

  return (
    <div>
      <button className="flex flex-col items-center" onClick={openModal}>
        <PencilSquareIcon className="h-6 w-6 text-white" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 w-1/2 rounded-lg p-8 border-2 border-blue-500 outline-blue-500">
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                Change image
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <hr className="border border-gray-300 my-4" />

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        id="preview-image"
                        className="mt-4 max-w-full max-h-64"
                      />
                    )}
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="dropzone-file"
                    className="hidden"
                  />
                </label>
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
