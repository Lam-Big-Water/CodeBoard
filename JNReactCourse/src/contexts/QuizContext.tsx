import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

const QuizContext = createContext(undefined);

const SECS_PER_QUESTION = 30;

type InitialType = {
  questions: any[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: any;
  points: number;
  hightScore: number;
  secondsRemaining: number;
};

const initialState = {
  questions: [],

  // 'loading, 'error', 'ready', 'active', 'finished'

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

type QuizDataReceived = {
  type: "dataReceived";
  payload: InitialType;
};

type QuizDataFailed = {
  type: "dataFailed";
};

type QuizStart = {
  type: "start";
};

type QuizNewAnswer = {
  type: "newAnswer";
  payload: InitialType;
};

type QuizNextQuestion = {
  type: "nextQuestion";
};

type QuizFinish = {
  type: "finish";
};

type QuizRestart = {
  type: "restart";
};

type QuizTick = {
  type: "tick";
};

type QuizAction =
  | QuizDataReceived
  | QuizDataFailed
  | QuizStart
  | QuizNewAnswer
  | QuizNextQuestion
  | QuizFinish
  | QuizRestart
  | QuizTick;

function reducer(state: InitialType, action: QuizAction) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question?.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.hightScore ? state.points : state.hightScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

type QuizProviderProps = {
    children: ReactNode;
}

function QuizProvider({children}: QuizProviderProps) {
    const [
        {questions, status, index, answer, points, hightScore, secondsRemaining},
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0
    );

    useEffect(function () {
        fetch("http://localhost:9000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataReceived", payload: data}))
            .catch((err) => dispatch({type: "dataFailed"}));
    }, [])

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                hightScore,
                secondsRemaining,
                numQuestions,
                maxPossiblePoints,

                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("QuizContext was used outside of the QuizProvider");
    return context;
}

export {QuizProvider, useQuiz};