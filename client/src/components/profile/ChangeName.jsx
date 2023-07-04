import React from "react";
import axios from "axios";
import { useState } from "react";
import { showSuccess, showError } from "../SweetAlerts";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default function ChangeName({ user, setUser, updateName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(false);

  //* ------------- OPEN MODAL ------------------
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNewName("");
  };
  //* ------------- OPEN MODAL ------------------
  //* ------------ UPDATE NAME ---------------
  const updateUser = async (id, name) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/users/${id}`, {
        name: name,
      });
      showSuccess(); //SWEETALERT
      updateName(res.data.name);
    } catch (error) {
      console.log(error);
      showError(); //SWEETALERT
    }
  };
  //* ------------ UPDATE NAME ---------------
  //* ------------ HANDLES ---------------
  const handleInputChange = (event) => {
    const inputName = event.target.value;
    setNewName(inputName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(!newName);

    if (newName) {
      updateUser(user.id, newName);
      closeModal();
    }
    return;
  };
  //* ------------ HANDLES ---------------

  //? ---------------------------------------------------------------------------------
  return (
    <div>
      <button className="flex flex-col items-center" onClick={openModal}>
        <PencilSquareIcon
          className="h-6 w-6 text-white ml-1"
          aria-hidden="true"
        />
      </button>
      {/* <div className="p-2 flex justify-center border-r">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={openModal}
        >
          Change Name
        </button>
      </div> */}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/3 rounded-lg p-8 shadow-xl">
            {/* <h2 className="text-lg font-bold mb-4 flex justify-center">
              Change Name
            </h2> */}

            <form onSubmit={handleSubmit}>
              <hr className="border border-gray-300 my-4" />

              <div className={`mb-4 `}>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  New Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  name="newName"
                  value={newName}
                  onChange={handleInputChange}
                />
              </div>

              {error && <span className="text-red-500">Insert Name</span>}

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
