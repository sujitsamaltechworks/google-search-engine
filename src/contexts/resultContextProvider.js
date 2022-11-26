import React, { Children, createContext, useContext, useState } from "react";

const ResultContext = createContext();

const baseurl =
  "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Linkedin");

  const getResults = async (type) => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9580848011msh3d6d5bd1ee0eaebp12af80jsn21a7b8674a5a",
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    };

    const response = await fetch(`${baseurl}${type}`, options);

    const data = await response.json();

    console.log(data);

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
