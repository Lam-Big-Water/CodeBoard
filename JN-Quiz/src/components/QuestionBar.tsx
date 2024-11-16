import { useQuiz } from "../context/QuizContext";

const QuestionBar = () => {
  const { question, dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className="flex flex-col bg-emerald-300 p-4 gap-4">
      <h1>{question.question}</h1>

      {question.options.map((option, index) => (
        <button
          key={index}
          className={`flex-1 text-center bg-blue-200 p-1 ${index === answer ? " text-green-500" : "text-cyan-50"}`}
          onClick={() => dispatch({type: "newAnswer", payload: index})}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
    // <div className="flex flex-row justify-between pt-16">
    //     <div className="border-solid border-2 border-black">07:27</div>
    // </div>
  );
};

export default QuestionBar;
