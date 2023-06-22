"use client";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { setMerchList } from "@/store/Slices/Merch";
import axios from "axios";
import { useEffect } from "react";

function Page() {
  const dispatch = useDispatch();
  const fetchMerchList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      dispatch(setMerchList(response.data.products));
      console.log(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMerchList();
  }, []);

  return (
    <div className="relative inset-0 w-full min-h-screen md:fixed sm:fixed min-[120px]:fixed">
      <Header />
    </div>
  );
}

export default Page;
