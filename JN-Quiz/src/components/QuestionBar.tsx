
const QuestionBar = () => {
  return (
    <div className="flex flex-col bg-emerald-300 p-4 gap-4">
        <h1>Which is the most popular JS framework?</h1>
        <div className="flex-1 text-center p-1 bg-cyan-300 text-cyan-50">React</div>
        <div className="flex-1 text-center p-1 bg-cyan-300 text-cyan-50">Vite</div>
        <div className="flex-1 text-center p-1 bg-cyan-300 text-cyan-50">Vue</div>
        <div className="flex-1 text-center p-1 bg-cyan-300 text-cyan-50">Solid</div>

        <div className="flex flex-row justify-between pt-16">
            <div className="border-solid border-2 border-black">07:27</div>
            <div className="border-solid border-2 border-black">Next</div>
        </div>
    </div>
  )
}

export default QuestionBar