import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css";
import { FaFilter } from "react-icons/fa";
import { PiCaretUpDownFill } from "react-icons/pi";
import { useSelector } from "react-redux"; 
import { useGenerealiteContext } from "../../../../Hooks/GeneraliteContext";

 
const PopupClients = ({ onClose, onSelectClient }) => {
  const { clientData } = useGenerealiteContext(); 
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

  const handlePhoneNumberChange = (event) => {
    const inputNumber = event.target.value.replace(selectedCountry, "").trim();

    setPhoneNumber(inputNumber);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const disabledInputStyle = {
    backgroundColor: "#d3d3d3",
    cursor: "not-allowed",
  };


  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleSubmitTable = (e) => {
    e.preventDefault();
    setClients([
      ...clients,
      {
        id: generateId(),
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
        contactInfo: `${selectedCountry} ${phoneNumber}`,
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
    setSelectedCountry(selectedCountry);
    setPhoneNumber("");
    setEmail("");
  };

  const handleClientSelection = () => {
    const selectedClients = [...clients, ...clientData];
    onSelectClient(selectedClients);
    console.log(clientData);
    console.log(selectedClients);
  };

  const sortedClients = React.useMemo(() => {
    let sortableClients = [...clients, ...clientData]; 
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
  }, [clients, clientData, sortConfig, filters]);

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

        <form onSubmit={handleSubmitTable} className="avocatForm">
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

          <div className="formGroup three" style={{ margin: "0 0 0 -8px" }}>
            <div
              className="formGroup"
              style={{
                width: "100%",
                padding: "8px 0px 8px 10px",
              }}
            > 
              <label htmlFor="countrySelect">Téléphone :</label>
              <select
                id="countrySelect"
                name="pays"
                value={selectedCountry}
                onChange={handleCountryCodeChange}
              >
                {countryCodes.map((country, index) => (
                  <option key={`${country.code}-${index}`} value={country.code}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
            </div>

            <div
              className="formGroup"
              style={{
                width: "100%",
                padding: "6px 10px 10px 1px",
                marginTop: "28px",
              }}
            >
              <label htmlFor="phoneNumber"></label>
              <input
                id="phoneNumber"
                type="text"
                value={`${selectedCountry} ${phoneNumber}`}
                onChange={handlePhoneNumberChange}
                placeholder="Numéro de téléphone"
                className="modifInput"
                onKeyDown={(e) => {
                  if (
                    !/^[0-9]$/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== " "
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div
              className="formGroup"
              style={{
                padding: "6px 10px 10px 1px",
                marginTop: "10px",
              }}
            >
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
        <div className="table-container">
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
            {sortedClients.map((client) => (
              <tr key={client.id}>
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
                  <td>{client.contactInfo}</td>
                  <td>{client.email}</td>
              </tr>
            ))}

            </tbody>
          </table>
          <button onClick={handleClientSelection}>ENREGISTRER</button>
        </div>
      </div>
    </div>
    
  ); 
};

export default PopupClients;
