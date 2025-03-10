import React, { useState, useEffect, useMemo } from "react";
import "../../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../../Styles/TaxationForm/Popup.css";
import { FaFilter } from "react-icons/fa";
import { PiCaretUpDownFill } from "react-icons/pi";
import { useAuth } from "../../../../../Hooks/AuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

const PopupCollaborateurs = ({
  onClose,
  selectedCollaborator,
  onSelectCollaborators,
}) => {
  const [filters, setFilters] = useState({});
  const [avocat, setAvocat] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [filterActive, setFilterActive] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/Utilisateur/AllAvocat/ListeAvocat`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const filteredData = data.filter(data => data.m_emailbarreau !== user?.email);
        setAvocat(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [user]);
  

  useEffect(() => {
    setSelectedCollaborators(selectedCollaborator);
  }, [selectedCollaborator]);

  const keyMapping = {
    nom: "m_sNom",
    prenom: "m_sPrenom",
    etude: "m_sDénominationEtude",
    adresse: "m_sadressecomplet",
    dateAssermentation: "m_dDateAssermentation",
    telephone: "m_sTelephone",
    email: "m_sEmail",
  };

  const sortedAvocat = useMemo(() => {
    let sortableAvocat = [...avocat];

    if (sortConfig.key) {
      sortableAvocat.sort((a, b) => {
        const aValue = a[keyMapping[sortConfig.key]] || "";
        const bValue = b[keyMapping[sortConfig.key]] || "";
        const aLower = aValue.toLowerCase();
        const bLower = bValue.toLowerCase();

        if (aLower < bLower)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aLower > bLower)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return sortableAvocat.filter((client) =>
      Object.keys(filters).every((key) =>
        client[keyMapping[key]]
          ? client[keyMapping[key]]
              .toLowerCase()
              .includes(filters[key].toLowerCase())
          : false
      )
    );
  }, [avocat, sortConfig, filters]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFilterClick = (key) => {
    setFilterActive(key === filterActive ? null : key);
  };

  const handleCheckboxChange = (code) => {
    setSelectedCollaborators((prevSelected) => {
      if (prevSelected.includes(code)) {
        return prevSelected.filter((id) => id !== code);
      } else {
        return [...prevSelected, code];
      }
    });
  };

  const selectedAvocats = useMemo(() => {
    return avocat.filter((item) =>
      selectedCollaborators.includes(item.m_nIDAvocat_PP)
    );
  }, [avocat, selectedCollaborators]);

  const handleSubmit = () => {
    const necessaryData = selectedAvocats.map((avocat) => ({
      id: avocat.m_nIDAvocat_PP,
      nom: avocat.m_sNom,
      prenom: avocat.m_sPrenom,
      etude: avocat.m_sDénominationEtude,
      adresse: avocat.m_sadressecomplet,
      dateAssermentation: avocat.m_dDateAssermentation,
      telephone: avocat.m_sTelephone,
      email: avocat.m_emailbarreau,
      IDAvocat: avocat.m_nIDAvocat_PP,
    }));
    onSelectCollaborators(selectedCollaborators, necessaryData);

    onClose();
  };

  return (
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
          LISTE DES AVOCATS
          <button
            className="close-button"
            style={{ marginTop: "-5px" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="table-container">
          <table className="tavleInfo">
            <thead>
              <tr>
                {["Nom", "Prenom", "Etude", "Adresse", "Sélection"].map(
                  (key) => (
                    <th key={key}>
                      <span
                        className="sort-icon"
                        onClick={() => requestSort(key)}
                      >
                        <PiCaretUpDownFill />
                      </span>
                      {key}
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {sortedAvocat.length > 0 ? (
                sortedAvocat.map((avocat) => (
                  <tr key={avocat.m_nIDAvocat_PP}>
                    <td>{avocat.m_sNom}</td>
                    <td>{avocat.m_sPrenom}</td>
                    <td>{avocat.m_sDénominationEtude}</td>
                    <td>{avocat.m_sadressecomplet}</td>
                    <td>
                      <input
                        type="checkbox"
                        value={avocat.m_nIDAvocat_PP}
                        checked={selectedCollaborators.includes(
                          avocat.m_nIDAvocat_PP
                        )}
                        onChange={() =>
                          handleCheckboxChange(avocat.m_nIDAvocat_PP)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Aucune donnée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="footerListe">
          <div>
            <p>
              Nombre d'avocats: <br />
              {avocat.length}
            </p>
          </div>
          <div>
            <button onClick={handleSubmit}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCollaborateurs;
