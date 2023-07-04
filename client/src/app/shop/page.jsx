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
import { FunnelIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import { setFilterList } from "@/store/Slices/Filters";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Shop = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [paginationData, setPaginationData] = useState({
    totalItems: null,
    totalPages: null,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  });

  const filters = useSelector((state) => state.filters.list);

  const [open, setOpen] = useState(false);

  const merchList = useSelector((state) => state.merch.list);

  const fetchMerchList = async () => {
    try {
      const response = await axios.get(
        "https://ocean-allies-production.up.railway.app/api/products?active=true",
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
      console.log(error);
    }
  };

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value, page: 1 };
    dispatch(setFilterList(updatedFilters));
  };

  useEffect(() => {
    fetchMerchList();
    dispatch(setFilterList(filters));
  }, [filters]);

  const handleCleanFilters = (e) => {
    e.preventDefault();
    const initialFilters = {
      page: 1,
      category: null,
      price: null,
      sort: null,
      size: null,
      name: "",
      color: null,
    };
    dispatch(setFilterList(initialFilters));
  };

  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page };
    dispatch(setFilterList(updatedFilters));
  };
  //*----------------- Mobile ---------------------

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
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto  bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
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
                          <h2 className="mb-2 text-xl font-medium">Sorts</h2>
                          <Sort
                            filters={filters}
                            onChange={(e) =>
                              handleFilterChange(e.target.name, e.target.value)
                            }
                          />
                          <h2 className="mb-2 text-xl font-medium">Filters</h2>
                          {/* Category filter */}

                          <div className="mb-2">
                            <label
                              htmlFor="category"
                              className="mb-1 block font-medium"
                            >
                              Category
                            </label>
                            <select
                              id="category"
                              name="category"
                              className="w-full rounded-lg border border-gray-300 p-2"
                              value={filters.category || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">All</option>
                              <option value="T-shirts">T-shirts</option>
                              <option value="Jacket">Jacket's</option>
                              <option value="Tank tops">Tank tops</option>
                              <option value="Leggings">Leggings</option>
                              <option value="Dresses">Dresses</option>
                            </select>
                          </div>
                          {/* Price filter */}
                          <div className="mb-2">
                            <label
                              htmlFor="price"
                              className="mb-1 block font-medium"
                            >
                              Price
                            </label>
                            <select
                              id="price"
                              name="price"
                              className="w-full rounded-lg border border-gray-300 p-2"
                              value={filters.price || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">All</option>
                              <option value="desc">Highest</option>
                              <option value="asc">Lowest</option>
                            </select>
                          </div>
                          {/* Size filter */}
                          <div className="mb-2">
                            <label
                              htmlFor="size"
                              className="mb-1 block font-medium"
                            >
                              Size
                            </label>
                            <select
                              id="size"
                              name="size"
                              className="w-full rounded-lg border border-gray-300 p-2"
                              value={filters.size || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            >
                              <option defaultValue={null}>All</option>
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                            </select>
                          </div>
                          {/* Color filter */}
                          <div className="mb-2">
                            <label
                              htmlFor="color"
                              className="mb-1 block font-medium"
                            >
                              Color
                            </label>
                            <select
                              id="color"
                              name="color"
                              className="w-full rounded-lg border border-gray-300 p-2"
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
                              <option value="Yellow">Yellow</option>
                              <option value="White">White</option>
                              <option value="Black">Black</option>
                              <option value="Gray">Gray</option>
                            </select>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="color"
                              className="mb-1 block font-medium"
                            >
                              Gender
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              className="w-full rounded-lg border border-gray-300 p-2"
                              value={filters.gender || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">All</option>
                              <option value="Man">Man</option>
                              <option value="Woman">Woman</option>
                              <option value="Unisex">Unisex</option>
                            </select>
                          </div>
                          <div className="mb-2">
                            <button
                              className="w-full rounded-lg bg-gray-800 py-2 text-white"
                              onClick={handleCleanFilters}
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
            <h1 className=" text-4xl font-bold tracking-tight text-gray-900"></h1>
            <div className="">
              <SearchBar
                searchValue={filters.name}
                onInputChange={(e) => {
                  handleFilterChange(e.target.name, e.target.value.trim());
                }}
              />
            </div>
            <div className="flex items-center">
              <div className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">Shopping Cart</span>
                <ShoppingCart open={open} setOpen={setOpen} />
                <button onClick={() => setOpen(true)}>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5 mb-1" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className=" grid grid-flow-col grid-rows-3 gap-10">
              {/* Filters */}
              <form className="row-span-3 hidden w-48 lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <div className="col-span-12 lg:col-span-3">
                    {/* Filters */}
                    <div className="mb-4">
                      <h2 className="mb-2 text-xl font-medium">Sorts</h2>
                      <Sort
                        filters={filters}
                        onChange={(e) =>
                          handleFilterChange(e.target.name, e.target.value)
                        }
                      />
                      <h2 className="mb-2 text-xl font-medium">Filters</h2>
                      {/* Category filter */}
                      <div className="mb-2">
                        <label
                          htmlFor="category"
                          className="mb-1 block font-medium"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="w-full rounded-lg border border-gray-300 p-2"
                          value={filters.category || ""}
                          onChange={(e) =>
                            handleFilterChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="">All</option>
                          <option value="T-shirts">T-shirts</option>
                          <option value="Jacket">Jacket's</option>
                          <option value="Tank tops">Tank tops</option>
                          <option value="Leggings">Leggings</option>
                          <option value="Dresses">Dresses</option>
                        </select>
                      </div>

                      {/* Size filter */}
                      <div className="mb-2">
                        <label
                          htmlFor="size"
                          className="mb-1 block font-medium"
                        >
                          Size
                        </label>
                        <select
                          id="size"
                          name="size"
                          className="w-full rounded-lg border border-gray-300 p-2"
                          value={filters.size || ""}
                          onChange={(e) =>
                            handleFilterChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="">All</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </div>
                      {/* Color filter */}
                      <div className="mb-2">
                        <label
                          htmlFor="color"
                          className="mb-1 block font-medium"
                        >
                          Color
                        </label>
                        <select
                          id="color"
                          name="color"
                          className="w-full rounded-lg border border-gray-300 p-2"
                          value={filters.color || ""}
                          onChange={(e) =>
                            handleFilterChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="">All</option>
                          <option value="Red">Red</option>
                          <option value="Blue">Blue</option>
                          <option value="Green">Green</option>
                          <option value="Yellow">Yellow</option>
                          <option value="White">White</option>
                          <option value="Black">Black</option>
                          <option value="Gray">Gray</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="color"
                          className="mb-1 block font-medium"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          className="w-full rounded-lg border border-gray-300 p-2"
                          value={filters.gender || ""}
                          onChange={(e) =>
                            handleFilterChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="">All</option>
                          <option value="Man">Man</option>
                          <option value="Woman">Woman</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <button
                          className="w-full rounded-lg bg-gray-800 py-2 text-white"
                          onClick={handleCleanFilters}
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
                <div className="flex flex-row justify-center  ">
                  <div className="grid grid-cols-1 gap-6  sm:grid-cols-2 lg:grid-cols-4">
                    {error ? (
                      <div className="flex justify-center text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {error}
                        </h2>
                      </div>
                    ) : (
                      merchList.map((product) => (
                        <div
                          key={product.id}
                          className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white"
                        >
                          <Link href={`/detail/${product.id}`}>
                            <div>
                              <a className="relative  overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className=" peer  right-0 top-0 h-full w-full object-cover"
                                />
                                {/* <div className="absolute -right-16 bottom-0 mb-4 mr-2 space-y-2 transition-all duration-300 group-hover:right-0">
                                  <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    <ShoppingCartIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div> */}
                              </a>

                              <div className="mt-4 pb-5">
                                <h5 className="text-center tracking-tight text-gray-500">
                                  {product.name}
                                </h5>
                                <div className="mb-5 flex justify-center">
                                  <span className="text-base font-bold text-gray-900">
                                    ${product.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    )}
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
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
};
export default Shop;
