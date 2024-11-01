import { StateType } from "./reducer/EventReducer";

type FooterProps = {
  events: StateType[];
}

const Footer = ({events}: FooterProps) => {
  const eventsNum = events.length;
  const packedNum = events.filter((e) => e.status).length;
  const percentage = Math.round((packedNum / eventsNum) * 100);

  if (!events.length)
    return (
      <div className="w-full p-4 bg-indigo-500 text-sm text-center">
        Start adding some items to your packing list 🚀
      </div>
    )

  return (
    <div className="w-full p-4 bg-indigo-500 text-sm text-center">
      {
        percentage === 100
        ? "You got everything! Ready to go"
        : `You have ${eventsNum} items on your list, and you already packed ${packedNum} (${percentage}%)`
      }
    </div>
  )
}

export default Footer