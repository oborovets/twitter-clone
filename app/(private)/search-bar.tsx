import _ from "lodash";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState([]);

  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

  async function fetchSearchResults(searchText: string) {
    const res = await fetch("/api/search?q=" + searchText);

    if (res.ok) {
      const json = await res.json();
      setSearchResult(json.data);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedFetchSearchResults(e.target.value);
  }

  return (
    <div>
      <input
        className="p-2 rounded-lg bg-gray-700 my-2"
        type="text"
        onChange={handleChange}
      />
    </div>
  );
}
