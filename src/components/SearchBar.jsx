// SearchBar.jsx
import React, { useState } from "react";
import { fetchWithToken } from "../contexts/SessionContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await fetchWithToken(`/api/search?q=${query}`);
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result._id}>
              {result.type === "user" && (
                <Link to={`/profile/${result._id}`}>{result.username}</Link>
              )}
              {result.type === "post" && (
                <Link to={`/posts/${result._id}`}>
                  {result.content.substring(0, 50)}...
                </Link>
              )}
              {result.type === "group" && (
                <Link to={`/groups/${result._id}`}>{result.name}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
