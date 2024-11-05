import SearchBar from "./components/SearchBar";
import Movie from "./components/Movie";
import WatchedBar from "./components/WatchedBar";
import Description from "./components/Description";

export default function App() {
  return (
    <div className="w-full h-screen p-8 bg-slate-300">
      <SearchBar />

      <div className="flex flex-row w-full h-screen gap-10 py-8">
        <div className="flex-1 bg-yellow-200">
          <div className="flex flex-col gap-4 p-4">
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 gap-4 bg-orange-300">
          {/* <WatchedBar />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie /> */}

            <Description />
        </div>
      </div>
    </div>
  )
}

