"use client";
import { useEffect, useState } from "react";
import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMerchList } from "@/store/Slices/Merch";
import Link from "next/link";
import EditProducts from "@/components/dashboard/EditProducts";
import Pagination from "@/components/Pagination";
import { setFilterList } from "@/store/Slices/Filters";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [isNew, setIsNew] = useState(false);

  const merchList = useSelector((state) => state.merch.list);
  const filters = useSelector((state) => state.filters.list);

  //*-----CLICK Status----
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [paginationData, setPaginationData] = useState({
    totalItems: null,
    totalPages: null,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  });
  // console.log()

  //*-------------- GET PRODUCTS ----------------
  const fetchMerchList = async (active = "") => {
    try {
      const response = await axios.get(
        `https://ocean-allies-production.up.railway.app/api/products?active=${active}`,
        {
          params: filters,
        }
      );
      if (response.status == 204) {
        setError(
          `No results found for the specified filters ${Object.keys(filters)
            .filter((key) => filters[key] !== null)
            .join(", ")}`
        );
      } else {
        setError(null);
      }
      const { products, info } = response.data;
      const { totalItems, totalPages, currentPage, nextPage, previousPage } =
        info;
      setPaginationData({
        totalItems,
        totalPages,
        currentPage,
        nextPage,
        previousPage,
      });
      dispatch(setMerchList(products));
    } catch (error) {
      console.log(error); //cuantos errores puede haber en 1 click, lo sabremos en el proximo episodio....
    }
  };
  //*-------------- GET PRODUCTS ----------------
  //*-------------- PAGINADO -----------------
  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page };
    dispatch(setFilterList(updatedFilters));
  };

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value, page: 1 };
    dispatch(setFilterList(updatedFilters));
  };

  //*-------------- PAGINADO -----------------
  useEffect(() => {
    fetchMerchList(active);
    dispatch(setFilterList(filters));
  }, [filters, active]);
  //*-------------- EDIT PRODUCTS ----------------
  const updateProducts = async (
    id,
    name,
    description,
    price,
    category,
    gender,
    image,
    color,
    size,
    active
  ) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios.put(
      `https://ocean-allies-production.up.railway.app/api/products/${id}`,
      {
        name: name,
        description: description,
        price: price,
        category: category,
        gender: gender,
        image: image,
        color: color,
        size: size,
        active: active,
      },
      {
        headers: {
          Authorization: replaceToken,
        },
      }
    );
    fetchMerchList();
  };
  //*-------------- EDIT PRODUCTS ----------------

  //*-------------- NEW PRODUCTS ----------------
  const newProducts = async (
    name,
    description,
    price,
    category,
    gender,
    image,
    color,
    size,
    active
  ) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios.post(
      `https://ocean-allies-production.up.railway.app/api/products`,
      {
        name: name,
        description: description,
        price: price,
        category: category,
        gender: gender,
        image: image,
        color: color,
        size: size,
        active: active,
      },
      {
        headers: {
          Authorization: replaceToken,
        },
      }
    );
    fetchMerchList();
  };

  const newProduct = {
    // id: product.id,
    name: "",
    description: "",
    price: 0,
    category: "",
    gender: "",
    image: "",
    color: "",
    size: {
      L: {
        stock: 0,
      },
      M: {
        stock: 0,
      },
      S: {
        stock: 0,
      },
      XL: {
        stock: 0,
      },
      XS: {
        stock: 0,
      },
      XXL: {
        stock: 0,
      },
    },
    active: true,
  };
  //*-------------- NEW PRODUCTS ----------------

  return (
    <div id="last-products">
      <div>
        <EditProducts
          product={newProduct}
          newProducts={newProducts}
          isNew={isNew}
          setIsNew={setIsNew}
        />
      </div>

      <h1 className="font-bold py-4 uppercase pl-3">Edit Product:</h1>

      <div className="overflow-x-scroll">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-black/60">
            <tr>
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Price</th>
              <th className="text-left py-3 px-2">Category</th>
              <th className="text-left py-3 px-2">Color</th>
              <th className="text-left py-3 px-2">Gender</th>
              <th
                className={`text-left py-3 px-2
                      ${active ? "text-green-500" : "text-red-500"}
                      cursor-pointer
                       `}
                onClick={() => {
                  setActive(!active);
                }}
              >
                Status
              </th>
              {/* <th className="text-left py-3 px-2">Status</th> */}
              <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {merchList.map((product) => (
              <tr key={product.id} className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        className="rounded-full w-8 h-8"
                        src={product.image}
                        alt=""
                      />
                    </span>
                    <span>{product.name}</span>
                  </div>
                </td>

                <td className="py-3 px-2">{product.price}</td>

                <td className="py-3 px-2">{product.category}</td>

                <td className="py-3 px-2">{product.color}</td>

                <td className="py-3 px-2">{product.gender}</td>

                <td className="py-3 px-2">
                  {product.active ? "Active" : "Inactive"}
                </td>

                <td className="py-3 px-2">
                  <div className="inline-flex items-center space-x-3">
                    <EditProducts
                      product={product}
                      updateProducts={updateProducts}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-8 flex justify-center">
          <Pagination
            currentPage={filters.page}
            totalPages={paginationData.totalPages}
            nextPage={paginationData.nextPage}
            previousPage={paginationData.previousPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
