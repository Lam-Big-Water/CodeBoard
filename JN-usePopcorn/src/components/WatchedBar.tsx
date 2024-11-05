
const WatchedBar = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-2 bg-purple-400 p-4">
        <h1 className="col-span-1 text-lg">Movies You Watched</h1>
        <div className="col-span-2 flex flex-row gap-4">
        <span>0 Movies</span>
        <span>Star 0</span>
        <span>IBM 0.00</span>
        <span>0 Min</span>
        </div>
    </div>
  )
}

export default WatchedBar