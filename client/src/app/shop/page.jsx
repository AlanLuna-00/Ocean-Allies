"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMerchList } from "@/store/Slices/Merch";
import Link from "next/link";
// import { ShoppingCartIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import SearchBar from "@/components/storeComponents/SearchBar";
import Sort from "@/components/storeComponents/Sort";
import ShoppingCart from "@/components/shoppingCarts";
import Pagination from "@/components/Pagination";

const Shop = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    page: 1,
    category: null,
    price: null,
    size: null,
    name: "",
    sort: null,
    color: null,
  });

  const merchList = useSelector((state) => state.merch.list);

  const fetchMerchList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products", {
        params: filters,
      });
      const { products, info } = response.data;
      const { totalItems, totalPages, currentPage } = info;
      dispatch(setMerchList(products));
      setFilters((prevFilters) => ({ ...prevFilters, page: currentPage }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value, page: 1 }));
  };

  const handleSearch = (searchValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, name: searchValue }));
  };

  useEffect(() => {
    fetchMerchList();
    console.log(filters);
  }, [
    filters.page,
    filters.category,
    filters.price,
    filters.size,
    filters.name,
    filters.sort,
    filters.color,
  ]);

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          {/* Filters */}
          <div className="mb-4">
            <h2 className="text-xl font-medium mb-2">Filters</h2>
            {/* Category filter */}
            <div className="mb-2">
              <label htmlFor="category" className="block font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={filters.category || ""}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              >
                <option defaultValue={null}>All</option>
                <option value="Clothing">Clothing</option>
                <option value="Jacket">Jacket's</option>
                <option value="Pants">Pant's</option>
                <option value="BackPack">BackPack's</option>
                <option value="BagsEco">BagsEco's</option>
              </select>
            </div>
            {/* Price filter */}
            <div className="mb-2">
              <label htmlFor="price" className="block font-medium mb-1">
                Price
              </label>
              <select
                id="price"
                name="price"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={filters.price || ""}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              >
                <option defaultValue={null}>All</option>
                <option value="desc">Highest</option>
                <option value="asc">Lowest</option>
              </select>
            </div>
            {/* Size filter */}
            <div className="mb-2">
              <label htmlFor="size" className="block font-medium mb-1">
                Size
              </label>
              <select
                id="size"
                name="size"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={filters.size || ""}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              >
                <option defaultValue={null}>All</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            {/* Color filter */}
            <div className="mb-2">
              <label htmlFor="color" className="block font-medium mb-1">
                Color
              </label>
              <select
                id="color"
                name="color"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={filters.color || ""}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              >
                <option value="">All</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Brown">Brown</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
              </select>
            </div>
            <div className="mb-2">
              <button
                className="w-full bg-gray-800 text-white rounded-lg py-2"
                onClick={() =>
                  setFilters({
                    ...filters,
                    category: null,
                    price: null,
                    size: null,
                    name: "",
                    sort: null,
                    color: null,
                  })
                }
              >
                Clean Filters
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="flex justify-between items-center mb-6">
            <SearchBar
              searchValue={filters.name}
              onInputChange={(e) => {
                handleFilterChange(e.target.name, e.target.value);
              }}
            />

            <Sort
              value={filters.sort}
              onChange={(value) => handleFilterChange("sort", value)}
            />
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {merchList.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4">
                <Link href={`/detail/${product.id}`}>
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded-lg"
                    />
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-500">${product.price}</p>
                  </div>
                </Link>
                <button className="bg-gray-800 text-white flex items-center justify-center w-full rounded-lg py-2 mt-4">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={filters.page}
            totalPages={5} // Debes reemplazar esto con el valor real de totalPages
            onPageChange={(page) => handleFilterChange("page", page)}
          />
        </div>
      </div>
      <ShoppingCart />
    </div>
  );
};

export default Shop;
