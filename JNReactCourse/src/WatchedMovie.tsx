export default function WatchedMovie() {
  return (
    <li>
      <img
        src="https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
        alt=""
        width={100}
      />
      <h3>Love</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>7.4</span>
        </p>
        <p>
          <span>🌟</span>
          <span>10.0</span>
        </p>
        <p>
          <span>⏳</span>
          <span>118 min</span>
        </p>

        <button
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}
