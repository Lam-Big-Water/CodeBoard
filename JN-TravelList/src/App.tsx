import { useReducer } from "react";
import { eventReducer } from "./reducer/EventReducer";
import AddEvent from "./AddEvent";
import EventList from "./EventList";
import Footer from "./Footer";

export default function App() {

  const [events, dispatch] = useReducer (eventReducer, []);

  return (
    <div className="max-w-full min-h-screen flex flex-col items-center m-auto bg-stone-700">
      <h1 className="w-full text-4xl text-center p-4 bg-slate-400">🏝️ FAR AWAY 🧳</h1>
      <AddEvent dispatch={dispatch}/>
      <EventList events={events} dispatch={dispatch}/>
      <Footer events={events}/>
    </div>
  )
}

