import style from './App.module.css';
import MovieHome from './components/MovieHome/MovieHome';
import MovieDetails from './components/MovieDetails/MovieDetails';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
        <div className={style.container}>
          <SearchBar/>
          <div className={style.row}>
          <div className={style.movie_list}><MovieHome /></div>
          <div className={style.movie_details}><MovieDetails /></div>
          </div>
        </div>
  );
}

export default App;
