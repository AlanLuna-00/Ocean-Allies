"use client";
import useLogin from "@/hooks/useLoginUser";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({});
  const { login, error, isLoading } = useLogin(); // Usa el hook useLogin

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center mt-10">
        <div className="w-1/2 px-4 py-8 bg-white rounded shadow-2xl">
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
              disabled={isLoading} // Deshabilita el botón durante la carga
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {/* dont have account */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link href="/auth/register">
                <span className="text-blue-500 hover:text-blue-600">
                  {" "}
                  Register
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
