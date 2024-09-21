import './style.scss';
const App = () => {
  return (
    <div className="container">
      <header className='header'>
        <h1 className="header-title">Far Away</h1>
        <div className="header-addEvent">
          input
        </div>
      </header>

      <main className='operation'>
        <div className="operation-event">

        </div>
        <div className="operation-sort">

        </div>
      </main>

      <footer className='record'>
        <h1 className='record-msg'>💼 You have 7 items on your list, and you already packed 0 (0%)</h1>
      </footer>
    </div>
  )
}

export default App