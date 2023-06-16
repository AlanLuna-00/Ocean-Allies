"use client"
import Link from "next/link";
import { useState } from "react";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión, se inicializa como falso

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
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
              {/* Verificar si el usuario ha iniciado sesión */}
              {isLoggedIn ? (
                <>
                  <img
                    src="/img/Alan.jpeg" // Ruta de la foto de perfil del usuario
                    alt="User Photo"
                    className="w-8 h-8 rounded-full"
                  />
                  <button
                    className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
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