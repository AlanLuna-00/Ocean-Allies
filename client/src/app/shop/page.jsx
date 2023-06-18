"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMerchList } from "@/store/Slices/Merch";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import ShoppingCart from "@/components/shoppingCarts";
import Sort from "@/components/storeComponents/Sort";
import SearchBar from "@/components/storeComponents/SearchBar";
import { Fragment, useState } from "react";
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
  const merchData = useSelector((state) => state.merch.list);
  const [ search , setSearch] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const data = response.data.products;
        dispatch(setMerchList(data));
        console.log(merchData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  //* ------------- FILTROS --------------
  const subCategories = [
    { name: "Clothing", href: "#" },
    { name: "Jacket", href: "#" },
    { name: "Pants", href: "#" },
    { name: "BackPack", href: "#" },
  ];
  
  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "Green", label: "Green", checked: false },
        { value: "Brown", label: "Brown", checked: false },
        { value: "Black", label: "Black", checked: false },
        { value: "Red", label: "Red", checked: false },
        { value: "Gray", label: "Gray", checked: false },
        { value: "Blue", label: "Blue", checked: false },
        { value: "White", label: "White", checked: false },
      ],
    },
    // {
    //   id: "category",
    //   name: "Category",
    //   options: [
    //     { value: "new-arrivals", label: "New Arrivals", checked: false },
    //     { value: "sale", label: "Sale", checked: false },
    //     { value: "travel", label: "Travel", checked: false },
    //     { value: "organization", label: "Organization", checked: false },
    //     { value: "accessories", label: "Accessories", checked: false },
    //   ],
    // },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "2l", label: "2L", checked: false },
        { value: "6l", label: "6L", checked: false },
        { value: "12l", label: "12L", checked: false },
        { value: "18l", label: "18L", checked: false },
        { value: "20l", label: "20L", checked: false },
        { value: "40l", label: "40L", checked: false },
      ],
    },
  ];
  //* ^^^^^^^^^^^^ FILTROS ^^^^^^^^^^^^^^^

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

 //*----------------- BUSQUEDA POR NOMBRE ---------------------
 const fetchDataSearch = async (name = "") => {
   try {
     const response = await axios.get(`http://localhost:8080/api/products?name=${name}`);
     const data = response.data.products;
     dispatch(setMerchList(data));
     console.log(merchData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = async (search) => {
    fetchDataSearch(search)
    setSearch("");
  };
  //*^^^^^^^^^^^^^^^ BUSQUEDA POR NOMBRE ^^^^^^^^^^^^^^^^^^^^^^^

  //* ---------------- BUSQUEDA POR CATEGORIA --------------------
  const fetchDataCategory = async (category = "") => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?category=${category}`);
      const data = response.data.products;
      dispatch(setMerchList(data));
      console.log(merchData);
    } catch (error) {
      console.error(error);
    }
  }
  //* ---------------- BUSQUEDA POR CATEGORIA --------------------
  
  
  //* ---------------- BUSQUEDA POR COLOR --------------------
  const fetchDataFilter = async (colors = []) => {
    try {
      const colorQuery = colors.map(color => `color=${color}`).join('&');
      const response = await axios.get(`http://localhost:8080/api/products?${colorQuery}`);
      const data = response.data.products;
      dispatch(setMerchList(data));
      console.log(merchData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleColorFilter = (color) => {
    const updatedColors = [...selectedColors];
    const colorIndex = updatedColors.indexOf(color);
  
    if (colorIndex > -1) {
      updatedColors.splice(colorIndex, 1);
    } else {
      updatedColors.push(color);
    }
  
    setSelectedColors(updatedColors);
    fetchDataFilter(updatedColors);
  };
  //* ---------------- BUSQUEDA POR COLOR --------------------


  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
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
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href}
                             className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between  px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      checked={selectedColors.includes(option.value)}
                                      onClick={() => handleColorFilter(option.value)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
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
              {/* SEARCHBAR */}
              <SearchBar handleSearch={handleSearch} search={search} setSearch={setSearch}/>
            </div>

            <div className="flex items-center">
              <Sort />

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

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a onClick={() => fetchDataCategory(category.name)}
                         className=" cursor-pointer block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-gray-800 hover:border-gray-200"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={selectedColors.includes(option.value)}
                                  onClick={() => handleColorFilter(option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Tabla de productos */}
              <div className="lg:col-span-3">
                <div class="lg:col-span-3">
                  <div className="container mx-auto">
                    <div className="grid grid-cols-3 gap-4">
                      {merchData.map((item) => (
                        <Link href={`/detail/${item.id}`}>
                          <div
                            key={item.id}
                            className="bg-gray-200 p-4 rounded"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-auto mb-2"
                            />
                            <p className="text-gray-800 font-semibold">
                              {item.name}
                            </p>
                            <p className="text-gray-600">{item.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Pagination />
        </main>
      </div>
    </div>
  );
};

export default Shop; 