import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SearchBar({ handleSearch, search, setSearch }) {
  const router = useRouter();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        placeholder="producto..."
        type="search"
        value={search}
        onChange={handleChange}
      />
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
        onClick={() => {
          handleSearch(search);
        }}
      >
        Buscar
      </button>
    </div>
  );
}
