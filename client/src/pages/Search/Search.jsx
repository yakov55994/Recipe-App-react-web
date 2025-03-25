import React, { useState } from "react";
import { API_SERVER_URL } from "../../api/api.js";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim() === "") {
      toast.error("הכנס שם מתכון לחיפוש");
      return;
    }

    try {
      const response = await axios.get(`${API_SERVER_URL}/search`, {
        params: { query },
      });
      navigate("/SearchResult", { state: { data: response.data } });
      setQuery("");
    } catch (err) {
      toast.error("Error fetching results: " + err.message);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mt-5 ">
          <input
            type="text"
            placeholder="חפש מתכון..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-2/4 sm:w-2/3 md:w-1/2 lg:w-1/3 text-black font-bold p-3 pr-14 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 placeholder-gray-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="absolute right-1 top-10 mr-2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition duration-200"
        >
          {/* <IoSearch size={24} /> */}
        </button>
      </div>
    </div>
  );
};

export default Search;
