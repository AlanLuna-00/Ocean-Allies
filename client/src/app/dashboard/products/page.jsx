'use client'
import { useEffect, useState } from 'react'
import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setMerchList } from '@/store/Slices/Merch'
import Link from 'next/link'
import EditProducts from '@/components/dashboard/EditProducts'



export default function page() {
    const [products, setProducts] = useState([])
    
    const merchList = useSelector((state) => state.merch.list);
    const filters = useSelector((state) => state.filters.list);
    
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
    
    //-------------- GET PRODUCTS ----------------
    const fetchMerchList = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/products", {
            
            params: filters,
            
          });
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
          console.log(error);
        }
      };
    //-------------- GET PRODUCTS ----------------
    useEffect(() => {
        fetchMerchList();
      }, []);
    //-------------- EDIT PRODUCTS ----------------
    const updateProducts = async (id, name, description, price, category, gender, image, color, size, active) => {
        const token = localStorage.getItem("token");
        const replaceToken = token.replace(/['"]+/g, "");
    
        const res = await axios.put(
          `http://localhost:8080/api/products/${id}`,
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
    //-------------- EDIT PRODUCTS ----------------
    
    return (
        <div id="last-products">
    
          <h1 className="font-bold py-4 uppercase pl-3">Edit Product</h1>
          <div className="overflow-x-scroll">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-black/60">
                <tr>
                  <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                  <th className="text-left py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Category</th>
                  <th className="text-left py-3 px-2">Status</th>
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
    
                    <td className="py-3 px-2">
                      {product.active ? "Active" : "Inactive"}
                    </td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        {/* -----------------------EDITAR ---------------------- */}
                        {/* <EditProducts product={product} updateproduct={updateproduct}/> */}
    
                        <EditProducts product={product} updateProducts={updateProducts}/>

                        {/* -----------------------BORRAR ---------------------- */}
                        {product.active ? (
                          <Link
                          href=""
                          title="Suspend product"
                          className="hover:text-white "
                          onClick={() => {
                            deleteproduct(product.id);
                          }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="red"
                              className="w-5 h-5"
                              >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                />
                            </svg>
                          </Link>
                        ) : (
                          <Link
                          href=""
                          title="Suspend product"
                          className="hover:text-white"
                          onClick={() => {
                              activateproduct(product.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="green"
                              className="w-5 h-5"
                              >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                                />
                            </svg>
                          </Link>
                        )}
                        {/* ^^^^^^^^^^^^^^^^^^^^^^^^ BORRAR ^^^^^^^^^^^^^^^^^^^^^^^^ */}
    
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}
