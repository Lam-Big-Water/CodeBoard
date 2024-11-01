import { useState } from "react";

type AddEventProps = {
  dispatch: Function;
}

let nextId = 0;

const AddEvent = ({dispatch}: AddEventProps) => {
  const [priority, setPriority] = useState(1);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-row gap-4 justify-center items-center w-full p-4 bg-lime-200">
        <h1>What do you need for your 😍 trip?</h1>
        <select className="" value={priority} onChange={({target: {value}}) => setPriority(Number(value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
        ))}
        </select>
        <input type="text" placeholder="Item..." value={text} onChange={({target: {value}}) => setText(value)}/>
        <button onClick={() => {
          if (!text) return;
          dispatch({
            type: "Added",
            id: nextId++,
            priority: priority,
            description: text
          });
          setText("");
          setPriority(1);
        }} disabled={text ? false : true}>ADD</button>
    </div>
  )
}

export default AddEvent