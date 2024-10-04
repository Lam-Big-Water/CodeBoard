import './style.scss';

const App = () => {
  return (
    <div className="app">
      <FriendList />
      <OperationForm />
    </div>
  )
};

const FriendList = () => {
  return (
    <div className="friendList">
      <ul className="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
      <button className="addFriend">Add Friends</button>
    </div>
  );
};

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
