import { ChangeEvent, useEffect, useRef, useState } from "react";
import _ from "lodash";
import User from "../components/user";
import { UserInfo } from "../types";

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState([]);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutstide = (e: MouseEvent) => {
      console.log("click");
      // @ts-ignore
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("Click");
        setVisible(false);
      }

      document.addEventListener("click", handleClickOutstide);

      return () => document.removeEventListener("click", handleClickOutstide);
    };
  }, []);

  async function fetchSearchResults(searchText: string) {
    const res = await fetch("/api/search?q=" + searchText);

    if (res.ok) {
      const json = await res.json();
      setVisible(true);
      setSearchResult(json.data);
    }
  }

  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedFetchSearchResults(e.target.value);
  }

  return (
    <div
      className="flex flex-row max-w-md w-full justify-end relative"
      ref={ref}
    >
      <input
        className="p-2 rounded-lg bg-gray-700 my-2 max-w-xs"
        type="text"
        onChange={handleChange}
      />
      {visible && searchResult.length > 0 && (
        <ul className="flex flex-col bg-gray-700 p-2 rounded-lg absolute top-14 w-full max-w-sm">
          {searchResult.map((result: UserInfo) => (
            <li
              key={result.id}
              className="my-3"
              onClick={() => setVisible(false)}
            >
              <User user={result} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
