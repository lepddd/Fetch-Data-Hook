import useFetchData from "../../useFetchData";
import MovieCard from "../MovieCard/MovieCard";
import Box from "../Box/Box";
import Pagination from "../Pagination/Pagination";
import Bars from "../../assets/bars.svg";
import { motion } from "framer-motion";

const Container = () => {
  const url = `https://app-teste-weather.herokuapp.com/movie/popular?page=`;
  const initialPage = 1;

  const {
    currentPage,
    lastPage,
    toNextPage, //Update page and refetch
    toPrevPage, //Update page and refetch
    goToPage,
    isLoading,
    data,
  } = useFetchData(url, initialPage);

  return (
    <>
      {isLoading ? (
        <Box isLoading={isLoading}>
          <img src={Bars} alt="Loading" />
        </Box>
      ) : (
        <Box isLoading={isLoading}>
          {data.map((movie, index) => (
            <MovieCard
              index={index}
              key={movie.id}
              src={movie.poster_path}
              alt={movie.title}
            />
          ))}
        </Box>
      )}
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        nextPage={toNextPage}
        prevPage={toPrevPage}
        initialPage={initialPage}
      />
    </>
  );
};

export default Container;
