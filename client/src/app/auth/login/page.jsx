"use client";
import useLogin from "@/hooks/useLoginUser";
import Link from "next/link";
import { useState } from "react";
import { validationLogin } from "@/components/validationLogin";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [credentialsError, setCredentialsError] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, error, isLoading } = useLogin(); // Usa el hook useLogin

  // const handleChange = (e) => {
  //   setCredentials({
  //     ...credentials,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    validationLogin(
      { ...credentials, [name]: value },
      credentialsError,
      setCredentialsError
    ); //! Se hace un destructuring "{...userData, [name]: value}" de "userData" para asegurarse que utilice los valores recientes de userData para la validacion
  };

  const isFormIncomplete =
    credentials.email === "" || credentials.password === "";

  return (
    <div className="m-auto xl:container px-12 sm:px-0">
      <div className="mx-auto h-full sm:w-max">
        <div className="m-auto py-12">
          <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
              Login to your account
            </h3>
            <div className="mt-12 flex flex-wrap sm:grid gap-6 ">
              <button
                onClick={loginWithGoogle}
                className=" w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700"
              >
                <div className="w-max mx-auto flex items-center justify-center space-x-4">
                  <img src="/img/google.png" className="w-5" alt="" />
                  <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
                    With Google
                  </span>
                </div>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-8 dark:text-white"
            >
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                  />
                </div>
                <span className="text-sm  text-red-600 ">
                  {credentialsError.email}
                </span>
              </div>

              <div>
                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Your password"
                    className="w-full bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition"
                  />
                </div>
                <span className="text-sm  text-red-600 ">
                  {credentialsError.password}
                </span>
                <div className="flex flex-col items-end">
                  <button type="reset" className="-mr-3 w-max p-3">
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Forgot password ? no disponible aun
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || isFormIncomplete}
                  className={`w-full rounded-full h-11 flex items-center justify-center px-6 py-3 transition  focus:bg-sky-600 active:bg-sky-800 ${
                    isLoading || isFormIncomplete
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-sky-500 dark:bg-sky-400"
                  }`}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {/* dont have account */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?
                    <Link href="/auth/register">
                      <span className="text-blue-500 hover:text-blue-600">
                        Register
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
            <div className="space-x-4 text-center">
              <span>&copy; 2023 Ocean Allies</span>
              <a
                href="#"
                className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
              >
                Privacy & Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
