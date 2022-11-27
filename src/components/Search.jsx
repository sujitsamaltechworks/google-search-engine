import React, { useEffect, useState } from "react";
import Links from "./Links";
import { useDebounce } from "use-debounce";
import { useResultContext } from "../contexts/resultContextProvider";

const Search = () => {
  const [text, setText] = useState("Jeff Bezoz");
  const { setSearchTerm } = useResultContext();
  const [debounceValue] = useDebounce(text, 500);

  useEffect(() => {
    if (debounceValue) setSearchTerm(debounceValue);
  }, [debounceValue]);

  return (
    <div
      className="relative"
      style={{ margin: "auto", marginTop: "2.5rem" }}
    >
      {text && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500"
          onClick={() => setText("")}
        >
          x
        </button>
      )}
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg "
        placeholder="Ask me anything or type any URL"
        onChange={(e) => setText(e.target.value)}
      ></input>
      <Links />
    </div>
  );
};

export default Search;
