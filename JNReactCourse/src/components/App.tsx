import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";

import Loader from "./Loader";
import Fail from "./Fail";
import StartScreen from "./StartScreen";

import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

export type QuestionTypes = {
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
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
};

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
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

interface NewAnswer {
  type: "NEW_ANSWER";
  payload: number | null;
}

interface NextQuestion {
  type: "NEXT_QUESTION";
}

interface Finished {
  type: "FINISHED";
}

interface RESTART {
  type: "RESTART";
}

type ActionType = DataReceived | DATAFailed | QuestionStart | NewAnswer | NextQuestion | Finished | RESTART;

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
    case "NEW_ANSWER":
      const question = state.questions.at(state.index);
      console.log(question)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question?.correctOption ? state.points + question.points : state.points,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case "FINISHED":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : state.highScore,
      }
    case "RESTART":
      return {
        ...initialState, questions: state.questions, status: "ready"
      }
    default:
      throw new Error("Action unknown");
  }
}

const App = () => {
  const [{ questions, status, index, answer, points, highScore }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

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
          {status === "loading" && <Loader />}
          {status === "error" && <Fail />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
              <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
            </>
          )}
          {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
};

export default App;
