import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css";
import { FaFilter } from "react-icons/fa";
import { PiCaretUpDownFill } from "react-icons/pi";


const PopupCollaborateurs = ({ onClose }) => {
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterActive, setFilterActive] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortedClients = React.useMemo(() => {
    let sortableClients = [...clients];
    if (sortConfig !== null) {
      sortableClients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableClients.filter((client) => {
      return Object.keys(filters).every((key) => {
        return client[key]?.toLowerCase().includes(filters[key].toLowerCase());
      });
    });
  }, [clients, sortConfig, filters]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleFilterClick = (key) => {
    setFilterActive(key);
  };

  return (
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
        LISTE DES AVOCATS
          <button className="close-button" style={{marginTop:"-5px"}} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="table-container">
          <table className="tavleInfo">
            <thead>
              <tr>
                {[
                 
                  "Nom",
                  "prenom",
                  "Etude",
                  "Adresse",
                  "Sélection",
                ].map((key) => (
                  <th key={key} onClick={() => requestSort(key)}>
                    <span className="sort-icon">
                      <PiCaretUpDownFill />
                    </span>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span
                      className="filter-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterClick(key);
                      }}
                    >
                      <FaFilter />
                    </span>
                    {filterActive === key && (
                      <input
                        type="text"
                        placeholder={`Filter by ${key}`}
                        value={filters[key] || ""}
                        onChange={(e) => handleFilterChange(e, key)}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5"></td>
              </tr>
              <tr>
                <td colSpan="5"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopupCollaborateurs;
