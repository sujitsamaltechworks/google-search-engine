import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import ReactPlayer from "react-player";
import LoadingComp from "./Loading";

import { useResultContext } from "../contexts/resultContextProvider";

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation(); // images,news,etc.

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/images") {
        getResults(
          `/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=12&autoCorrect=true`
        );
      }
      if (location.pathname === "./news") {
        getResults(
          `/search/NewsSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`
        );
      } else {
        getResults(
          `/Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`
        );
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <LoadingComp />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.value?.map(({ url, title, id }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {url.length > 30 ? url.substring(0, 30) : url}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.value?.map(
            ({url, title, imageWebSearchUrl }) => (
              <a
                className="sm:p-3 p-5"
                href={imageWebSearchUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={url}
                  alt={title}
                  loading="lazy"
                  height="150px"
                  width="150px"
                ></img>
                <p className="sm:w-36 w-36 break-words text-sm mt-2 hover:underline">
                  {title.length > 30
                    ? `${title.substring(0, 30)}...`
                    : title}
                </p>
              </a>
            )
          )}
        </div>
      );

    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.value?.map(({ url, title, id, description }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="flex gap-4">
                  <a href={url}>
                    {description.length > 150
                      ? `${description.substring(0, 150)}...`
                      : description}
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>
      );

    default:
      return "ERROR!";
  }
};

export default Results;
