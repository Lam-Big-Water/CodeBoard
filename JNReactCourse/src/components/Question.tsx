import QuestionCard from './QuestionCard';

import {QuestionTypes} from './App';

type QuestionProps = {
  question: QuestionTypes;
  dispatch: Function;
  answer: null | number;
}

const Question = ({question, dispatch, answer}: QuestionProps) => {

  return (
    <div>
      <h4>{question.question}</h4>

      <QuestionCard question={question} dispatch={dispatch} answer={answer}/>
      
    </div>
  )
}

export default Question