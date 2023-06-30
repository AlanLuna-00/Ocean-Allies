import React from "react";
import { useEffect, useState } from "react";

export default function EditProducts({ product, updateProducts, newProducts, isNew, setIsNew, }) {

  //*----USESTATE--------
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: false,
    price: false,
    color: false,
    category: false,
    gender: false,
    size: false,
    description: false,
    image: false,
  });

  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    gender: product.gender,
    image: product.image,
    color: product.color,
    size: product.size,
    active: product.active,
  });
  //*----USESTATES--------

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //* ------------------ HANDLES -------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //-----------------------
  const handleSizeChange = (e, size) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      size: {
        ...prevData.size,
        [size]: {
          ...prevData.size[size],
          stock: parseInt(value),
        },
      },
    }));
  };

  const handleSwitchChange = () => {
    setChecked(!checked);
    setFormData((prevData) => ({
      ...prevData,
      active: checked,
    }));
  };
  //* ------------------ HANDLES -------------------------------

  //*------------ SUBMIT ------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // validacion(formData, setFormErrors);

    const errors = {
      name: !formData.name,
      price: !formData.price,
      color: !formData.color,
      category: !formData.category,
      gender: !formData.gender,
      size: !Object.values(formData.size).some((size) => size.stock > 0),
      description: !formData.description,
      image: !formData.image,
    };
    setFormErrors(errors);

    const hasErrors = Object.values(errors).every((error) => error === false);
    if (hasErrors) {
      if (formData.id) {
        updateProducts(
          formData.id,
          formData.name,
          formData.description,
          formData.price,
          formData.category,
          formData.gender,
          formData.image,
          formData.color,
          formData.size,
          formData.active
        );
      } else {
        newProducts(
          formData.name,
          formData.description,
          formData.price,
          formData.category,
          formData.gender,
          formData.image,
          formData.color,
          formData.size,
          formData.active
        );
      }
      closeModal();
    }
    return;
  };
  //*------------ SUBMIT------------


  console.log("FORM-ERROR", formErrors);

  return (
    <div>
      {formData.id ? (
        <button
          className="hover:text-blue-500 cursor-pointer"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      ) : (
        <div className="p-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={openModal}
          >
            Crear nuevo producto
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 flex justify-center">
              Editar Producto
            </h2>

            <form onSubmit={handleSubmit}>
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

                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="number"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`${formErrors.price ? "border-red-500" : ""}
                    appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Color <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.color}
                    name="color"
                    onChange={handleInputChange}
                    className={`${formErrors.color ? "border-red-500" : ""}
                    appearance-none rounded-lg border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  >
                    <option value="">Select</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Gray">Gray</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    name="category"
                    onChange={handleInputChange}
                    className={` ${formErrors.category ? "border-red-500" : ""} 
                    appearance-none rounded-lg border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  >
                    <option value="">Select</option>
                    <option value="T-shirts">T-shirts</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Tank tops">Tank tops</option>
                    <option value="Leggings">Leggings</option>
                    <option value="Dresses">Dresses</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    name="gender"
                    onChange={handleInputChange}
                    className={` ${formErrors.gender ? "border-red-500" : ""}
                    appearance-none rounded-lg border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  >
                    <option value="">Select</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
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

              <div className=" text-gray-700 font-bold mb-2 flex justify-center">
                <label>
                  Size <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="grid grid-cols-6 gap-4">
                {Object.keys(formData.size).map((talle) => (
                  <div className="mb-4" key={talle}>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor={talle}
                    >
                      {talle}
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      type="number"
                      id={talle}
                      name={talle}
                      value={formData.size[talle].stock}
                      // name={`size.${talle}.stock`}
                      // value={formData.size[talle].stock}
                      onChange={(e) => handleSizeChange(e, talle)}
                    />
                  </div>
                ))}
              </div>
              {formErrors.size && (
                <span className="text-red-500 flex justify-center">
                  Agrega algun talle
                </span>
              )}

              <hr className="border border-gray-300 my-4" />

              <div
                className={`mb-4 ${formErrors.description ? "border-red-500" : ""
                  }`}
              >
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Descripcion <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`mb-4 ${formErrors.description ? "border-red-500" : ""
                    }
                  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  URL Image <span className="text-red-500">*</span>
                </label>

                <input
                  className={`${formErrors.image ? "border-red-500" : ""}
                    appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>

              <div
                className="mb-4 flex items-center" //? al no tener id se deesabilita para cuando se crea un nuevo producto
              >
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={formData.active}
                  onChange={handleSwitchChange}
                />
                <label className="text-gray-700 font-bold" htmlFor="isActive">
                  Activado
                </label>
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
