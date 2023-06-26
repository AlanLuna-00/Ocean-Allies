"use client";

import { Fragment, useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../context/AuthContext"; // Corregir la ruta de importación
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/20/solid";

function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, isAdmin, handleLogout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center ">
            <img src="/img/ocean.svg" alt="Logo" className="w-8 h-8 mr-2" />
            <h1 className="bg-gradient-to-tr from-cyan-100 to-blue-600 bg-clip-text text-transparent text-xl font-bold ">
              Ocean Allies
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-auto flex items-baseline space-x-4">
              <Link href="/profile">Profile</Link>
              <Link
                href="/home"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                About Us
              </Link>
              <Link
                href="/shop"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center justify-center mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded={isMenuOpen}
                    onClick={() => setMenuOpen(!isMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <svg
                      className="w-6 h-6 text-gray-300 hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="z-50 absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                      <ul className="py-2">
                        {isAdmin && (
                          <li>
                            <Link
                              href="/dashboard"
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                              Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <button
                            type="button"
                            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className=" lg:hidden md:hidden top-16 w-56 text-right">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <Bars3BottomRightIcon
                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      <Link
                        href="/home"
                        className="group flex w-full items-center rounded-md px-2 py-1 text-lg"
                      >
                        Home
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/about"
                        className="group flex w-full items-center rounded-md px-2 py-1 text-lg"
                      >
                        About Us
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      <Link
                        href="/shop"
                        className="group flex w-full items-center rounded-md px-2 py-1 text-lg"
                      >
                        Shop
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/contact"
                        className="group flex w-full items-center rounded-md px-2 py-1 text-lg"
                      >
                        Contact
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {isLoggedIn ? (
                        <ul className="">
                          {isAdmin && (
                            <li>
                              <Link
                                href="/dashboard"
                                className="group flex w-full items-center rounded-md px-2 py-1 text-lg"
                              >
                                Dashboard
                              </Link>
                            </li>
                          )}
                          <li>
                            <button
                              type="button"
                              className="group flex w-full items-center rounded-md px-2 py- text-lg"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <Link
                          href="/auth/login"
                          className="group flex w-full items-center rounded-md px-2 py-2 text-lg"
                        >
                          Login
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
