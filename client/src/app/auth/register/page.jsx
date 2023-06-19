"use client";
import { useState } from "react";
import Link from "next/link";
import useRegister from "@/hooks/useRegisterUser";

const Register = () => {
  const [userData, setUserData] = useState({});
  const { register, error, isLoading } = useRegister(); // Usa el hook useRegister

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
      role: "user",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData);
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center mt-10">
        <div className="w-1/2 px-4 py-8 bg-white rounded shadow-2xl">
          <h3 className="text-2xl mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder="Enter name"
              />
            </div>
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
              disabled={isLoading} // Deshabilita el botón durante la carga
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {/* already have account */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link href="/auth/login">
                <span className="text-blue-500 hover:text-blue-600">
                  {" "}
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
