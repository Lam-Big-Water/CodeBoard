import { ReactNode, useEffect, useRef, useState } from "react";
import StartRating from "./StarRating";
import { useKey } from "./useKey";
import { useLocalStorageState } from "./useLocalStorageState";
import { useMovies } from "./useMovies";

import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";

export const average = (arr: any[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

type MoviesType = {
  imdbID: number;
  Poster: string;
  Title: string;
  Year: number;
};

type RequiteType = {
  movies: MoviesType[];
  isLoading: boolean;
  error: string;
};

export type DetailsType = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: number;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;

  imdbID?: number;
  userRating?: number;
  countRatingDecisions?: ReactNode;
};

export type NewWatchedMovieType = {
  imdbID: number;
  title: string | undefined;
  year: string | undefined;
  poster: string | undefined;
  imdbRating: number;
  runtime: number;
  userRating: number;
  countRatingDecisions: number;
}


const App = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { movies, isLoading, error }: RequiteType = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id: number | null) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(newWatchedMovie: NewWatchedMovieType) {
    setWatched((watched: []) => [...watched, newWatchedMovie]);
  }

  function handleDeleteWatched (id: number) {
    setWatched((watched: []) => watched.filter((movie: NewWatchedMovieType) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error}/>}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatched={handleAddWatched}
            watched={watched}
          />
          ) : (
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const ErrorMessage = ({ message }: any) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
};

// NavBar
type NavBarProps = {
  children: ReactNode;
};

const NavBar = ({ children }: NavBarProps) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

type SearchProps = {
  query: string;
  setQuery: (v: string) => void;
};

const Search = ({ query, setQuery }: SearchProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

const NumResults = ({ movies }: any) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
// NavBar

// Main
type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  return <main className="main">{children}</main>;
};
// Main

// Box
type BoxProps = {
  children: ReactNode;
};

const Box = ({ children }: BoxProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
};
// Box

type MoviesListProps = {
  movies: MoviesType[];
  onSelectMovie: (imdbID: number) => void;
};

const MoviesList = ({ movies, onSelectMovie }: MoviesListProps) => {
  return (
    <ul className="list">
      {movies?.map((movie: MoviesType) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};
type MovieProps = {
  movie: MoviesType;
  onSelectMovie: (imdbID: number) => void;
};
const Movie = ({ movie, onSelectMovie }: MovieProps) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};



type MovieDetailsProps = {
  selectedId: number | null;
  onCloseMovie: () => void;
  onAddWatched: (newWatchedMovie?: NewWatchedMovie) => void;
  watched: any[];
};


type NewWatchedMovie = {
  imdbID: number | null;
  title: string;
  year: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: string;
  countRatingDecisions: number;
}




// function MovieDetails({
//   selectedId,
//   onCloseMovie,
//   onAddWatched,
//   watched,
// }: MovieDetailsProps) {
//   const [movie, setMovie] = useState({});
//   console.log(movie);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState(0);

//   const countRef = useRef(0);

//   useEffect(
//     function () {
//       if (userRating) countRef.current++;
//     },
//     [userRating]
//   );

//   const isWatched = watched
//     .map((movie: any) => movie.imdbID)
//     .includes(selectedId);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === selectedId
//   )?.userRating;


//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   }: any = movie;

//   const isTop = imdbRating > 8;

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split(" ").at(0)),
//       userRating,
//       countRatingDecisions: countRef.current,
//     };

//     console.log(newWatchedMovie);

//     onAddWatched(newWatchedMovie);
//     onCloseMovie();
//   }

//   useKey("Escape", onCloseMovie);

//   useEffect(
//     function () {
//       async function getMovieDetails() {
//         setIsLoading(true);
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//         );
//         const data = await res.json();
//         console.log(data);
//         setMovie(data);
//         setIsLoading(false);
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;

//       return function () {
//         document.title = "usePopcorn";
//       };
//     },
//     [title]
//   );

//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={onCloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${movie} movie`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐️</span>
//                 {imdbRating} IMDb rating
//               </p>
//             </div>
//           </header>

//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   <StartRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   You rated with movie {watchedUserRating} <span>⭐️</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function WatchedSummary({ watched }: []) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));

//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }


// function WatchedMoviesList ({watched, onDeleteWatched}) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <WatchedMovie />
//       ))}
//     </ul>
//   )
// }

// function WatchedMovie ({movie, onDeleteWatched}) {
//   return (
//     <li>
//       <img src={movie.poster} alt={`${movie.title} poster`} />
//       <h3>{movie.title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{movie.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{movie.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{movie.runtime} min</span>
//         </p>

//         <button
//           className="btn-delete"
//           onClick={() => onDeleteWatched(movie.imdbID)}
//         >
//           X
//         </button>
//       </div>
//     </li>
//   )
// }

export default App;


/*
movies
[
  {
    "Title": "Crazy, Stupid, Love.",
    "Year": "2011",
    "imdbID": "tt1570728",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
  },
  {
    "Title": "Love Actually",
    "Year": "2003",
    "imdbID": "tt0314331",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYWRlZjcwYTgtYWJkOS00MGYwLTk3Y2ItNmU4NTg5Nzg2YTQ2XkEyXkFqcGc@._V1_SX300.jpg"
  },
]



{
    "Title": "Crazy, Stupid, Love.",
    "Year": "2011",
    "Rated": "PG-13",
    "Released": "29 Jul 2011",
    "Runtime": "118 min",
    "Genre": "Comedy, Drama, Romance",
    "Director": "Glenn Ficarra, John Requa",
    "Writer": "Dan Fogelman",
    "Actors": "Steve Carell, Ryan Gosling, Julianne Moore",
    "Plot": "A middle-aged husband's life changes dramatically when his wife asks him for a divorce. He seeks to rediscover his manhood with the help of a newfound friend, Jacob, learning to pick up girls at bars.",
    "Language": "English",
    "Country": "United States",
    "Awards": "5 wins & 23 nominations",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "7.4/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "79%"
        },
        {
            "Source": "Metacritic",
            "Value": "68/100"
        }
    ],
    "Metascore": "68",
    "imdbRating": "7.4",
    "imdbVotes": "576,076",
    "imdbID": "tt1570728",
    "Type": "movie",
    "DVD": "13 Apr 2016",
    "BoxOffice": "$84,379,584",
    "Production": "Carousel, DiNovi Pictures",
    "Website": "N/A",
    "Response": "True"
}


--- add list

{
    "imdbID": "tt1570728",
    "title": "Crazy, Stupid, Love.",
    "year": "2011",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg",
    "imdbRating": 7.4,
    "runtime": 118,
    "userRating": 10,
    "countRatingDecisions": 1
}

*/
