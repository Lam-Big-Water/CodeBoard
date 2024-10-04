import { ChangeEvent, useState, MouseEventHandler } from "react";
import "./style.scss";

type ItemType = {
  eventTimes: number;
  inputV: string;
  packed: boolean;
  id: number;
};
const App = () => {
  const [submitV, setSubmitV] = useState<ItemType[] | []>([]);
  console.log(submitV);

  const handleAddItems = (item: ItemType) =>
    setSubmitV((submitV) => [...submitV, item]);

  const handleToggleItem = (id: number) => {
    setSubmitV((submitV) =>
      submitV.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    const newPosts = submitV.filter((item) => item.id !== id);
    setSubmitV(newPosts);
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete all items?`
    );

    if (confirmed) setSubmitV([]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Far Away</h1>
        <div className="header-addEvent">
          <AddEvent onAddItems={handleAddItems} />
        </div>
      </header>

      <main className="operation">
        <EventArea
          lists={submitV}
          toggleItem={handleToggleItem}
          RemoveItems={handleRemoveItem}
          clearList={handleClearList}
        />
      </main>

      <Status progress={submitV} />
    </div>
  );
};

type AddEventProps = {
  onAddItems: (newItem: ItemType) => void;
};

const AddEvent = ({ onAddItems }: AddEventProps) => {
  const [eventTimes, setEventTimes] = useState(1);
  const [inputV, setInputV] = useState("");

  const handleSubmit = () => {
    if (!inputV) return;

    const newItem = { eventTimes, inputV, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setEventTimes(1);
    setInputV("");
  };

  return (
    <>
      <label htmlFor="">What do you need for your 😍 trip?</label>
      <select
        value={eventTimes}
        onChange={(event) => setEventTimes(+event.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        onChange={(event) => setInputV(event.target.value)}
        value={inputV}
      />
      <button onClick={handleSubmit}>ADD</button>
    </>
  );
};

type EventAreaProps = {
  lists: ItemType[];
  toggleItem: (id: number) => void;
  RemoveItems: (id: number) => void;
  clearList: MouseEventHandler<HTMLButtonElement>;
};

const EventArea = ({
  lists,
  toggleItem,
  RemoveItems,
  clearList,
}: EventAreaProps) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = lists;

  if (sortBy === "description") {
    sortedItems = lists
      .slice()
      .sort((a, b) => a.inputV.localeCompare(b.inputV));
  }

  if (sortBy === "packed") {
    sortedItems = lists
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  const handleSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <div className="operation-event">
        <ul>
          {sortedItems?.map((i) => (
            <Item
              key={i.id}
              item={i}
              onToggleItem={toggleItem}
              onRemoveItems={RemoveItems}
            />
          ))}
        </ul>
      </div>

      <div className="operation-sort">
        <Sort sortBy={sortBy} onSortBy={handleSortBy} onClearList={clearList} />
      </div>
    </>
  );
};

type ItemProps = {
  item: ItemType;

  onToggleItem: (id: number) => void;
  onRemoveItems: (id: number) => void;
};

const Item = ({ item, onToggleItem, onRemoveItems }: ItemProps) => {
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={+item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.inputV}
        </span>
        <span onClick={() => onRemoveItems(item.id)}>-close</span>
      </li>
    </>
  );
};

type SortProps = {
  sortBy: string;
  onSortBy: (event: ChangeEvent<HTMLSelectElement>) => void;
  onClearList: MouseEventHandler<HTMLButtonElement>;
};
const Sort = ({ sortBy, onSortBy, onClearList }: SortProps) => {
  return (
    <>
      <select
        className="actions"
        name=""
        id=""
        value={sortBy}
        onChange={onSortBy}
      >
        <option value="input">Sort by input</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={onClearList}>Clear List</button>
    </>
  );
};

type StatusProps = {
  progress: ItemType[];
};
const Status = ({ progress }: StatusProps) => {
  if (!progress.length)
    return (
      <p className="status">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = progress.length;
  const numPacked = progress.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  console.log(numItems, numPacked, percentage)

  return (
    <footer className="record">
      <h1 className="record-msg">
        {percentage === 100
          ? "You got everything! Ready to go"
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </h1>
    </footer>
  );
};

export default App;
