import { useQuiz } from "../context/QuizContext";

const Finished = () => {
  const {maxPossiblePoints, points, highScore} = useQuiz();
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  switch (true) {
    case percentage === 100:
      emoji = "💯";
      break;
    
    case percentage === 0:
      emoji = "💥";
      break;

    default:
      "";
      break;
  }

  return (
    <div className="flex flex-col gap-4 bg-blue-300 p-4 text-center">
        <h1>{emoji} {" "} You scored {points} out of {maxPossiblePoints} ({percentage}%)</h1>
        <p>(HighScore: {highScore} points)</p>
    </div>
  )
}

export default Finished