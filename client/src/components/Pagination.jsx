import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  previousPage,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    onPageChange(previousPage);
  };

  const handleNextPage = () => {
    onPageChange(nextPage);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px sm:flex sm:justify-center mb-8">
        <li>
          <button
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
              previousPage
                ? "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                : "cursor-not-allowed dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400"
            }`}
            onClick={handlePreviousPage}
            disabled={!previousPage}
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        {/* Renderizar los números de página */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-2 leading-tight ${
                currentPage === index + 1
                  ? "text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
              nextPage
                ? "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                : "cursor-not-allowed dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400"
            }`}
            onClick={handleNextPage}
            disabled={!nextPage}
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
