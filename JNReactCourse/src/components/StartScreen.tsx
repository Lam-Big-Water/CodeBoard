
type StartScreenProps = {
    numQuestions: number;
    dispatch: (Function);
}

const StartScreen = ({numQuestions, dispatch}: StartScreenProps) => {
  return (
    <div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numQuestions} question to test your React mastery</h3>
        <button onClick={() => dispatch({type: "START"})}>Let's start</button>
    </div>
  )
}

export default StartScreen