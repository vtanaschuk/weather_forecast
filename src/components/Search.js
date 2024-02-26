import { useState, useEffect } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className="search">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your trip"
      />
    </div>
  );
};
export default Search;
