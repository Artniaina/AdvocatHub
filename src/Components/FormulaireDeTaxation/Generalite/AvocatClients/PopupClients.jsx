import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css";
import { FaFilter } from "react-icons/fa";
import { PiCaretUpDownFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const PopupClients = ({ onClose }) => {
  const countryCodes = useSelector((state) => state.countryCodes.countryCodes);

  const [selectedOption, setSelectedOption] = useState("Particulier");
  const [denomination, setDenomination] = useState("");
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numVoie, setNumVoie] = useState("");
  const [rue, setRue] = useState("");
  const [cp, setCp] = useState("");
  const [localite, setLocalite] = useState("");
  const [bp, setBp] = useState("");
  const [localitebp, setLocalitebp] = useState("");
  const [pays, setPays] = useState("");
  const [email, setEmail] = useState("");
  const [clients, setClients] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filters, setFilters] = useState({});
  const [filterActive, setFilterActive] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("+261");
  const handleCountryCodeChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const formatPhoneNumber = (number) => {
    number = number.replace(/\D/g, "");

    const formattedNumber = number.replace(
      /^(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})$/,
      "+$1 $2 $3 $4 $5"
    );

    return formattedNumber;
  };

  const handlePhoneNumberChange = (event) => {
    const inputNumber = event.target.value.replace(selectedCountry, "").trim();
    const formattedNumber = formatPhoneNumber(inputNumber);
    setPhoneNumber(formattedNumber);
  };

  const [telephone, setTelephone] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const disabledInputStyle = {
    backgroundColor: "#d3d3d3",
    cursor: "not-allowed",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setClients([
      ...clients,
      {
        selectedOption,
        denomination,
        name,
        prenom,
        numVoie,
        rue,
        cp,
        localite,
        bp,
        localitebp,
        pays,
        telephone,
        email,
      },
    ]);
    setSelectedOption("Particulier");
    setDenomination("");
    setName("");
    setPrenom("");
    setNumVoie("");
    setRue("");
    setCp("");
    setLocalite("");
    setBp("");
    setLocalitebp("");
    setPays("");
    setTelephone("");
    setEmail("");
  };
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
          CLIENT(S)
          <button
            className="close-button"
            style={{ marginTop: "-5px" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="avocatForm">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Particulier"
                checked={selectedOption === "Particulier"}
                onChange={handleOptionChange}
              />
              Particulier
            </label>

            <label>
              <input
                type="radio"
                value="Société/Entité"
                checked={selectedOption === "Société/Entité"}
                onChange={handleOptionChange}
              />
              Société/Entité
            </label>
          </div>

          <div className="formGroup">
            <label htmlFor="denomination">
              Denomination Sociale / Organe reprêsentatif:
            </label>
            <input
              type="text"
              id="denomination"
              value={denomination}
              onChange={(e) => setDenomination(e.target.value)}
              style={selectedOption === "Particulier" ? disabledInputStyle : {}}
              disabled={selectedOption === "Particulier"}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="name">Nom*:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="prenom">Prénom*:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>

          <div className="three">
            <div className="formGroup">
              <label htmlFor="numVoie">Numéro voie:</label>
              <input
                type="text"
                id="numVoie"
                value={numVoie}
                onChange={(e) => setNumVoie(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="rue">Rue:</label>
              <input
                className="two"
                type="text"
                id="rue"
                value={rue}
                onChange={(e) => setRue(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="cp">CP:</label>
              <input
                type="text"
                id="cp"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
              />
            </div>
          </div>

          <div className="two">
            <div className="formGroup">
              <label htmlFor="localite">Localité:</label>
              <input
                type="text"
                id="localite"
                value={localite}
                onChange={(e) => setLocalite(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="bp">BP:</label>
              <input
                type="text"
                id="bp"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
              />
            </div>
          </div>

          <div className="two">
            <div className="formGroup">
              <label htmlFor="localitebp">Localité BP:</label>
              <input
                type="text"
                id="localitebp"
                value={localitebp}
                onChange={(e) => setLocalitebp(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="pays">Pays:</label>
              <input
                type="text"
                id="pays"
                value={pays}
                onChange={(e) => setPays(e.target.value)}
              />
            </div>
          </div>

          <div className="formGroup clientLink" style={{ display: "flex" }}>
            <div className="p">
              <div>
                <label htmlFor="countrySelect">Téléphone :</label>
                <select
                  id="countrySelect"
                  name="pays"
                  value={selectedCountry}
                  onChange={handleCountryCodeChange}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber"></label>
              <input
                id="phoneNumber"
                type="text"
                value={`${selectedCountry} ${formatPhoneNumber(phoneNumber)}`}
                onChange={handlePhoneNumberChange}
                placeholder="Numéro de téléphone"
                className="modifInput"
              />
            </div>
            <div className="formGroup">
            <label htmlFor="email">Email*:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          </div>

          <button className="addButton" type="submit">
            Ajouter
          </button>
        </form>
        <table className="tavleInfo">
          <thead>
            <tr>
              {[
                "selectedOption",
                "denomination",
                "name",
                "prenom",
                "numVoie",
                "rue",
                "cp",
                "localite",
                "bp",
                "localitebp",
                "pays",
                "telephone",
                "email",
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
            {sortedClients.map((client, index) => (
              <tr key={index}>
                <td>{client.selectedOption}</td>
                <td>{client.denomination}</td>
                <td>{client.name}</td>
                <td>{client.prenom}</td>
                <td>{client.numVoie}</td>
                <td>{client.rue}</td>
                <td>{client.cp}</td>
                <td>{client.localite}</td>
                <td>{client.bp}</td>
                <td>{client.localitebp}</td>
                <td>{client.pays}</td>
                <td>{client.telephone}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopupClients;
