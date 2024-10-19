import "./style.scss";

const App = () => {
  return (
    <div className="app">
      <header className="headerLayout">
        <LogoWithSearch />
      </header>

      <main className="mainLayout">
        <ShowList />
        {/* <SaveList /> */}
        <MovieDescribe />
        
      </main>
    </div>
  );
};

const LogoWithSearch = () => {
  return (
    <div className="logoWithSearch">
      <h3 className="logo">usePopcorn</h3>
      <input className="searchInput" type="text" />
      <span className="result">Found Results</span>
    </div>
  );
};

const ShowList = () => {
  return (
    <div className="showList">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <ShowListItem key={num} />
      ))}
    </div>
  );
};

const ShowListItem = () => {
  return (
    <div className="showList-item">
      <img
        src="https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
        alt=""
        className="showList-item--photo"
        width={60}
        height={100}
      />
      <h3 className="showList-item--name">Crazy, Stupid, Love</h3>
      <span className="showList-item--release">2001</span>
    </div>
  );
};

const SaveList = () => {
  return (
    <div className="saveList">
      <SaveListNote />

      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <SaveListItem key={num} />
      ))}
    </div>
  );
};

const SaveListNote = () => {
  return (
    <div className="saveListNote">
      <h3 className="saveListNote-title">Movies You Watched</h3>
      <div className="saveListNote-info">
        <span className="saveListNote-info--sum">0 Movies</span>
        <span className="saveListNote-info--imdb">0.00</span>
        <span className="saveListNote-info--your">0.00</span>
        <span className="saveListNote-info--duration">0 Min</span>
      </div>
    </div>
  );
};

const SaveListItem = () => {
  return (
    <div className="saveList-item">
      <img
        src="	https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
        alt=""
        className="saveList-item--photo"
        width={60}
        height={100}
      />{" "}
      <h3 className="saveList-item--name">Thor: Love and Thunder</h3>
      <div className="item-info">
        <span className="item--imdb">0.00</span>
        <span className="item--your">0.00</span>
        <span className="item--duration">0 Min</span>
      </div>
    </div>
  );
};

const MovieDescribe = () => {
  return (
    <div className="movieDescribe">
      <MovieDetails />

      <p className="movieDescribe-info">
        An unhinged American general orders a bombing attack on the Soviet
        Union, triggering a path to nuclear holocaust that a war room full of
        politicians and generals frantically tries to stop.
      </p>
    </div>
  )
};

const MovieDetails = () => {
  return (
    <div className="details">
      <img src="https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg" alt="" className="details-photo" width={180} height={300}/>
      <h3 className="details-name">Crazy, Stupid, Love.</h3>
      <p className="details-info">29 Jan 1964 . 95 min</p>
      <p className="details-author">Comedy, War</p>
      <p className="details-imdb">8.3 IMDb rating</p>
    </div>
  );
};

export default App;
