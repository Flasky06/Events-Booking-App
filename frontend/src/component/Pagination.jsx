import React from "react";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const getPagination = () => {
    const pages = [];
    const totalShown = 3; // Number of pages to show around current page

    if (lastPage <= 1) return pages;

    // Add first page and ellipsis if needed
    if (currentPage > totalShown + 1) {
      pages.push(1);
      if (currentPage > totalShown + 2) {
        pages.push("...");
      }
    }

    // Add the current, previous, and next pages
    for (
      let page = Math.max(1, currentPage - totalShown);
      page <= Math.min(lastPage, currentPage + totalShown);
      page++
    ) {
      pages.push(page);
    }

    // Add last page and ellipsis if needed
    if (currentPage + totalShown < lastPage) {
      if (currentPage + totalShown + 1 < lastPage) {
        pages.push("...");
      }
      pages.push(lastPage);
    }

    return pages;
  };

  return (
    <div className="pagination flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded font-bold ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        &lt;
      </button>

      {getPagination().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-200"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={`px-3 py-1 rounded font-bold ${
          currentPage === lastPage
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
