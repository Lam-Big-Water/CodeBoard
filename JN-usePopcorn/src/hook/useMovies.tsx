import { useEffect, useReducer } from "react";

import { MovieType, Actions, fetchReducer } from "../reducer/FetchMovies";

const KEY = "f84fc31d";


export function useMovies (query: string) {

    const [state, dispatch] = useReducer(fetchReducer, {
        search: [],
        isLoading: false,
        isError: false,
    });

    useEffect(() => {
        const controller = new AbortController();

        if (query.length < 3) return

        async function fetchMovies () {
            try {
                dispatch({type: "fetching"});

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    {signal: controller.signal},
                )

                if (!res.ok) throw new Error("Something is wrong!!");
                
                const data = await res.json();
                if (data.response === "False") throw new Error("Not Found!!")

                dispatch({type: "successful", payload: data.Search})

            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.log(err.message);
                    dispatch({type: "failed"})
                }
            }
        }

        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query])

    return {state};
}