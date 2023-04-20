import MovieRow from "../MovieRow/MovieRow";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import LoadingSpinner from "../Loader/LoadingSpinner";
import Movie from "../../models/movieModel";
import { fetchSelectedMovieDetail } from "../../features/movies/movieSlice";
import { useState } from "react";

const MovieList = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const { movieLoading, data } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onMovieDetailsHandler = (movie: Movie) => {
    dispatch(fetchSelectedMovieDetail(movie.title));
    setSelectedMovieId(movie.id);
  };

  if (movieLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {data &&
        data.map((movie) => (
          <MovieRow
            key={movie.id}
            data={movie}
            hilightMovie={movie.id === selectedMovieId}
            showMovieDetails={() => onMovieDetailsHandler(movie)}
          />
        ))}
    </>
  );
};

export default MovieList;
