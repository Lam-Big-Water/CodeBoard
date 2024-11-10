import Finished from "./components/Finished";
import Process from "./components/Process";
import QuestionBar from "./components/QuestionBar";

export default function App() {
  return (
    <div className="w-full h-screen bg-blue-950">
      <div className="max-w-3xl h-2/3 m-auto bg-slate-500">
        <header className="flex flex-row items-center p-4 gap-6">
          <img className="w-16" src="vite.svg" alt="" />
          <h1 className="flex-1 text-6xl">The React Quiz</h1>
        </header>
        {/* <main className="w-3/4 flex flex-col items-center gap-8 m-auto">
          <h1 className="text-2xl">Welecome to The React Quiz!</h1>
          <p className="text-sm">15 questions to test your React mastery</p>
          <button className="outline-none bg-orange-200 text-cyan-50 p-2 rounded-sm shadow-sm">Let's Start!</button>
        </main> */}
        {/* <Process /> */}
        <QuestionBar />
        <Finished />
      </div>
    </div>
  )
}