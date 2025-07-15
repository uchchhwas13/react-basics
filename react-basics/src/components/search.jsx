import React from "react";  

const Search = ({searchterm, setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="Search Icon" />
            <input
                type="text"
                placeholder="Search through thousands of movie"
                value={searchterm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    </div>
  );
}   

export default Search;