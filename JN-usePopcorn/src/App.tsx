import { useEffect, useReducer } from "react";

import SearchBar from "./components/SearchBar";
import Movie from "./components/Movie";
import WatchedBar from "./components/WatchedBar";
import Description from "./components/Description";

import { MovieType, Actions, fetchReducer } from "./reducer/FetchMovies";

export default function App() {

  const [state, dispatch] = useReducer(fetchReducer, {
    Search: [],
    isLoading: false,
    isError: false,
  })

  useEffect(() => {

    dispatch({type: "fetching"});

    fetch('https://www.omdbapi.com/?apikey=f84fc31d&s=love')
      .then(function (response) { return response.json()})
      .then((result) => {
        dispatch({
          type: "successful",
          payload: result.Search
        })
      })
      .catch(() => {
        dispatch({type: "failed"});
      });
  }, []);


  return (
    <div className="w-full h-screen p-8 bg-slate-300">
      <SearchBar />

      <div className="flex flex-row w-full h-screen gap-10 py-8">
        <div className="flex-1 bg-yellow-200">
          <div className="flex flex-col gap-4 p-4">
            {state.isLoading ? <p>Loading...</p> : state.Search.map((s) => ( <Movie key={s.imdbID} item={s} />))}
           
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

