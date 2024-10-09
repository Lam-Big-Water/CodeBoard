import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";

type QuestionTypes = {
    question: string;
    options: any[];
    correctOption: number;
    points: number;
    // status: "loading" | "error" | "ready" | "active" | "finished";
}

type State = {
    questions: QuestionTypes[];
}

const initialState = {
    questions: [],
    // status: "loading",
};

interface DataReceived {
    type: "DATA_RECEIVED";
    payload: QuestionTypes[];
}

type ActionType = DataReceived;


function reducer(state: State, action: ActionType) {
    switch(action.type) {
        case "DATA_RECEIVED":
            return {
                ...state,
                questions: action.payload,
                // status: "ready"
            };
        default:
            throw new Error("Action unknown");
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => {
                dispatch({type: "DATA_RECEIVED", payload: data})
            })
            .catch((err) => console.error("Error"));
    }, []);
    return (
        <div className="app">
            <Header />

            <Main>
                <>
                    
                </>
            </Main>
        </div>
    )
}

export default App;