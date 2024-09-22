import { useState } from "react";
import "./style.scss";

type ItemType = {
  eventTimes: number; 
  inputV: string;
  packed: boolean;
  id: number;
}
const App = () => {

  const [submitV, setSubmitV] = useState<ItemType[] | []>([]);
  console.log(submitV);

  const handleAddItems = (item: ItemType) => setSubmitV((submitV) => [...submitV, item]);



  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Far Away</h1>
        <div className="header-addEvent">
          <AddEvent
            onAddItems={handleAddItems}
          />
        </div>
      </header>

      <main className="operation">
        <EventArea />
      </main>

      <footer className="record">
        <h1 className="record-msg">
          💼 You have 7 items on your list, and you already packed 0 (0%)
        </h1>
      </footer>
    </div>
  );
};

type AddEventProps = {
  onAddItems: (newItem: ItemType) => void
};

const AddEvent = ({onAddItems}: AddEventProps) => {
  const [eventTimes, setEventTimes] = useState(1);
  const [inputV, setInputV] = useState("");

  const handleSubmit = () => {

    if (!inputV) return;

    const newItem = {eventTimes, inputV, packed: false, id: Date.now()};
    console.log(newItem);

    onAddItems(newItem);

    setEventTimes(1);
    setInputV("");
  }

  return (
    <>
      <label htmlFor="">What do you need for your 😍 trip?</label>
      <select value={eventTimes} onChange={(event) => setEventTimes(+event.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input type="text" onChange={(event) => setInputV(event.target.value)} value={inputV}/>
      <button onClick={handleSubmit}>ADD</button>
    </>
  );
};

const EventArea = () => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="operation-event">
        <ul>
          {arr.map((i) => (
            <Item item={i} />
          ))}
        </ul>
      </div>

      <div className="operation-sort">
        <Sort />
      </div>
    </>
  );
};

type ItemProps = { item: number };

const Item = ({ item }: ItemProps) => {
  return (
    <>
      <li>{item}</li>
    </>
  );
};

const Sort = () => {
  return (
    <>
      <select name="" id="">
        Sort By
      </select>
      <button>Clear List</button>
    </>
  );
};

export default App;
