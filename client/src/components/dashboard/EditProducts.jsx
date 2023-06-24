import React from "react";
import { useEffect, useState } from "react";



export default function EditProducts( { product, updateProducts  })  {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

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

  const handleSwitchChange = () => {
    setChecked(!checked);
    setFormData((prevData) => ({
      ...prevData,
      active: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar los datos del formulario
    updateProducts(formData.id, formData.name, formData.description, formData.price, formData.category, formData.gender, formData.image, formData.color, formData.size, formData.active);

    closeModal();
  };

  return (
    <div>
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

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Editar Producto</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                  Price
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                  Descripcion
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                  URL Image
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Color
                </label>
                <select value={formData.color}
                    name="color"
                    onChange={handleInputChange}
                    className="appearance-none rounded-lg border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
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
                  Category
                </label>
                <select value={formData.category}
                    className="appearance-none rounded-lg border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
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
                  Gender
                </label>
                <select value={formData.category}
                    className="appearance-none rounded-lg border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div className="mb-4 flex items-center">
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
