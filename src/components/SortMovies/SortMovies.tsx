import { useState } from "react";
import style from "./SortMovies.module.css";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import CONSTANTS from "../../common/constants";
import { sortMovies } from "../../features/movies/movieSlice";

const sortOptions = [CONSTANTS.EPISODE, CONSTANTS.RELEASE_DATE, CONSTANTS.TITLE];

const SortMovies = () => {
  const dispatch = useAppDispatch();
  const [sortApplied, setSortApplied] = useState<boolean>(false);

  const sortHandler = (e: any) => {
    dispatch(sortMovies(e.target.innerText));
    setSortApplied(true);
  };

  return (
    <div className={style.dropdown}>
      <button
        className={`${style.dropbtn} ${sortApplied && style.sort_button_style}`}
      >
        Sort By...
      </button>
      <ul className={style.dropdown_content}>
        {sortOptions.map((option) => (
          <li key={option} onClick={sortHandler}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortMovies;
