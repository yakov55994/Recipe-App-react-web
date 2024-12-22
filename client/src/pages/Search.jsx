import React, { useState } from "react";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  // Function to send the request to the server
  const handleSearch = async () => {
    if (query.trim() === "") {
      toast.error("הכנס שם מתכון לחיפוש");
      return;
    }

    try {
      const response = await axios.get(`${API_SERVER_URL}/search`, {
        params: { query },  // Sending the query to the server
      });
      setData(response.data); // Update results
      navigate('/SearchResult', { state: { data: response.data } })
      setQuery('')
    } catch (err) {
      toast.error("Error fetching results: " + err.message);
    }
  };

  return (
    <>
          <input
            type="text"
            placeholder="חפש מתכונים..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}  // Update query with user input
            onKeyDown={(e) => {if (e.key === "Enter") handleSearch();}}
            className=" p-2 sm:w-44 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105 placeholder-gray-800"
            />

        <button
          onClick={handleSearch}
          className="font-bold p-2 bg-gray-500 text-white rounded-full transition duration-300 hover:scale-105"
          >
          חיפוש
        </button>
        
          </>
  );
};

export default Search;
