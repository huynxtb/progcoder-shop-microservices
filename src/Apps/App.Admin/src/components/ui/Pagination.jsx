import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/Icon";

const Pagination = ({
  totalPages,
  currentPage,
  handlePageChange,
  text,
  className = "custom-class",
}) => {
  const [pages, setPages] = useState([]);
  const rangeStart = useEffect(() => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPages(pages);
  }, [totalPages]);

  return (
    <div className={className}>
      <ul className="pagination">
        <li>
          {text ? (
            <button
              className=" text-slate-600 dark:text-slate-300 prev-next-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          ) : (
            <button
              className="text-xl leading-4 text-slate-900 dark:text-white h-6  w-6 flex  items-center justify-center flex-col prev-next-btn "
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon icon="heroicons-outline:chevron-left" />
            </button>
          )}
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              className={`${page === currentPage ? "active" : ""} page-link`}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          {text ? (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className=" text-slate-600 dark:text-slate-300 prev-next-btn"
            >
              Next
            </button>
          ) : (
            <button
              className="text-xl leading-4 text-slate-900 dark:text-white  h-6  w-6 flex  items-center justify-center flex-col prev-next-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon icon="heroicons-outline:chevron-right" />
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
