type StarProps = {
    star: number;
    starSum: number;
    handleStar: () => void;
    size: string;
    color: string;
}

const Star = ({star, starSum = 10, handleStar, size="32", color="yellow"}: StarProps) => {
    const stars = Array.from({length: 10});
  return (
    <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-around bg-red-300">
            {stars.map((s) => <span>✩</span>)}
            <span>10 ★</span>
        </div>
        <button className="p-4 outline-none rounded-sm bg-blue-900">+ Add to list</button>
    </div>
  )
}

export default Star