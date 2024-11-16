import { useQuiz } from "../context/QuizContext";

const Process = () => {
  const {points, index, numQuestions, answer, maxPossiblePoints} = useQuiz();
  return (
    <div className="bg-purple-400 p-4 text-cyan-50">
        <progress className="w-full text-cyan-50" value={index + Number(answer !== null)} max={numQuestions}>
          {index + 1}% canis <p>canis</p>
        </progress>
        <div className="flex flex-row justify-between pt-16">
            <div className="border-solid border-2 border-black">Question {index + 1} / {numQuestions}</div>
            <div className="border-solid border-2 border-black">{points} / {maxPossiblePoints} points</div>
        </div>
    </div>
  )
}

export default Process