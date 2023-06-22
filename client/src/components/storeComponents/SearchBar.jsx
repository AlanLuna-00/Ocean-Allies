export default function SearchBar({ search, onInputChange }) {
  return (
    <div className="flex items-center">
      <input
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Search product..."
        type="search"
        name="name"
        value={search}
        onChange={onInputChange}
      />
    </div>
  );
}
