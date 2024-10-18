import { useState, useEffect, useRef } from "react";
import StartRating from "./StarRating";
import { Loader } from "./App";
import { DetailsType, NewWatchedMovieType } from "./App";

const KEY = "f84fc31d";

type MovieDetailsProps = {
  selectedId: number;
  onCloseMovie: () => void;
  onAddWatched: (newWatchedMovie: NewWatchedMovieType) => void;
  watched: WatchedType;
};

type WatchedType = {
  countRatingDecisions: number;
  imdbID: string;
  imdbRating: number;
  poster: string;
  runtime: number;
  title: string;
  userRating: string;
  year: string;
}[];

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<DetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  console.log(countRef.current)


  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(`${selectedId}`);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === `${selectedId}`
  )?.userRating;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!movie?.Title) return;
      document.title = `Movie | ${movie?.Title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie?.Title]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie?.Title,
      year: movie?.Year,
      poster: movie?.Poster,
      imdbRating: Number(movie?.imdbRating),
      runtime: Number(movie?.Runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    console.log(newWatchedMovie);
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back">&larr;</button>
            <img src={movie?.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StartRating maxRating={10} size={24} onSetRating={setUserRating}/>
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
