"use client"
import { useEffect, useState } from "react";
import axios from "axios";

function ChangePassword({ user }) {
  
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    const { id } = user;
    
    try {
      // Verificar que las contraseñas nuevas coincidan
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("Las contraseñas nuevas no coinciden");
      }

      // Enviar solicitud PUT al servidor para actualizar la contraseña del usuario
      await updateUserPasswordHandler(id, formData.oldPassword, formData.newPassword);

      console.log("Contraseña actualizada correctamente");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  async function updateUserPasswordHandler(id, oldPassword, newPassword) {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/password/${id}`, {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la contraseña del usuario");
    }
  }

  return (
    <div>
     
      <div className="text-center">
        <button 
        onClick={openModal} className="text-indigo-600 hover:underline">
          Cambiar contraseña
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Edit password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Old Password:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  New Password:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Confirm Password:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
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



export default ChangePassword;