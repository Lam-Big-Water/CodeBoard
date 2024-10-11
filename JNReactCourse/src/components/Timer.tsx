import { useEffect } from "react"

type TimerProps = {
    dispatch: Function;
    secondsRemaining: null | number;
}

const Timer = ({dispatch, secondsRemaining}: TimerProps) => {
    const mins = secondsRemaining && Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining && secondsRemaining % 60;
    

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({type: "TICK"});
        }, 1000);

        return () => clearInterval(id);

    }, [dispatch]);

  return (
    <div className="timer">{mins && mins < 10 && "0"}{mins}:{seconds && seconds < 10 && "0"}{seconds}</div>
  )
}

export default Timer