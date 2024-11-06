import { ChangeEvent } from "react";

type SearchBarProps = {
  search: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({search, onSearch}: SearchBarProps) => {

  console.log(search)
  return (
    <div className="flex flex-row gap-8 justify-start items-center p-4 rounded-sm bg-green-300">
        <img className="w-20" src="vite.svg" alt="LOGO" />
        <h2>UsePopcorn</h2>
        <input className="w-24" type="text" placeholder="Search..." value={search} onChange={onSearch} />
        <p className="ml-auto">Found 10 results</p>
    </div>
  )
}

export default SearchBar