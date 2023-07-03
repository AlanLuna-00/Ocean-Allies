import { Menu, Transition } from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sort = ({ filters, onChange }) => {
  const sortOptions = [
    { label: "Default", value: null, name: "sort" || "price", current: true },
    {
      label: "Alphabetic: A to Z",
      name: "sort",
      value: filters.sort || "",
      current: false,
    },
    {
      label: "Alphabetic: Z to A",
      name: "sort",
      value: filters.sort || "",
      current: false,
    },
    {
      label: "Price: Low to High",
      name: "price",
      value: filters.price || "",
      current: false,
    },
    {
      label: "Price: High to Low",
      name: "price",
      value: filters.price || "",
      current: false,
    },
  ];
  return (
    <Menu as="div" className="flex flex-col">
      <div className="mb-2">
        <select
          id="price"
          name="price"
          className="w-full rounded-lg border border-gray-300 p-2"
          value={filters.price || ""}
          onChange={onChange}
        >
          <option defaultValue={null}>Sort by $$$</option>
          <option value="desc">Highest</option>
          <option value="asc">Lowest</option>
        </select>
      </div>
      <div className="mb-2">
        <select
          id="sort"
          name="sort"
          className="w-full rounded-lg border border-gray-300 p-2"
          value={filters.sort || ""}
          onChange={onChange}
        >
          <option defaultValue={null}>Sort by ( A-Z )</option>
          <option value="asc">Alphabetic: A to Z</option>
          <option value="desc">Alphabetic: Z to A</option>
        </select>
      </div>
    </Menu>
  );
};

export default Sort;
