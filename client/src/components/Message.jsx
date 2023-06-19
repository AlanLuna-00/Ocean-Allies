'use client'
import React, { useRef, useState } from "react";
import { validation } from "./validation";
import emailjs from "emailjs-com";

export default function Message() {

  const form = useRef();
  
  //* ------------------- VALIDACION ------------------------
  const [isSent, setIsSent] = useState(false);

  const [userData, setUserData] = useState({
    //* HOOK Acumulador de datos
    user_name: '',
    user_email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    //* HOOK Acumulador de errores
    user_name: '',
    user_email: "",
    message: "",
  });
  //* ------------------- VALIDACION ------------------------
 

  const sendEmail = (event) => {
    event.preventDefault();

    const YOUR_SERVICE_ID = 'service_3khjvbt';
    const YOUR_TEMPLATE_ID = 'template_0fpnoce';
    const YOUR_PUBLIC_KEY = 'Dvtl9YLNRNuOmlvn4';

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_PUBLIC_KEY )
      .then((result) => {
        console.log(result.text);
        setIsSent(true);
      })
      .catch((error) => {
        console.log(error.text);
        setIsSent(false);
      });    

    setUserData({
      user_name: '',
      user_email: "",
      message: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    validation({ ...userData, [name]: value }, errors, setErrors);
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
          {errors.user_name && <p className="text-red-500">{errors.user_name}</p>}

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
          {errors.user_email && <p className="text-red-500">{errors.user_email}</p>}

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
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </div>

        <button
        type="submit"
        value="Send"
          className="bg-gray-800 w-full px-4 py-2 text-sm font-medium text-gray-100 bg-primary rounded-md shadow hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Send
        </button>
        {isSent && <p className="text-green-500">Message sent successfully!</p>}
      </form>
    </div>
  );
}