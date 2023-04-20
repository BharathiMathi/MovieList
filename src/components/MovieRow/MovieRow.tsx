import Movie from "../../models/movieModel";
import styles from "./MovieRow.module.css";

type Props = {
  data: Movie;
  hilightMovie: boolean;
  showMovieDetails: () => void;
};

const MovieRow = ({ data, hilightMovie, showMovieDetails }: Props) => {
  const { id, title, releaseDate } = data;
  return (
    <div
      className={`${styles.row} ${hilightMovie && styles.selected_movie}`}
      onClick={showMovieDetails}
    >
      <div className={styles.col_1}>EPISODE {id}</div>
      <div className={styles.col_2}>{title}</div>
      <div className={styles.col_3}>{releaseDate}</div>
    </div>
  );
};

export default MovieRow;
