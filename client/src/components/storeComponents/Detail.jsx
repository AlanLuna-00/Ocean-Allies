"use client";
import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@/context/AuthContext";

export default function Test({ product }) {
  const { addToCart, userCart, loadUserCart } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const id = JSON.parse(localStorage.getItem("user")).id;
      loadUserCart(id); // Cargar el carrito del usuario al montar el componente
    }
  }, []);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const handleAddToCart = () => {
    if (!localStorage.getItem("user")) {
      return alert("Debes iniciar sesión para agregar productos al carrito");
    }
    if (
      Object.values(selectedSizes).every((size) => size === 0) ||
      selectedQuantity === 0
    ) {
      return alert("Debes seleccionar al menos una talla y una cantidad");
    }
    // Crear el objeto del producto a agregar al carrito
    const productToAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      color: product.color,
      price: product.price,
      image: product.image,
      sizes: {},
    };

    // Agregar las tallas seleccionadas al objeto del producto
    Object.entries(selectedSizes).forEach(([size, quantity]) => {
      if (quantity > 0) {
        productToAdd.sizes[size] = quantity;
      }
    });

    // Agregar el producto al carrito
    const userId = JSON.parse(localStorage.getItem("user")).id;
    addToCart(productToAdd, userId);
    console.log(userCart);
  };

  const handleSizeChange = (size, e) => {
    const quantity = Number(e.target.value);
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [size]: quantity,
    }));
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.image}
                    className="h-full w-full max-w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-full w-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <div>
              <p className="text-sm leading-none text-gray-600">
                {product.category}
              </p>
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            <h2 className="mt-8 text-base text-gray-900">Sizes</h2>
            <div className="flex items-center justify-center">
              {Object.entries(product.size)
                .sort((a, b) => {
                  const sizeOrder = {
                    XS: 1,
                    S: 2,
                    M: 3,
                    L: 4,
                    XL: 5,
                    XXL: 6,
                  };
                  return sizeOrder[a[0]] - sizeOrder[b[0]];
                })
                .map(([size, stock]) => (
                  <div key={size} className="flex items-center">
                    <button
                      className={`border text-sm leading-none text-gray-600 ${
                        selectedSizes[size]
                          ? "border-indigo-500"
                          : "border-gray-300"
                      } mr-2 rounded-md px-3 py-1`}
                      onClick={() =>
                        setSelectedSizes((prevSelectedSizes) => ({
                          ...prevSelectedSizes,
                          [size]: selectedSizes[size] ? 0 : selectedQuantity,
                        }))
                      }
                    >
                      {size}: {stock.stock}
                    </button>
                    {selectedSizes[size] && (
                      <select
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm leading-none text-gray-600"
                        value={selectedSizes[size]}
                        onChange={(e) => handleSizeChange(size, e)}
                      >
                        {[...Array(stock.stock)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">${product.price}</h1>
                <span className="text-base">C/U</span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
                onClick={handleAddToCart}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  ></path>
                </svg>
                Free shipping worldwide
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <button
                  className={`${
                    showDescriptions
                      ? "border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                      : " border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  } px-4 py-2 rounded-md`}
                  onClick={() => {
                    setShowDescriptions(true);
                    setShowReviews(false);
                  }}
                >
                  Descriptions
                </button>
                <button
                  className={`${
                    showReviews
                      ? "border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                      : "border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  } px-4 py-2 rounded-md`}
                  onClick={() => {
                    setShowDescriptions(false);
                    setShowReviews(true);
                  }}
                >
                  Reviews
                </button>
              </nav>
            </div>

            <div className="mt-8 flow-root sm:mt-12">
              {showDescriptions && (
                <div>
                  <h1 className="mt-8 text-3xl font-bold">{product.name}</h1>
                  <p className="mt-4">{product.description}</p>
                </div>
              )}
              {showReviews && (
                <div>
                  <div className="">
                    {product.reviews.length > 0 ? (
                      <div className="border-b-2">
                        {product.reviews.map((review, index) => (
                          <article
                            key={index}
                            className=" border-b border-gray-300"
                          >
                            <div className="flex items-center mb-5 space-x-4">
                              <img
                                className="w-10 h-10 rounded-full"
                                src=""
                                alt=""
                              />
                              <div className="text-zinc-950 space-y-1 font-medium">
                                <p>{review.userId}</p>
                              </div>
                            </div>
                            <div className="flex items-center mb-1">
                              {Array.from(
                                { length: parseInt(review.rating) },
                                (_, index) => (
                                  <svg
                                    key={index}
                                    className="block h-4 w-4 align-middle text-yellow-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                      className=""
                                    ></path>
                                  </svg>
                                )
                              )}
                            </div>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                              {review.comment}
                            </p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-8 text-3xl font-bold">
                        No hay comentarios
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
