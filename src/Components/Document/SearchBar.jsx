import React, { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Importing search icon from react-icons
import "../../Styles/Document/SearchBar.css";

const SearchBar = ({ documents, setFilteredDocuments }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const lowercasedSearchTerm = event.target.value.toLowerCase();

    if (Array.isArray(documents)) {
      setFilteredDocuments(
        documents.filter(
          (doc) =>
            doc.name.toLowerCase().includes(lowercasedSearchTerm) ||
            doc.description.toLowerCase().includes(lowercasedSearchTerm)
        )
      );
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="search-icon">
        <FiSearch />
      </div>
    </div>
  );
};

export default SearchBar;
