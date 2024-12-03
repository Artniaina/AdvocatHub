import React, { useState } from "react";

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
    <div className="filterSection">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
