export type MovieState = {
    movieLoading: boolean;
    error: string | null;
    data: Movie[] | [];
    readonly masterData: Movie[] | [];
    posterLoading: boolean;
    poster: Poster;
  }


type Movie = {
    title: string;
    id: number;
    description: string;
    director: string;
    releaseDate:string;
}

export type Poster = {
    title:string;
    posterUrl: string;
    ratings:Ratings[] | []
}

export type Ratings = {
    Source:string;
    Value:string;
}



export default Movie