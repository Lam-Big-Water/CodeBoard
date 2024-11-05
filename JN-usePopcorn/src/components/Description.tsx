import Star from "./Star";

const Description = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="grid grid-cols-3 grid-rows-4">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
          alt=""
          className="w-32 col-start-1 col-end-2 row-span-4"
        />
        <h1 className="col-span-2 row-span-1">Crazy, Stupid, Love.</h1>
        <p className="col-span-2 row-span-1">29 Jul 2011 • 118 min</p>
        <p className="col-span-2 row-span-1">Comedy, Drama, Romance</p>
        <p className="col-span-2 row-span-1">7.4 IMDb rating</p>
      </div>

      <Star />

      <div className="text-sm">
        <p>
          A middle-aged husband's life changes dramatically when his wife asks
          him for a divorce. He seeks to rediscover his manhood with the help of
          a newfound friend, Jacob, learning to pick up girls at bars.
        </p>
      </div>

      <div className="text-sm">
        <p>Starring Steve Carell, Ryan Gosling, Julianne Moore</p>
      </div>
    </div>
  );
};

export default Description;
