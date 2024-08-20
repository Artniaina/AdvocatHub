import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../assets/icons8-avocat-24.png";
import { IoAddCircle } from "react-icons/io5";
import PopupClients from "./PopupClients";

const Clients = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [clientData, setClientData] = useState([[]]);
  const [showPopup, setShowPopup] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClientSelection = (data) => {
    setClientData(data); 
    handleClosePopup(); 
  };

  const handleSelectClient = (clients) => {
    setClientData(clients.flat()); 
    setShowPopup(false);
  };

  const flattenedClients = clientData.flat();
  const firstClient = flattenedClients.length > 0 ? flattenedClients[0] : {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="titleCard">
        <img
          src={Image}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            position: "relative",
            top: "5px",
          }}
        />
        CLIENT(S)
      </div>
      {flattenedClients.length > 0 ? (
        <form onSubmit={handleSubmit} className="avocatForm">
          <div className="clientsForm">
            <label style={{ display: "inline" }} htmlFor="client">
              Client(s):*{" "}
            </label>
            <select id="client">
              <option value="">{firstClient.denomination || 'Select a client'}</option>
            </select>
            <div className="btnAdd" onClick={handleShowPopup}>
              <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
            </div>
          </div>

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
              Denomination Sociale / Organe représentatif:
            </label>
            <input
              type="text"
              id="denomination"
              value={firstClient.denomination || ''}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              value={firstClient.name || ''}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="prenom">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={firstClient.prenom || ''}
              readOnly
            />
          </div>

          <div className="three">
            <div className="formGroup">
              <label htmlFor="numVoie"> Numéro voie:</label>
              <input
                type="text"
                id="numVoie"
                value={firstClient.numVoie || ''}
                readOnly
              />
            </div>

            <div className="formGroup">
              <label htmlFor="rue"> Rue:</label>
              <input
                className="two"
                type="text"
                id="rue"
                value={firstClient.rue || ''}
                readOnly
              />
            </div>

            <div className="formGroup">
              <label htmlFor="cp"> CP:</label>
              <input
                type="text"
                id="cp"
                value={firstClient.cp || ''}
                readOnly
              />
            </div>
          </div>

          <div className="two">
            <div className="formGroup ">
              <label htmlFor="localite">Localité:</label>
              <input
                type="text"
                id="localite"
                value={firstClient.localite || ''}
                readOnly
              />
            </div>

            <div className="formGroup">
              <label htmlFor="bp">BP:</label>
              <input
                type="text"
                id="bp"
                value={firstClient.bp || ''}
                readOnly
              />
            </div>
          </div>

          <div className="two">
            <div className="formGroup ">
              <label htmlFor="localitebp">Localité BP:</label>
              <input
                type="text"
                id="localitebp"
                value={firstClient.localitebp || ''}
                readOnly
              />
            </div>

            <div className="formGroup">
              <label htmlFor="pays">Pays:</label>
              <input
                type="text"
                id="pays"
                value={firstClient.pays || ''}
                readOnly
              />
            </div>
          </div>

          <div className="two">
            <div className="formGroup ">
              <label htmlFor="telephone">Téléphone:</label>
              <input
                type="text"
                id="telephone"
                value={firstClient.telephone || ''}
                readOnly
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={firstClient.email || ''}
                readOnly
              />
            </div>
          </div>
        </form>
      ) : (
        <p>No clients available</p>
      )}

      {showPopup && (
        <PopupClients onClose={handleClosePopup} onSelectClient={handleClientSelection} />
      )}
    </div>
  );
};

export default Clients;
