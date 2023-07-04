"use client"
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import ChangePassword from "@/components/ChangePassword";
import Review from "@/components/Review";
import { showSuccess, showError } from "@/components/SweetAlerts";
import ChangeImage from "@/components/profile/ChangeImage";

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [buy, setBuy] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpdate = () => {
    // Actualizar la imagen en el componente Profile sin recargar la página
    const updatedUser = { ...user, image: URL.createObjectURL(image) };
    setUser(updatedUser);
  };

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
          setLoading(true);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, []);

  return (
    <div className="bg-gray-100 ">
      {isLoggedIn ? (
        <div className="flex items-center justify-center m-20 ">
          <div className="flex flex-col md:flex-row shadow-2xl dark:bg-gray-800 rounded-xl max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ">
            <div className="md:w-1/3">
              <div className=" md:top-8 -lg p-4 mb-4">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full mt-6">
                    <div className="relative">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="Imagen de perfil"
                          className="w-14 h-14 rounded-full"
                        />
                      ) : (
                        <img
                          src="/img/user.png"
                          alt="Imagen por defecto"
                          width={96}
                          height={96}
                          className="w-14 h-14 rounded-full"
                        />
                      )}
                    </div>
                  </div>

                  <ChangeImage
                    user={user}
                    image={image}
                    setImage={setImage}
                    onImageUpdate={handleImageUpdate}
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                    {user.name}
                  </h3>
                </div>
                <hr className="my-4" />
                <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                  <div className="text-lg font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono ">
                    <ChangePassword user={user} />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className=" rounded-lg p-4 mb-4">
                <h3 className="text-lg font-bold flex justify-center text-white mb-4">
                  Purchase history
                </h3>
                <div className="pt-6 mx-6 mt-6 text-center ">
                  <div className="flex flex-col justify-center">
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <div
                          key={index}
                          className="flex justify-between flex-col py-4 border-b border-gray-300"
                        >
                          <div className="flex items-center">
                            <Link
                              href={`/detail/${product.id}`}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <div className="relative w-24 h-24 overflow-hidden rounded-md mr-4 hover:scale-110 ">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition duration-300 ease-in-out transform"
                                />
                              </div>
                            </Link>
                            <div>
                              <p className="text-gray-400 font-medium">
                                {product.name}
                              </p>
                              <p className="text-gray-400 font-semibold">
                                {buy[index].sizes.map((size, i) => (
                                  <p
                                    key={i}
                                    className="text-gray-400 font-medium"
                                  >
                                    {size.size}: {size.quantity}
                                  </p>
                                ))}
                                <p className="text-gray-400 font-medium">
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
                          No products were found.
                        </p>
                        <Link
                          href="/shop"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                        >
                          Go to the store
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            You are not logged in.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
