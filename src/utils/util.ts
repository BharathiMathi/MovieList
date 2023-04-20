import Movie, { Poster } from "../models/movieModel";

export function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function to2(num: number) {
    return Math.round((num + Number.EPSILON) * 10) / 100;
  }
  
  export function getAvgRating(poster: Poster) {
    if (poster.ratings?.length === 0) {
      return 0;
    }
   const ratings:number[] = [];
   poster.ratings?.forEach((rating)=>{
    const ratingValue = rating.Value.split("%")[0];
    ratings.push(+ratingValue)
   })
    const avgRating =
      ratings.reduce((a, b) => a + b,0) / poster.ratings?.length;
    return to2(avgRating);
  }

  
export function sortMovieByDate(data: Movie[]){
  return data.sort((movieA, movieB) => {
    let key1 = new Date(movieA.releaseDate);
    let key2 = new Date(movieB.releaseDate);
    if (key1 < key2) {
      return -1;
    } else if (key1 === key2) {
      return 0;
    } else {
      return 1;
    }
  });
};