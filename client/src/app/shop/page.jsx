"use client";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMerchList } from "@/store/Slices/Merch";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import ShoppingCart from "@/components/shoppingCarts";
import Sort from "@/components/storeComponents/Sort";
import SearchBar from "@/components/storeComponents/SearchBar";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
const Shop = () => {
  const dispatch = useDispatch();
  const [paginationData, setPaginationData] = useState({
    totalItems: null,
    totalPages: null,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  });
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
      setFilters((prevFilters) => ({ ...prevFilters, page: currentPage }));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(paginationData);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value, page: 1 }));
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
  //*----------------- Mobile ---------------------
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    //*----------------- Mobile ---------------------
    <div className="">
      <div>
        {/* Pagina para mobile */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto  py-4 pb-12 shadow-xl bg-white">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* Filters mobile */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      <div className="col-span-12 lg:col-span-3">
                        {/* Filters */}
                        <div className="mb-4">
                          <h2 className="text-xl font-medium mb-2">Filters</h2>
                          {/* Category filter */}
                          <div className="mb-2">
                            <label
                              htmlFor="category"
                              className="block font-medium mb-1"
                            >
                              Category
                            </label>
                            <select
                              id="category"
                              name="category"
                              className="w-full border border-gray-300 rounded-lg p-2"
                              value={filters.category || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
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
                            <label
                              htmlFor="price"
                              className="block font-medium mb-1"
                            >
                              Price
                            </label>
                            <select
                              id="price"
                              name="price"
                              className="w-full border border-gray-300 rounded-lg p-2"
                              value={filters.price || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            >
                              <option defaultValue={null}>All</option>
                              <option value="desc">Highest</option>
                              <option value="asc">Lowest</option>
                            </select>
                          </div>
                          {/* Size filter */}
                          <div className="mb-2">
                            <label
                              htmlFor="size"
                              className="block font-medium mb-1"
                            >
                              Size
                            </label>
                            <select
                              id="size"
                              name="size"
                              className="w-full border border-gray-300 rounded-lg p-2"
                              value={filters.size || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
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
                            <label
                              htmlFor="color"
                              className="block font-medium mb-1"
                            >
                              Color
                            </label>
                            <select
                              id="color"
                              name="color"
                              className="w-full border border-gray-300 rounded-lg p-2"
                              value={filters.color || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
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
                    </ul>
                    {/* FILTROS */}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Pagina base no Mobile */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              shop
            </h1>
            <div className="">
              <SearchBar
                searchValue={filters.name}
                onInputChange={(e) => {
                  handleFilterChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className="flex items-center">
              <Sort
                value={filters.sort}
                onChange={(value) => handleFilterChange("sort", value)}
              />
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">Shopping Cart</span>
                <ShoppingCart />
                <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className=" grid grid-rows-3 grid-flow-col gap-10">
              {/* Filters */}
              <form className="row-span-3 w-48 hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <div className="col-span-12 lg:col-span-3">
                    {/* Filters */}
                    <div className="mb-4">
                      <h2 className="text-xl font-medium mb-2">Filters</h2>
                      {/* Category filter */}
                      <div className="mb-2">
                        <label
                          htmlFor="category"
                          className="block font-medium mb-1"
                        >
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
                        <label
                          htmlFor="price"
                          className="block font-medium mb-1"
                        >
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
                        <label
                          htmlFor="size"
                          className="block font-medium mb-1"
                        >
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
                        <label
                          htmlFor="color"
                          className="block font-medium mb-1"
                        >
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
                </ul>
              </form>
              {/* Tabla de productos */}

              <div className="row-span-3">
                <div className="grid  ">
                  {" "}
                  <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
                    {merchList.map((product) => (
                      <div>
                        <div
                          key={product.id}
                          className="bg-white rounded-lg p-4"
                        >
                          <Link href={`/detail/${product.id}`}>
                            <div>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto mb-2"
                              />
                              <h3 className="text-gray-800 font-semibold">
                                {product.name}
                              </h3>
                              <p className="text-gray-600">${product.price}</p>
                            </div>
                          </Link>
                          <button className="bg-gray-800 text-white flex items-center justify-center w-full rounded-lg py-2 mt-4">
                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Pagination
            currentPage={filters.page}
            totalPages={paginationData.totalPages}
            nextPage={paginationData.nextPage}
            previousPage={paginationData.previousPage}
            onPageChange={(pageNumber) => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                page: pageNumber,
              }));
            }}
          />
        </main>
      </div>
    </div>
  );
};
export default Shop;
