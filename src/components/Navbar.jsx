import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Nabvar = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dar:border-gray-700 border-gray-200">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/home">
          <p className="text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded dark:bg-gray-500 dark:text-gray-100">
            ASK ME❔
          </p>
        </Link>
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xl dark:bg-gray-50 dark:text-gray-900 br-white border rounded-full px-2 hover:shadow-lg"
        >
          {darkTheme ? "Light 🌞" : "Dark 🌚"}
        </button>
      </div>
      <Search />
    </div>
  );
};

export default Nabvar;
