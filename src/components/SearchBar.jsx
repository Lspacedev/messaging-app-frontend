import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
function SearchBar({ search }) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    if (term === "") {
      search("");
    }
  }, [term]);
  return (
    <div className="SearchBar">
      <input type="search" onChange={(e) => setTerm(e.target.value)} />
      <button onClick={() => search(term)}>
        <IoIosSearch />
      </button>
    </div>
  );
}

export default SearchBar;
