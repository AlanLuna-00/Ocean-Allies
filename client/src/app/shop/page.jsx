"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMerchList } from "@/store/Slices/Merch";
import axios from "axios";

const Shop = () => {
  const dispatch = useDispatch();
  const merchData = useSelector((state) => state.merch.list);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reqres.in/api/users?page=1");
        const data = response.data.data;
        dispatch(setMerchList(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-2 gap-4">
        {merchData.map((item) => (
          <div key={item.id} className="bg-gray-200 p-4 rounded">
            <img
              src={item.avatar}
              alt={item.first_name}
              className="w-full h-auto mb-2"
            />
            <p className="text-gray-800 font-semibold">
              {item.first_name} {item.last_name}
            </p>
            <p className="text-gray-600">{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
