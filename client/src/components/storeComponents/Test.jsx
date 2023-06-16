// <Image
//   src={product.image}
//   alt={product.name}
//   width={300}
//   height={300}
//   className="object-cover object-center"
// />
import React from 'react'
import Image from 'next/image'

export default function Test( {product} ) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
      <div className="p-4">

      <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />

      <h2 className="text-xl font-semibold">{product.name}</h2>
      </div>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex justify-between mt-4">
        <p className="text-gray-700">Price: {product.price}</p>
          <p className="text-gray-700">Stock: {product.stock}</p>
          </div>
        <div className="flex justify-between mt-4">
        <p className="text-gray-700">Category: {product.category}</p>
        <p className="text-gray-700">Size: {product.size}</p>
        </div>
        <div className="flex justify-between mt-4">
        <p className="text-gray-700">Color: {product.color}</p>
        </div>
        </div>
        </div>
  )
}
