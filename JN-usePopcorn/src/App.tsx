import { ChangeEvent, useEffect, useReducer, useState } from "react";

import SearchBar from "./components/SearchBar";
import Movie from "./components/Movie";
import WatchedBar from "./components/WatchedBar";
import Description from "./components/Description";

import { useMovies } from "./hook/useMovies";

import { MovieType, Actions, fetchReducer } from "./reducer/FetchMovies";

export default function App() {

  const [search, setSearch] = useState("");

  function handleSearch (e: ChangeEvent<HTMLInputElement>) {
    return setSearch(e.target.value);
  }

  const {state} = useMovies(search)

  // const [state, dispatch] = useReducer(fetchReducer, {
  //   search: [],
  //   isLoading: false,
  //   isError: false,
  // })

  // useEffect(() => {

  //   dispatch({type: "fetching"});

  //   fetch(`https://www.omdbapi.com/?apikey=f84fc31d&s=${search}`)
  //     .then(function (response) { return response.json()})
  //     .then((result) => {
  //       dispatch({
  //         type: "successful",
  //         payload: result.Search
  //       })
  //     })
  //     .catch(() => {
  //       dispatch({type: "failed"});
  //     });
  // }, []);


  return (
    <div className="w-full h-screen p-8 bg-slate-300">
      <SearchBar search={search} onSearch={handleSearch}/>

      <div className="flex flex-row w-full h-screen gap-10 py-8">
        <div className="flex-1 bg-yellow-200">
          <div className="flex flex-col gap-4 p-4">
            {state.isLoading ? <p>Loading...</p> : state.search.map((s) => ( <Movie key={s.imdbID} item={s} />))}
           
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 gap-4 bg-orange-300">
          {/* <WatchedBar />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie /> */}

            <Description />
        </div>
      </div>
    </div>
  )
}

