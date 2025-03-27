import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './SearchBar.css';

const SearchBar = ()=>{
    return(
        <div className="searchBar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input type="text" placeholder="search room..." />
        </div>
    )
}

export default SearchBar
