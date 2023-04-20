import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { movieApi, posterApi } from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieAPIKey";
import Movie, { MovieState, Poster, Ratings } from "../../models/movieModel";
import CONSTANTS from "../../common/constants";
import { sortMovieByDate } from "../../utils/util";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (data, thunkApi) => {
    try {
      const { data } = await movieApi.get("api/films");
      const response: Movie[] = [];
      data.results.forEach((result: any) => {
        const { title, episode_id, opening_crawl, director, release_date } =
          result;
        response.push({
          title,
          id: episode_id,
          description: opening_crawl,
          director,
          releaseDate: release_date,
        });
      });
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchSelectedMovieDetail = createAsyncThunk(
  "movies/fetchSelectedMovieDetail",
  async (title: string, thunkApi) => {
    try {
      const { data } = await posterApi.get(
        `?apiKey=${APIKey}&t=${title}&Plot=full`
      );
      const response: Poster = {} as Poster;
      const { Ratings, Poster, Title } = data;
      response.title = Title;
      response.posterUrl = Poster;
      response.ratings = Ratings.map((rating:Ratings)=>{
        let [first, second] = rating.Value.split("/");
        if (second === "10") {
          first = (+first * 10).toString() + "%";
        } else if (second === "100") {
          first = first + "%";
        }
        rating.Value = first
        return rating
      });
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movieLoading: false,
  error: null,
  data: [],
  masterData: [],
  posterLoading: false,
  poster: {},
} as MovieState;

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovie: (state, action) => {
      if (action.payload.trim().length) {
        state.data = state.masterData.filter((movie) =>
          movie.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.data = state.masterData;
      }
    },
    sortMovies: (state, action) => {
      if (action.payload === CONSTANTS.EPISODE) {
        state.masterData = state.masterData.sort(
          (movieA, movieB) => movieA.id - movieB.id
        );
        state.data = state.data.sort((movieA, movieB) => movieA.id - movieB.id);
      } else if (action.payload === CONSTANTS.RELEASE_DATE) {
        state.data = sortMovieByDate(state.data);
        state.masterData = sortMovieByDate(state.masterData);
      } else if (action.payload === CONSTANTS.TITLE) {
        state.masterData = state.masterData.sort(
          (movieA, movieB) => movieA.title.localeCompare(movieB.title)
        );
        state.data = state.data.sort(
          (movieA, movieB) => movieA.title.localeCompare(movieB.title)
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.movieLoading = true;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.movieLoading = false;
          state.data = action.payload;
          state.masterData = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(fetchSelectedMovieDetail.pending, (state, action) => {
        state.posterLoading = true;
      })
      .addCase(
        fetchSelectedMovieDetail.fulfilled,
        (state, action: PayloadAction<Poster>) => {
          state.posterLoading = false;
          state.poster = action.payload;
        }
      )
      .addCase(
        fetchSelectedMovieDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export const { searchMovie, sortMovies } = movieSlice.actions;
export default movieSlice.reducer;
