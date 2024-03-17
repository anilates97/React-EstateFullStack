import { HiLocationMarker } from "react-icons/hi";

interface SearchBarProps {
  filter?: string;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ filter, setFilter }: SearchBarProps) {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        placeholder="Search Property"
        type="text"
        value={filter}
        onChange={(e: any) => setFilter!(e.target.value)}
      />
      <button className="button">Search</button>
    </div>
  );
}

export default SearchBar;
