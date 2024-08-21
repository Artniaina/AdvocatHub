import React, { useState, useEffect } from "react";
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

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.10.5/Utilisateur/AllAvocat/ListeAvocat");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sortedClients = React.useMemo(() => {
    let sortableClients = [...clients];
    if (sortConfig.key !== null) {
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
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
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
                  "Prenom",
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
              {sortedClients.length > 0 ? (
                sortedClients.map((client) => (
                  <tr key={client.m_nIDAvocat_PP}>
                    <td>{client.m_sNom}</td>
                    <td>{client.m_sPrenom}</td>
                    <td>{client.m_sDénominationEtude}</td>
                    <td>{client.m_sAdresse}</td>
                    <td>{client.m_Liste}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopupCollaborateurs;
