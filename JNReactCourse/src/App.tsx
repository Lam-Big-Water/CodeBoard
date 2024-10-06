import { useState, FormEvent} from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

type InitialType = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

// reuse
const Button = ({children, onClick}) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

const App = () => {
  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState<InitialType | null>(null);

  const handleAddFriend = (friend: InitialType) => {
    setFriends((friends) => [...friends, friend]);
  }

  const handleSelection = (friend: InitialType) => {
    setSelectedFriend((cur: any) => (cur?.id === friend.id ? null : friend));
    
  }
  console.log(selectedFriend);

  // const handleSplitBill = (value) => {
  //   setFriends((friends) =>
  //     friends.map((friend) =>
  //       friend.id === 
  //     )
  //   )
  // }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} />

        <FormAddFriend onAddFriend={handleAddFriend}/>

        <Button>

        </Button>
      </div>

      {
        selectedFriend && (
          <FormSplitBill 
            selectedFriend={selectedFriend}
            key={selectedFriend.id}
          />
        )
      }
      

    </div>
  )
}

type FriendsList = {
  friends: InitialType[];
  onSelection: (friend: InitialType) => void;
}

const FriendsList = ({friends, onSelection}: FriendsList) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection}/>
      ))}
    </ul>
  )
}

type FriendProps = {
  friend: InitialType;
  onSelection: (friend: InitialType) => void;
}

const Friend = ({friend, onSelection}: FriendProps) => {
  return (
    <li>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owns you {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>

      </Button>
    </li>
  )
}

type FormAddFriend = {
  onAddFriend: (friends: InitialType) => void;
}

const FormAddFriend = ({onAddFriend}: FormAddFriend) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = Number(crypto.randomUUID());
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input 
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input 
      type="text"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

type FormSplitBillProps = {
  selectedFriend: InitialType;
}

const FormSplitBill = ({selectedFriend}: FormSplitBillProps) => {
  return (
    <form>
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label htmlFor="">Bill value</label>
      <input type="text" />

      <label htmlFor="">Your expense</label>
      <input type="text" />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" />

      <label htmlFor="">Who is paying the bill</label>
      <select>
        <option value="">You</option>
        <option value="">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}


export default App;
