import { MovieType } from "../reducer/FetchMovies"

type MovieProps = {
  item: MovieType;
  setSelected: (movie: MovieType) => void;
}
const Movie = ({item, setSelected}: MovieProps) => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 bg-pink-400" onClick={() => setSelected(item)}>
        <img className="w-16 col-start-1 col-end-2 row-start-1 row-end-3" src={item.Poster} alt="Photo" />
        <h3 className="col-start-2 col-end-4 row-span-1">{item.Title}</h3>
        <p className="col-start-2 col-end-4 row-span-2">🗓 {item.Year}</p>
    </div>
  )
}

export default Movie