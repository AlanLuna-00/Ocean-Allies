"use client";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import ChangePassword from "@/components/ChangePassword";
import Review from "@/components/Review";

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [buy, setBuy] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Accedo a la información del usuario
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const id = JSON.parse(localStorage.getItem("user")).id;

      async function fetchData() {
        try {
          // Obtener usuario
          const token = localStorage.getItem("token");
          const replaceToken = token.replace(/['"]+/g, "");
          const res = await axios.get(`http://localhost:8080/api/users/${id}`, {
            headers: {
              Authorization: replaceToken,
            },
          });
          setUser(res.data);
          setBuy(res.data.purchases);

          // Obtener productos comprados
          const productIds = res.data.purchases.map((item) => item.productId);
          const productRequests = productIds.map((id) =>
            axios.get(`http://localhost:8080/api/products/${id}`)
          );
          const responses = await Promise.all(productRequests);
          const products = responses.map((response) => response.data);
          setProducts(products);
          setTimeout(() => {
            setLoading(true);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();
    }
  }, []);

  // Pop-up para cambiar contraseña (modal).

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading ? (
        isLoggedIn ? (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="md:sticky md:top-8 bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center">
                    {user.image ? (
                      <img src={user.image} alt="Imagen de perfil" />
                    ) : (
                      <img
                        src="/img/user.png"
                        alt="Imagen por defecto"
                        width={96}
                        height={96}
                      />
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {user.name}
                    </h2>
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
              <div className="md:w-2/3">
                <ChangePassword user={user} />
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-bold flex justify-center text-gray-800 mb-4">
                    Historial de compra
                  </h3>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-4 border-b border-gray-300"
                      >
                        <div className="flex items-center">
                          <Link
                            href={`/detail/${product.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <div className="relative w-24 h-24 overflow-hidden rounded-md mr-4 hover:scale-110">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition duration-300 ease-in-out transform"
                              />
                            </div>
                          </Link>
                          <div>
                            <p className="text-gray-600 font-medium">
                              {product.name}
                            </p>
                            <p className="text-gray-800 font-semibold">
                              {buy[index].sizes.map((size, i) => (
                                <p
                                  key={i}
                                  className="text-gray-600 font-medium"
                                >
                                  {size.size}: {size.quantity}
                                </p>
                              ))}
                              <p className="text-gray-600 font-medium">
                                Total: ${buy[index].total}
                              </p>
                            </p>
                          </div>
                        </div>
                        <Review userId={user.id} productId={product.id} />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-lg font-medium mb-2">
                        No se encontraron productos.
                      </p>
                      <Link
                        href="/shop"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                      >
                        Ir a la tienda
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">
              No estás logeado.
            </h1>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">Cargando...</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
