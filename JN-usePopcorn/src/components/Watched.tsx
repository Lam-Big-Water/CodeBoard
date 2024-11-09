
const Watched = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-3 grid-rows-2 bg-pink-400">
        <img className="w-16 col-start-1 col-end-2 row-start-1 row-end-3" src='https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg' alt="Photo" />
        <h3 className="col-start-2 col-end-4 row-span-1">Crazy, Stupid, Love.</h3>
        <p className="col-start-2 col-end-4 row-span-2">🗓 2011</p>
        </div>
    </div>
  )
}

export default Watched