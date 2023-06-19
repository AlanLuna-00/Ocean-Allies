"use client";
import Link from "next/link";
import { useState } from "react";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Cambiar a true para probar login o no
  const [isAdmin, setIsAdmin] = useState(true); // Cambiar a false para probar usuario no administrador
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src="/img/ocean.svg" alt="Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-white text-xl font-bold">Ocean Allies</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-auto flex items-baseline space-x-4">
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
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
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
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
