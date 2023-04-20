import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { searchMovie } from "../../features/movies/movieSlice";
import SortMovies from "../SortMovies/SortMovies";

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    dispatch(searchMovie(event.target.value));
  };
  return (
    <div className={style.container}>
      <div className={style.search}>
        <SortMovies />
        <FontAwesomeIcon icon={faSearch} className={style.fa_search} />
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Type to filter..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
