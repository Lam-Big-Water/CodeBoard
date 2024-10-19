import { useState } from 'react';
import './style.scss';

const initialData = [
  { 
    id: 1,
    name: 'Clark',
    avatar: 'https://i.pravatar.cc/48?u=118836',
    money: 7,
  },
  {
    id: 2,
    name: 'Sarah',
    avatar: 'https://i.pravatar.cc/48?u=933372',
    money: -20,
  },
  {
    id: 3,
    name: 'Anthony',
    avatar: 'https://i.pravatar.cc/48?u=499476',
    money: 0,
  },

];

type InitialData = {
  id: number;
  name: string;
  avatar: string;
  money: number;
}

// const Button = ({children, onClick}) => {
//   return (
//     <button className='button' onClick={onClick}>
//       {children}
//     </button>
//   )
// }

const App = () => {
  const [friends, setFriends] = useState<InitialData[] | []>(initialData);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSeletedFriend] = useState(null);

  function handleShowAddFriend () {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend (friend) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <FriendList data={friends} onClick={handleShowAddFriend} showAddFriend={showAddFriend}/>
      <OperationForm />
    </div>
  )
};

type FriendListProps = {
  data: InitialData[];
  onClick: () => void;
  showAddFriend: boolean;
};

const FriendList = ({data, onClick, showAddFriend}: FriendListProps) => {
  return (
    <div className="friendList">
      <ul className="list">
        {
          data.map((item) => <Item key={item.id} item={item}/>)
        }
      </ul>
      <button className="addFriend" onClick={onClick}>{showAddFriend ? 'Close' : 'Add Friends'}</button>
        {showAddFriend && <AddFriendsForm />}
      
    </div>
  );
};

type ItemProps = {
  item: InitialData;
}

const Item = ({item}: ItemProps) => {
  return (
    <li className='userInterface'>
      <img className='userInterface-avatar' src={item.avatar} alt="" />
      <h3 className='userInterface-userName'>{item.name}</h3>
      <p className='userInterface-notes'>{item.money}</p>
      <button className="userInterface-selectUser">Close</button>
    </li>
  )
}

const AddFriendsForm = () => {
  return (
    <div className="addFriends">
      <div className="addFriends-form">
      <label htmlFor="">Friend Name</label>
      <input type="text" />
      <label htmlFor="">Image URL</label>
      <input type="text" />
      <button className='addFriends-button'>Add</button>
      </div>
      <button className="addFriendClose">Close</button>
    </div>
  )
}

const OperationForm = () => {
  return (
    <div className="operation">
      <form className="ope-form">
        <h1 className='ope-form--title'>split a bill with Anthony</h1>
        <label htmlFor="">Bill Value</label>
        <input type="text" />
        <label htmlFor="">Your expense</label>
        <input type="text" />
        <label htmlFor="">Anthony's expense</label>
        <input type="text" />
        <label htmlFor="">Who is paying the bill</label>
        <select name="" id="">
          <option value="You">You</option>
        </select>
      </form>
      <button className="split">Split Bill</button>
    </div>
  );
};

export default App;
