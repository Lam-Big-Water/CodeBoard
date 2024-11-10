
const Finished = () => {
  return (
    <div className="flex flex-col gap-4 bg-blue-300 p-4 text-center">
        <h1>You scored 0 out of 280 (0%)</h1>
        <p>(HighScore: 0 points)</p>
        <button className="ml-auto">Restart</button>
    </div>
  )
}

export default Finished