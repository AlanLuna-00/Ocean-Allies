import Test from "@/components/storeComponents/Test";
import React from "react";
import axios from "axios";
import Image from "next/image";

async function getDetail(id) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/products/${id}`
    );
    const data = response.data;
    console.log("---------DATA----------", data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting product");
  }
}

export default async function page({ params }) {
  const product = await getDetail(params.id);
  console.log("---------Producto---------", product);
  // console.log('---------Params---------',params)

  return (
    <div>
      <Test product={product} />
    </div>
  );
}
