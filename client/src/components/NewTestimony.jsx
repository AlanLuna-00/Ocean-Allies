import React from "react";
import { useState } from "react";
import { showSuccess, showError } from "./SweetAlerts";
import axios from "axios";

export default function NewTestimony() {
  const [isOpen, setIsOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({ name: false, comment: false,});
  const [formData, setFormData] = useState({ name: "", comment: "",});
  
  
  //* MODAL -----------------
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({ name: "", comment: "" })
    setFormErrors({ name: false, comment: false })
  };
  //* MODAL -----------------
  //* NEW TESTIMONY -----------------
  const newTestimony = async (name, comment) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");
    
    try {
      const res = await axios.post(
        `http://localhost:8080/api/testimony`,
        {
          name: name,
          comment: comment
        },
        {
          headers: {
            Authorization: replaceToken,
          },
        }
      );
      showSuccess(); //SWEETALERT
    } catch (error) {
      console.error('Error creating product:', error.message);
      showError(); //SWEETALERT
    }
  };
  //* NEW TESTIMONY -----------------

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
        name: !formData.name,
        comment: !formData.comment,
    };
      setFormErrors(errors);

    if (!errors.name || !errors.comment) {
      newTestimony(formData.name, formData.comment);
      closeModal();
    }
    return
  };
  //----------------------------------------------------------------
  return (
    <div>
      <div className="p-2 flex justify-center border-r">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={openModal}
        >
          Send Testimony
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-8 shadow-xl">
            <h2 className="text-lg font-bold mb-4 flex justify-center">
              Editar Producto
            </h2>

            <form onSubmit={handleSubmit}>
              <hr className="border border-gray-300 my-4" />
              <div className="grid grid-cols-3 gap-2">
                <div className="mb-4 col-span-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`${formErrors.name ? "border-red-500" : ""}
                    appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div
                className={`mb-4 ${
                  formErrors.comment ? "border-red-500" : ""
                }`}
              >
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Descripcion <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`mb-4 ${
                    formErrors.comment ? "border-red-500" : ""
                  }
                  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  type="text"
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-center">
                {!Object.values(formErrors).every(
                  (error) => error === false
                ) && (
                  <span className="text-red-500">
                    * Complete los campos obligatorios
                  </span>
                )}
              </div>

              <hr className="border border-gray-300 my-4" />

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-md"
                  type="submit"
                >
                  Guardar
                </button>

                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md"
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
