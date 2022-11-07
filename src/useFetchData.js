import { useReducer, useEffect, useState } from "react";

const ACTION_TYPES = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
};

const INITIAL_STATES = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  currentPage: 1,
  lastPage: 1,
  nextPage: 1,
  prevPage: 1,
  data: [],
  hasPrevPage: false,
  hasNextPage: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        currentPage: action.currentPage,
        nextPage: action.currentPage + 1,
        prevPage: action.currentPage - 1,
        isLoading: true,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        lastPage: action.lastPage,
        hasPrevPage: action.hasPrevPage,
        hasNextPage: action.hasNextPage,
        data: action.data,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
      };

    default:
      return state;
  }
};

const useFetchData = (url, page) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATES);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.FETCH_START, currentPage: currentPage });
    fetch(url + currentPage)
      .then((res) => res.json())
      .then((data) => {
        const hasPrevPage = currentPage > page; //true or false
        const hasNextPage = currentPage < data.total_pages; //true or false
        console.log("hasPrevPage " + hasPrevPage, "hasNextPage " + hasNextPage);
        dispatch({
          type: ACTION_TYPES.FETCH_SUCCESS,
          lastPage: data.total_pages,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
          data: data.results,
        });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      });
  }, [currentPage]);

  const toNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const toPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const goToPage = (num) => {
    setCurrentPage((prevState) => (prevState = num));
  };

  return { ...state, state, toPrevPage, toNextPage, goToPage };
};

export default useFetchData;
