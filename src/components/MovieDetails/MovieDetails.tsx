import { useAppSelector } from "../../hooks/useTypedSelector";
import { getAvgRating } from "../../utils/util";
import LoadingSpinner from "../Loader/LoadingSpinner";
import RatingSource from "../RatingSource/RatingSource";
import { StarRating } from "../shared/StarRating";
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const { posterLoading, poster, data } = useAppSelector((state) => state);

  if (posterLoading) {
    return <LoadingSpinner />;
  }
  const moviesData = data.find((movie) => poster?.title?.includes(movie.title));

  const avgRating = getAvgRating(poster);

  return (
    <>
      {Object.keys(poster).length ? (
        <>
          <div className={styles.movie_title}>{moviesData?.title}</div>
          <div className={styles.row}>
            <img className={styles.image} src={poster.posterUrl} alt="" />
            <div>{moviesData?.description}</div>
          </div>
          <div className={styles.directed_by}>
            Directed by: {moviesData?.director}
          </div>
          <div className={styles.avg_rating}>
            Average rating: <StarRating rating={+avgRating} />
          </div>
          <div className={styles.rating_source}>
            {poster.ratings.map((rating) => (
              <RatingSource key={rating.Source} {...rating} />
            ))}
          </div>
        </>
      ) : data.length ? (
        <div className={styles.no_data}>
          Please select movie to see in detailed view
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieDetails;
