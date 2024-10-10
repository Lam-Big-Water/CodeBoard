import { QuestionTypes } from "./App";

type QuestionCardProps = {
  question: QuestionTypes;
  dispatch: Function;
  answer: null | number;
};
const QuestionCard = ({ question, dispatch, answer }: QuestionCardProps) => {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "NEW_ANSWER", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
