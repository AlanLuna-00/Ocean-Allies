"use client";
import { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
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
