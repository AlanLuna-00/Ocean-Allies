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
    <div className="m-auto xl:container px-12 sm:px-0">
      <div className="mx-auto h-full w-80">
        <div className="m-auto py-12">
          <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
              Register
            </h3>
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-8 dark:text-white"
            >
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Your user name"
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                  />
                </div>
              </div>
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Your user email"
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                  />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Your user password"
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
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
    </div>
  );
};

export default Register;
