import { ReactNode, useReducer, useState } from "react";
import type { Dispatch, FormEvent } from "react";
import { States, Actions, friendReducer } from "./reducer/FriendReducer";

const initialData: States[] = [
  {
    id: 1,
    name: "Sam Lam",
    avatar: "https://i.pravatar.cc/48",
    balance: 20,
  },
  {
    id: 2,
    name: "John Water",
    avatar: "https://i.pravatar.cc/48",
    balance: -10,
  },
  {
    id: 3,
    name: "Robbie Stewart",
    avatar: "https://i.pravatar.cc/48",
    balance: 0,
  },
];

let nextId = 4;

const App = () => {
  const [state, dispatch] = useReducer(friendReducer, initialData);
  const [selected, setSelected] = useState<States | null>(null);

  return (
    <div className="flex flex-row gap-8 w-full h-screen p-12 bg-slate-400">
      <div className="flex-1 p-8 bg-blue-300">
        <FriendLists state={state} setSelected={setSelected}/>
        <AddNewFriend dispatch={dispatch} />
      </div>

      <div className="flex-1 bg-green-400 p-8">
        <SplitBill selected={selected} dispatch={dispatch}/>
      </div>
    </div>
  );
};

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      className="w-20 ml-auto bg-red-500 px-4 py-2 text-cyan-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const LabelWithInput = ({ label, type }: { label: string; type: string }) => {
  return (
    <div className="flex flex-row justify-between">
      <label>{label}</label>
      <input className="w-32" type={type} />
    </div>
  );
};

const LabelWithSelect = ({ label }: { label: string }) => {
  return (
    <div>
      <label>{label}</label>
      <select name="" id="">
        <option value="">You</option>
        <option value="">Other</option>
      </select>
    </div>
  );
};
// -------------------------------------------------------------

type FriendListsProps = {
  state: States[];
  setSelected: (friend: States) => void
};

const FriendLists = ({ state, setSelected }: FriendListsProps) => {
  return (
    <div className="flex flex-col gap-4 bg-orange-400">
      {state.map((s) => (
        <FriendItem key={s.id} item={s} setSelected={setSelected} />
      ))}
      <Button>Add</Button>
    </div>
  );
};

type FriendItemProps = {
  item: States;
  setSelected: (friend: States) => void
};

const FriendItem = ({ item, setSelected }: FriendItemProps) => {
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-2 p-4 bg-yellow-500">
      <img
        className="row-start-1 row-end-3"
        src={item.avatar}
        alt="Friend Avatar"
      />
      <p className="row-span-1">{item.name}</p>
      <p className="row-span-1">
        You owe {item.name} {item.balance}€
      </p>
      <button onClick={() => setSelected(item)}>Select</button>
    </div>
  );
};

//--------------------------------------------------------------

type AddNewFriendProps = {
  dispatch: Dispatch<Actions>;
};

const AddNewFriend = ({ dispatch }: AddNewFriendProps) => {
  const [friendName, setFriendName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/48");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 bg-pink-400 p-8">
        <div className="flex flex-row justify-between">
          <label>Name</label>
          <input className="w-32" type="text" value={friendName} onChange={({target: {value}}) => setFriendName(value)}/>
        </div>
        <div className="flex flex-row justify-between">
          <label>URL</label>
          <input className="w-32" type="text" value={avatarUrl} onChange={({target: {value}}) => setAvatarUrl(value)}/>
        </div>

        <Button
          onClick={() =>
            dispatch({ type: "Added", id: nextId++, name: friendName, avatar: avatarUrl })
          }
        >
          Add
        </Button>
      </div>
      <Button>Close</Button>
    </div>
  );
};

//--------------------------------------------------------------

type SplitProps = {
  selected: States | null;
  dispatch: Dispatch<Actions>;
}

const SplitBill = ({selected, dispatch}: SplitProps) => {
  const [billSum, setBillSum] = useState(0);
  const [expense, setExpense] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = billSum ? billSum - expense : 0

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  
  return (
    <form className="flex flex-col gap-4 bg-yellow-700 p-8" onSubmit={handleSubmit}>
      <h2>Split a bill with {selected?.name}</h2>
        <div className="flex flex-row justify-between">
          <label>💰 Bill value</label>
          <input className="w-32" type="text" value={billSum} onChange={({target: {value}}) => setBillSum(Number(value))}/>
        </div>
        <div className="flex flex-row justify-between">
          <label>🧍‍♀️ Your expense</label>
          <input className="w-32" type="text" value={expense} onChange={({target: {value}}) => setExpense(Number(value))}/>
        </div>
        <div className="flex flex-row justify-between">
          <label>👫 {selected?.name}'s expense</label>
          <input className="w-32" type="text" disabled value={paidByFriend} />
        </div>
        <div>
      <label>🤑 Who is paying the bill</label>
      <select onChange={({target: {value}}) => setWhoIsPaying(value)}>
        <option value="user">You</option>
        <option value="friend">{selected?.name}</option>
      </select>
    </div>
      {selected && <button onClick={() => dispatch({type: "Changed", friend: {...selected, balance: whoIsPaying === "user" ? (selected.balance + paidByFriend) : (selected.balance - paidByFriend)}})}>Split bill</button>}
    </form>
  );
};
//  

export default App;
