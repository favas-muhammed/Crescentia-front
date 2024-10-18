import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
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

export default SearchResults;
