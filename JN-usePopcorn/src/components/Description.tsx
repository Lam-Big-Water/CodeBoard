import { useEffect, useState } from "react";
import Star from "./Star";


import {useFakeMovies} from "../hook/useMovies";

const Description = () => {

type DescriptionType = {
  Title: string;
  Poster: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  imdbRating: string;
  Plot: string;
  Director: string;
}


  const [userRating, setUserRating] = useState(0);
  const [description, setDescription] = useState<DescriptionType | null>(null);
  console.log(description)

  useEffect(() => {
    async function useFakeDescription () {
      try {
      const res = await fetch('http://localhost:9000/description');
      const data = await res.json();
      setDescription(data);

      } catch (err) {
      
      }
    }
    useFakeDescription()
  }, [])



  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="grid grid-cols-3 grid-rows-4">
        <img
          src={description?.Poster}
          className="w-32 col-start-1 col-end-2 row-span-4"
        />
        <h1 className="col-span-2 row-span-1">{description?.Title}</h1>
        <p className="col-span-2 row-span-1">{description?.Year} • {description?.Runtime} min</p>
        <p className="col-span-2 row-span-1">{description?.Genre}</p>
        <p className="col-span-2 row-span-1">{description?.imdbRating}</p>
      </div>

      <Star maxRating={5} size={24} onSetRating={setUserRating} defaultRating={0}/>

      <div className="text-sm">
        <p>
          {description?.Plot}
        </p>
      </div>

      <div className="text-sm">
        <p>{description?.Director}</p>
      </div>
    </div>
  );
};

export default Description;
