import { useEffect } from "react";
import MovieList from "../MovieList/MovieList";
import { fetchMovies } from "../../features/movies/movieSlice";
import { useAppDispatch } from "../../hooks/useTypedSelector";

const MovieHome = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  return <MovieList />;
};

export default MovieHome;
