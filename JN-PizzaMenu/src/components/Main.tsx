import { useReducer, useEffect } from "react";
import FetchReducer, {Pizza} from "../reducer/FetchReducer";
const API_Pizza = "http://localhost:8000/pizzas";



const Main = () => {

  const [state, dispatch] = useReducer(FetchReducer, {
    pizzas: [],
    loading: false,
    error: false
  })

  useEffect(() => {
    dispatch({type: "receive"});

    setTimeout(() => {
      fetch(`${API_Pizza}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({type: "received", payload: result});
      })
      .catch(() => {
        dispatch({type: "error"});
      })
    }, 1000)
  }, [])


  return (
    <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-mono pb-6">Our menu</h2>
        <p className="text-sm w-4/5">
            Authentic Italian cuisine. 6 creative dishes to choose from.
            All from our stone oven, all organic, all delicious.
        </p>

        <div className="grid gap-10 grid-cols-2 p-8">
          {
            state.loading ? (<p>Loading...</p>) : state.pizzas.map((p) => (<Item key={p.name} pizza={p}/>))
          }
        </div>
    </div>
  )
}

const Item = ({pizza}: {pizza: Pizza}) => {
  const style = "flex flex-row gap-3";
  return (
    <div className={pizza.sold ? "flex flex-row gap-3 grayscale" : "flex flex-row gap-3"}>
      <div className="grow-0 shrink-0 w-32">
        <img src={pizza.photo} alt="pizza photo" />
      </div>
      
      <div className="flex flex-col gap-4 flex-1 text-left">
        <h2 className="text-2xl">{pizza.name}</h2>
        <h3 className="text-sm font-light">{pizza.describe}</h3>
        <p>{pizza.sold ? "Sold" : pizza.price}</p>
      </div>

    </div>
  )
}

export default Main