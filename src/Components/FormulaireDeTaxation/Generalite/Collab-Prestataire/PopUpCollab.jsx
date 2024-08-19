import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css";

const PopupCollaborateurs = ({ onClose }) => {
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
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [clients, setClients] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const disabledInputStyle = {
    backgroundColor: '#d3d3d3', 
    cursor: 'not-allowed',
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setClients([...clients, {
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
    }]);
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

  return (
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
          COLLABORATEUR(S)
          <button className="close-button" style={{marginTop:"-5px"}} onClick={onClose}>
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
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="prenom">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
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

          <div className="two">
            <div className="formGroup">
              <label htmlFor="telephone">Téléphone:</label>
              <input
                type="text"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button className="addButton" type="submit">Ajouter</button>
        </form>

        <table className="tavleInfo">
          <thead>
            <tr>
              <th>Type</th>
              <th>Dénomination</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Numéro voie</th>
              <th>Rue</th>
              <th>CP</th>
              <th>Localité</th>
              <th>BP</th>
              <th>Localité BP</th>
              <th>Pays</th>
              <th>Téléphone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
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

export default PopupCollaborateurs;
