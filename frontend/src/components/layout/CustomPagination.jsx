import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [searchParams] = useSearchParams();
  const [activePages, SetActivePage] = useState();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    SetActivePage(page);
  }, [page]);
  
  const navigate = useNavigate();
  const SetPageNumber = (pageNumber) => {
    console.log(window.location.pathname, "path");
    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams;
    navigate(path);

    SetActivePage(pageNumber);
  };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        {filteredProductsCount > resPerPage && (
          <Pagination
            activePage={activePages}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredProductsCount}
            onChange={SetPageNumber}
            lastPageText={"Last"}
            firstPageText={"First"}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            itemClass="page-item"
            linkClass="page-link"
          />
        )}
      </div>
    </>
  );
};

export default CustomPagination;

// The URLSearchParams interface in JavaScript is a handy utility for working with query
//parameters in URLs. Here are some common use cases and examples of how URLSearchParams can be used:

// Accessing Query Parameters:
// You can use URLSearchParams to access and manipulate the query parameters of a URL.

// const urlParams = new URLSearchParams(window.location.search);
// const paramValue = urlParams.get('paramName');

// Modifying Query Parameters:
// You can easily add, update, or remove query parameters using URLSearchParams.

// const urlParams = new URLSearchParams(window.location.search);
// urlParams.set('paramName', 'paramValue');
// urlParams.append('newParam', 'newValue');
// urlParams.delete('paramToRemove');
