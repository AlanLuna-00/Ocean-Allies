"use client";
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
      await updateUserPasswordHandler(
        id,
        formData.oldPassword,
        formData.newPassword
      );

      console.log("Contraseña actualizada correctamente");
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  async function updateUserPasswordHandler(id, oldPassword, newPassword) {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/password/${id}`,
        {
          oldPassword,
          newPassword,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la contraseña del usuario");
    }
  }

  return (
    <div className="">
      <div className="text-center">
        <button onClick={openModal} className="text-indigo-600 hover:underline">
          Cambiar contraseña
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="dark:bg-gray-600 w-1/2 rounded-lg p-8">
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                Login to your account
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-8 dark:text-white"
            >
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                    type="password"
                    id="oldPassword"
                    placeholder="Your old password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                    type="password"
                    id="newPassword"
                    placeholder="Your new password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className=" font-bold bg-sky-500  px-6 py-3 rounded-full mr-2 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
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

export default ChangePassword;
