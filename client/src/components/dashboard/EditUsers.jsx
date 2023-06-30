import { useEffect, useState } from "react";
// useEffect(()=>{
//   return (()=> { accion que quiero ejecutar}
//   },[])

function EditUsers({ user, updateUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
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

  const [checked, setChecked] = useState(formData.role === "admin");

  const handleSwitchChange = () => {
    setChecked(!checked);
    setFormData((prevData) => ({
      ...prevData,
      role: checked ? "user" : "admin",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar los datos del formulario
    updateUser(formData.id, formData.name, formData.email, formData.role);

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
            <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>

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
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={checked}
                  onChange={handleSwitchChange}
                />
                <label className="text-gray-700 font-bold" htmlFor="isActive">
                  Hacer Administrador
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

export default EditUsers;
