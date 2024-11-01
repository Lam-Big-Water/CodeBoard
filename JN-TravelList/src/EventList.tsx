import { useState } from "react";
import { Actions } from "./reducer/EventReducer";
import { StateType } from "./reducer/EventReducer";

type EventListProps = {
  events: StateType[];
  dispatch: (type: Actions) => void;
};

const EventList = ({ events, dispatch }: EventListProps) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = events;

  if (sortBy === "priority") {
    console.log("priority")
    sortedItems = events.slice().sort((a, b) => b.priority - a.priority);
  }

  if (sortBy === "packed") {
    console.log("packed")
    sortedItems = events
      .slice()
      .sort((a, b) => Number(b.status) - Number(a.status));
  }

  return (
    <>
      {sortedItems && (
        <div className="w-full flex-1 flex flex-row gap-6 justify-star bg-yellow-100 p-4">
          {sortedItems.map((list) => (
            <Item key={list.id} item={list} dispatch={dispatch} />
          ))}
        </div>
      )}
      <Sort setSortBy={setSortBy} />
    </>
  );
};

type ItemProps = {
  item: StateType;
  dispatch: (type: Actions) => void;
};

const Item = ({ item, dispatch }: ItemProps) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.status}
        onChange={({ target: { checked } }) => {
          dispatch({ type: "Changed", lists: { ...item, status: checked } });
        }}
      />
      <span>{item.priority}</span>
      <span>{item.description}</span>
      <span onClick={() => dispatch({ type: "Deleted", id: item.id })}>❌</span>
    </li>
  );
};

type SortProps = {
  setSortBy: (value: string) => void;
};

const Sort = ({ setSortBy }: SortProps) => {
  return (
    <div className="w-full flex flex-row justify-center gap-4 bg-blue-200 py-10">
      <select
        onChange={({ target: { value } }) => {
          setSortBy(value);
        }}
      >
        <option value="input">sort by input</option>
        <option value="priority">sort by priority order</option>
        <option value="packed">sort by packed status</option>
      </select>
      <button>clear list</button>
    </div>
  );
};

export default EventList;
