import { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  lastPage,
  initialPage,
  nextPage,
  prevPage,
}) => {

  return (
    <div className="pagination_box">
      <button
        className="pagination_btn"
        onClick={() => prevPage()}
        disabled={currentPage === initialPage}
      >
        Previous Page
      </button>
      
      <span className="pagination_number">{currentPage}</span>

      <button
        className="pagination_btn"
        onClick={() => nextPage()}
        disabled={currentPage === lastPage}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
