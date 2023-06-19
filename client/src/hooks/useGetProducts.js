import { setMerchList } from "@/store/Slices/Merch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const useGetProducts = () => {
  const dispatch = useDispatch();
  const merchListData = useSelector((state) => state.merch.list);

  useEffect(() => {
    const fetchMerchList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const data = response.data;
        dispatch(setMerchList(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerchList();
  }, [dispatch]);

  console.log(merchListData);
  return merchListData;
};

export default useGetProducts;
