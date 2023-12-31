"use client";
import React, { useEffect, useRef, useState } from "react";
// import { validation } from "./validation";
import emailjs from "emailjs-com";
import { showSuccessMessage, showErrorMessage } from "./SweetAlerts";

export default function Message() {
  const [error, setError] = useState({});
  const form = useRef();

  //*-------------------- EMAILJS ------------------------
  const sendEmail = (event) => {
    event.preventDefault();
    // validation(userData);

    // if (Object.values(error).length > 0) {
    //   return;
    // }
    // ! validacion test ---------------
    const errors = {
      name: !userData.from_name,
      email: !userData.to_email,
      message: !userData.message,
    };
    setError(errors);
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      return;
    }
    // ! validacion test ---------------
    const YOUR_SERVICE_ID = "service_3khjvbt";
    const YOUR_TEMPLATE_ID = "template_0fpnoce";
    const YOUR_PUBLIC_KEY = "Dvtl9YLNRNuOmlvn4";

    emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        form.current,
        YOUR_PUBLIC_KEY
      )
      .then((result) => {
        setIsSent(true);
        showSuccessMessage(); // vetana de alerta exitosa
      })
      .catch((error) => {
        console.log(error.text);
        setIsSent(false);
        showErrorMessage(); // ventana de alerta de error
      });

    setUserData({
      from_name: "",
      to_email: "",
      message: "",
    });
  };
  //* ------------------- EMAILJS ---------------------------
  // //* ------------------- VALIDACION ------------------------
  const [isSent, setIsSent] = useState(false);

  const [userData, setUserData] = useState({
    //* HOOK Acumulador de datos
    from_name: "",
    to_email: "",
    message: "",
  });

  // //* ------------------- VALIDACION ------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  console.log(error);
  return (
    <div className="max-w-md mx-auto rounded-lg bg-slate-200 shadow-xl p-6">
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className={`${
              error.name ? "border-red-500" : ""
            } w-full px-3 py-2 leading-tight text-gray-700 border 
            border-gray-400 rounded appearance-none focus:outline-none focus:border-primary focus:ring-primary`}
            id="name"
            name="from_name"
            value={userData.from_name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="email">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            className={`${
              error.email ? "border-red-500" : ""
            } w-full px-3 py-2 leading-tight text-gray-700 border 
            border-gray-400 rounded appearance-none focus:outline-none focus:border-primary focus:ring-primary`}
            id="email"
            name="to_email"
            value={userData.to_email}
            onChange={handleChange}
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-1 font-bold text-gray-700"
            htmlFor="message"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`${
              error.message ? "border-red-500" : ""
            } w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 
            rounded resize-none h-32 appearance-none focus:outline-none focus:border-primary focus:ring-primary`}
            id="message"
            name="message"
            value={userData.message}
            onChange={handleChange}
            rows="3"
            placeholder="Your message"
          />
        </div>

        <span class="italic">
          Required fields <span className="text-red-500">*</span>
        </span>
        <button
          type="submit"
          value="Send"
          className="w-full px-4 py-2 text-sm font-medium text-gray-100 rounded-md 
                    shadow focus:outline-none focus:ring-2 focus:ring-primary
                  bg-gray-800 hover:bg-gray-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
