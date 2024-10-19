
import WatchedMovie from "./WatchedMovie";
import { NewWatchedMovieType } from "./App";

type WatchedMoviesList = {
    watched: NewWatchedMovieType[];
    onDeleteWatched: (id: number) => void;
}

export default function WatchedMoviesList ({watched, onDeleteWatched}: WatchedMoviesList) {
    return (
        <ul className="list">
            {watched.map((movie: NewWatchedMovieType) => (
                <WatchedMovie 
                movie={movie}
                key={movie.imdbID}
                onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
};