import Test from "@/components/storeComponents/Test";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

async function getDetail(id) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/products/${id}`
    );
    const data = response.data;
    console.log("/Detail---------DATA----------", data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting product");
  }
}

export default async function page({ params }) {
  const product = await getDetail(params.id);
  console.log("/Detail---------Producto---------", product);
  // console.log('---------Params---------',params)

  return (
    <div>
      <Test product={product} />
      <div className="flex justify-center m-4">
        <Link
          href="/shop"
          className=" px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500  "
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
