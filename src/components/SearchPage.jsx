import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    // Implement the search functionality here
    const results = await fetch(
      `${import.meta.env.VITE_API_URL}/api/search?q=${query}`
    ).then((res) => res.json());
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Search</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchPage;
