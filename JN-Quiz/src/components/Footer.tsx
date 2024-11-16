import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Footer = () => {
  const {status} = useQuiz();
  return (
        <div className="flex flex-row justify-between pt-16">
            {(status === "active" || status === "finished") && <NextButton />}
            {status === "active" && <Timer />}
        {/* <div className="border-solid border-2 border-black">07:27</div> */}
        </div>
  )

};

function NextButton() {
  const { status, numQuestions, index, answer, dispatch } = useQuiz();

  if (answer === null && status !== "finished") return null;

  let context;

  switch (true) {
    case status === "finished":
      context = {
        callback: () => dispatch({ type: "restart" }),
        text: "Restart Quiz",
      };
      break;

    case index < numQuestions - 1:
      context = {
        callback: () => dispatch({ type: "nextQuestion" }),
        text: "Next",
      };
      break;

    case index === numQuestions - 1:
      context = {
        callback: () => dispatch({ type: "finished" }),
        text: "Results",
      };
      break;

    default:
      throw new Error("Problem solving click handle in finish screen");
  }

  return <button onClick={context.callback} className="border-solid border-2 border-black">{context.text}</button>;
}

function Timer () {
    const {secondsRemaining, dispatch} = useQuiz();

    useEffect(
        function () {
            const id = setInterval(() => {
                dispatch({type: "tick"});
            }, 1000);
            return () => clearInterval(id);
        },
        [dispatch]
    );

    const formattedTime = function (totalSeconds: number) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <p>
            {secondsRemaining ? formattedTime(secondsRemaining) : ""}
        </p>
    )
}

export default Footer;
