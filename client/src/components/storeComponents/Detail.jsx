import React from "react";

export default function Test({ product }) {
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="lg:flex lg:flex-row md:flex md:flex-row mx-auto mt-6 max-w-2xl sm:px-6 bg-white">
          <div className="aspect-h-5 aspect-w-4">
            <img
              src={product.image}
              alt={product.image}
              className="max-w-max h-52 w-full object-cover object-center"
            />
          </div>
          {/* Product info */}
          <div className="max-w-2xl px-4 pb-16 pt-10 sm:px-6">
            <div className="border-b border-gray-200 pb-6">
              <p className="text-sm leading-none text-gray-600">
                {product.category}
              </p>
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold leading-7 text-gray-800 mt-2">
                  {product.name}
                </h1>
                <p className="text-3xl tracking-tight text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800">Color</p>
              <div className="flex items-center justify-center">
                <p className="text-sm leading-none text-gray-600">
                  {product.color}
                </p>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200">
              <p className="text-base leading-4 text-gray-800">Sizes</p>
              <br />
              <div className="flex items-center justify-center space-x-4">
                {Object.entries(product.size).map(([size, stock]) => (
                  <button
                    key={size}
                    className="text-sm leading-none text-gray-600 border border-gray-300 rounded-md px-3 py-1"
                  >
                    {size}: {stock.stock}
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  ejemplo reviews
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
