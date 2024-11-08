import { ChangeEvent, useEffect, useReducer, useState } from "react";

import SearchBar from "./components/SearchBar";
import Movie from "./components/Movie";
import WatchedBar from "./components/WatchedBar";
import Description from "./components/Description";

import { useFakeMovies } from "./hook/useMovies";

import { MovieType } from "./reducer/FetchMovies";

export default function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MovieType | null>(null);
  console.log(selected)

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    return setSearch(e.target.value);
  }

  // const { state } = useMovies(search);
  const {movies, isLoading, isError} = useFakeMovies(search);
  console.log(movies)

  return (
    <div className="w-full h-screen p-8 bg-slate-300">
      <SearchBar search={search} onSearch={handleSearch} />

      <div className="flex flex-row w-full h-screen gap-10 py-8">
        <div className="flex-1 bg-yellow-200">
          <div className="flex flex-col gap-4 p-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              movies.map((s) => (
                <Movie key={s.imdbID} item={s} setSelected={setSelected} />
              ))
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 gap-4 bg-orange-300">
          {/* <WatchedBar />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie /> */}

          {selected && <Description/>}
        </div>
      </div>
    </div>
  );
}
