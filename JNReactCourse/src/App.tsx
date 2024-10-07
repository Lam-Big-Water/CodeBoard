import { useState } from "react"
import StartRating from "./StarRating"
const App = () => {
  const [userRating, setUserRating] = useState("");
  return (
    <div>
      <StartRating maxRating={10} size={24} onSetRating={setUserRating}/>
    </div>
  )
}

export default App