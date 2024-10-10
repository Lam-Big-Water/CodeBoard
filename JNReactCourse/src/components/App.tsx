import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";

import Loader from "./Loader";
import Fail from "./Fail";
import StartScreen from "./StartScreen";

import Question from "./Question";

type QuestionTypes = {
  question: string;
  options: any[];
  correctOption: number;
  points: number;
};

// type StatusType = {
//     status: "loading" | "error" | "ready" | "active" | "finished";
// }

type State = {
  questions: QuestionTypes[];
  status: string;
};

const initialState = {
  questions: [],
  status: "loading",
};

interface DataReceived {
  type: "DATA_RECEIVED";
  payload: QuestionTypes[];
}

interface DATAFailed {
  type: "DATA_FAILED";
}

interface QuestionStart {
  type: "START";
}

type ActionType = DataReceived | DATAFailed | QuestionStart;

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "DATA_FAILED":
      return {
        ...state,
        status: "error",
      };
    case "START":
      return {
        ...state,
        status: "active",
      };
    default:
      throw new Error("Action unknown");
  }
}

const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "DATA_RECEIVED", payload: data });
      })
      .catch((err) => dispatch({ type: "DATA_FAILED" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        <>
          {status === "loading" && <Loader />}
          {status === "error" && <Fail />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && <Question />}
        </>
      </Main>
    </div>
  );
};

export default App;
