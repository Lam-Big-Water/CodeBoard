
export type MovieType = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

type States = {
    Search: MovieType[];
    isLoading: boolean;
    isError: boolean;
}

export type Actions =
 | {type: "fetching";}
 | {type: "successful"; payload: MovieType[];}
 | {type: "failed";}

export function fetchReducer (state: States, action: Actions) {
    switch (action.type) {
        case "fetching":
            return {
                ...state,
                isLoading: true,
                isError: false,
            }

        case "successful":
            return {
                ...state,
                isLoading: false,
                isError: false,
                Search: action.payload,
            }

        case "failed":
            return {
                ...state,
                isLoading: false,
                isError: true,
            }

        default:
            throw new Error();
    }
 }