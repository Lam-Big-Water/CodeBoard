import './style.scss';

const App = () => {
  return (
    <div className="menu">
      <header className="menu-header">
        <h1 className="menu-header--f_title">Fast React Pizza Co.</h1>
        <p className="menu-header--s_title">our menu</p>
        <p className="menu-header--info">Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
      </header>
      <main className="menu-items">
        <div className="menu-items--dishes">
          <img className='menu-items--dishes--picture' src="https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg" alt="Focaccia" />
          <div className="menu-items--dishes--content">
            <h3>Focaccia</h3>
            <p>Bread with italian olive oil and rosemary</p>
            <span>6</span>
          </div>
        </div>
        <div className="menu-items--dishes">
          <img className='menu-items--dishes--picture' src="https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg" alt="Focaccia" />
          <div className="menu-items--dishes--content">
            <h3>Focaccia</h3>
            <p>Bread with italian olive oil and rosemary</p>
            <span>6</span>
          </div>
        </div>
        <div className="menu-items--dishes">
          <img className='menu-items--dishes--picture' src="https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg" alt="Focaccia" />
          <div className="menu-items--dishes--content">
            <h3>Focaccia</h3>
            <p>Bread with italian olive oil and rosemary</p>
            <span>6</span>
          </div>
        </div>
        <div className="menu-items--dishes">
          <img className='menu-items--dishes--picture' src="https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg" alt="Focaccia" />
          <div className="menu-items--dishes--content">
            <h3>Focaccia</h3>
            <p>Bread with italian olive oil and rosemary</p>
            <span>6</span>
          </div>
        </div>
        <div className="menu-items--dishes">
          <img className='menu-items--dishes--picture' src="https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg" alt="Focaccia" />
          <div className="menu-items--dishes--content">
            <h3>Focaccia</h3>
            <p>Bread with italian olive oil and rosemary</p>
            <span>6</span>
          </div>
        </div>
        <div className="menu-items--dishes">
          <img className='menu-items--dishes--picture' src="https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg" alt="Focaccia" />
          <div className="menu-items--dishes--content">
            <h3>Focaccia</h3>
            <p>Bread with italian olive oil and rosemary</p>
            <span>6</span>
          </div>
        </div>
        
      </main>
      <footer className="menu-footer">
        <p>We're happy to welcome you between 12:00 and 22:00.</p>
      </footer>
    </div>
  )
}

export default App