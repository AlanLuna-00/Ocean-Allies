"use client";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Login = () => {
  const [credentials, setCredentials] = useState({});

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una petición POST al endpoint de login en el backend
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
        credentials: "include",
        redirect: "follow",
      });

      console.log(response);

      if (response.status === 200) {
        setCookie("authToken", response.data.token, {
          secure: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 4,
        });

        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-1/2 px-4 py-8 bg-white rounded shadow-md">
          <h3 className="text-2xl mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
