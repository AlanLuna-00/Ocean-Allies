'use client'
import React, { useEffect, useRef, useState } from "react";
// import { validation } from "./validation";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';


export default function Message() {

  const form = useRef();
  
  
  //* ------------------- SWEETALERT ------------------------
  const showSuccess = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  const showError = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Message fail',
      showConfirmButton: false,
      timer: 1500
    })
  }
  //* ------------------- SWEETALERT ------------------------
  
  //*-------------------- EMAILJS ------------------------
  const sendEmail = (event) => {
    event.preventDefault();
    
    const YOUR_SERVICE_ID = 'service_3khjvbt';
    const YOUR_TEMPLATE_ID = 'template_0fpnoce';
    const YOUR_PUBLIC_KEY = 'Dvtl9YLNRNuOmlvn4';
    
    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_PUBLIC_KEY )
    .then((result) => {
      console.log(result.text);
      setIsSent(true);
      showSuccess(); // vetana de alerta exitosa
    })
    .catch((error) => {
        console.log(error.text);
        setIsSent(false);
        showError();  // ventana de alerta de error
      });    
      
      setUserData({
        user_name: '',
        user_email: "",
        message: "",
      });
    };
  //* ------------------- EMAILJS ---------------------------
  //* ------------------- VALIDACION ------------------------
  const [isSent, setIsSent] = useState(false);

  const [userData, setUserData] = useState({
    //* HOOK Acumulador de datos
    user_name: '',
    user_email: "",
    message: "",
  });

  const [error, setError] = useState({});

  function validation (userData) {
    let errors = {};
    if (!userData.user_name || !/^[A-Za-z\s]{2,30}$/.test(userData.user_name )) errors.user_name = "Se requiere un nombre valido";

    if (!userData.user_email || !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(userData.user_email )) errors.user_email = "Se requiere un mail valido";

    if ( !userData.message || userData.message.length > 400) errors.message = "Ingrese el mensaje menor a 400 caracteres"; 

    setError(errors);
  }
  useEffect(() => {
    validation(userData);
  },[userData]);
  //* ------------------- VALIDACION ------------------------
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };


  return (
    <div className="max-w-md mx-auto rounded-lg bg-slate-200 shadow-xl p-6">
    <form ref={form} onSubmit={sendEmail}>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded appearance-none focus:outline-none focus:border-primary focus:ring-primary"
            id="name"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
          {error.user_name && <p className="text-red-500">{error.user_name}</p>}

        </div>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="email">
            Email address
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded appearance-none focus:outline-none focus:border-primary focus:ring-primary"
            id="email"
            name="user_email"
            value={userData.user_email}
            onChange={handleChange}
            type="email"
            placeholder="Email address"
          />
          {error.user_email && <p className="text-red-500">{error.user_email}</p>}

        </div>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded resize-none h-32 appearance-none focus:outline-none focus:border-primary focus:ring-primary"
            id="message"
            name="message"
            value={userData.message}
            onChange={handleChange}
            rows="3"
            placeholder="Your message"
          ></textarea>
          {error.message && <p className="text-red-500">{error.message}</p>}
        </div>

        <button
          type="submit"
          value="Send"
          disabled={Object.keys(error).length > 0}
          className={`w-full px-4 py-2 text-sm font-medium text-gray-100 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary ${
            Object.keys(error).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Send
        </button>

  {/* isSent && <p className="text-green-500">Message sent successfully!</p> */}
      </form>
    </div>
  );
}