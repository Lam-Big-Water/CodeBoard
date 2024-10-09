import { ReactNode, useEffect, useRef, useState } from "react";

import StartRating from "./StarRating";
import { useKey } from "./useKey";
import { useLocalStorageState } from "./useLocalStorageState";
import { useMovies } from "./useMovies";

type MoviesType = {
  imdbID: number;
  Poster: string;
  Title: string;
  Year: number;
  
}

const App = () => {
  const [query, setQuery] = useState("");
  const {movies, isLoading, error} = useMovies(query);
  console.log(movies)

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
            <MovieList movies={movies}/>
          )}
        </Box>
      </Main>
    </>
  )
}

const Loader = () => {
  return <p className="loader">Loading...</p>
}

const ErrorMessage = ({message}: any) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

// NavBar
type NavBarProps = {
  children: ReactNode;
}

const NavBar = ({children}: NavBarProps) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

type SearchProps = {
  query: string;
  setQuery: (v: string) => void; 
}

const Search = ({query, setQuery}: SearchProps) => {
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
}

const NumResults = ({movies}: any) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}
// NavBar

// Main
type MainProps = {
  children: ReactNode;
}

const Main = ({children}: MainProps) => {
  return <main className="main">{children}</main>;
}
// Main


// Box
type BoxProps = {
  children: ReactNode;
}

const Box = ({children}: BoxProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>

      {isOpen && children}
    </div>
  )
}
// Box



const MoviesList = ({movies}: any) => {
  return (
    <ul className="list">
      {movies?.map((movie: any) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

const Movie = () => {
  return (
    <li>
      <img src="" alt="" />
      <h3></h3>
      <div>
        <p>
          <span>🗓</span>
          <span></span>
        </p>
      </div>
    </li>
  )
}

export default App