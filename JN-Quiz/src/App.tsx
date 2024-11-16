import { ReactNode, useEffect } from "react";
import Finished from "./components/Finished";
import Process from "./components/Process";
import QuestionBar from "./components/QuestionBar";
import Footer from "./components/Footer";
import { useQuiz } from "./context/QuizContext";

export default function App() {
  const {status, index, questions} = useQuiz();
  useEffect(function () {
    document.title = "The React Quiz";
  }, []);


  return (
    <div className="w-full h-screen bg-blue-950">
      <div className="max-w-3xl h-2/3 m-auto bg-slate-500">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorMessage />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
            <Process />
            <QuestionBar />

            </>
          )}
        </Main>
        
        {status === "finished" && <Finished />}
        <Footer />
      </div>
    </div>
  )
}

function Header () {
  return (
        <header className="flex flex-row items-center p-4 gap-6">
          <img className="w-16" src="vite.svg" alt="" />
          <h1 className="flex-1 text-6xl">The React Quiz</h1>
        </header>
  )
};

function Main ({children}: {children: ReactNode}) {
  return (
        <>
         {children}
        </>
  )
}

function Loader () {
  return (
    <p>Loading...</p>
  )
}

function ErrorMessage () {
  return (
    <p>Erroring...</p>
  )
}

function StartScreen () {
  const {numQuestions, dispatch} = useQuiz();
  return (
        <main className="w-3/4 flex flex-col items-center gap-8 m-auto">
          <h1 className="text-2xl">Welecome to The React Quiz!</h1>
          <p className="text-sm">{numQuestions} questions to test your React mastery</p>
          <button onClick={() => dispatch({type: "start"})} className="outline-none bg-orange-200 text-cyan-50 p-2 rounded-sm shadow-sm">Let's Start!</button>
        </main>
  )
}