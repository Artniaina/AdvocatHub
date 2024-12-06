import React, { useState, useEffect } from "react";
import "../../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../../assets/icons8-avocat-24.png";
import { useGeneraliteContext } from "../../../../../Hooks/GeneraliteContext";
import { IoAddCircle } from "react-icons/io5";
import PopupClients from "./PopupClients";

const Clients = () => {
  const { clientData, setClientData } = useGeneraliteContext();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");

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
    setSelectedOption(data[0]?.id || "");
    handleClosePopup();
  };

  const flattenedClients = clientData.flat();
  const selectedClient =
    flattenedClients.find((client) => client.id === selectedOption) || {};

  useEffect(() => {
    if (selectedClient.selectedOption) {
      setSelectedOptions(selectedClient.selectedOption);
    }
  }, [selectedClient]);

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

      <form onSubmit={handleSubmit} className="avocatForm">
        <div className="clientsForm">
          <label style={{ display: "inline" }} htmlFor="client">
            Client(s):*{" "}
          </label>
          <select
            id="client"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            {flattenedClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name + " " + client.prenom}
              </option>
            ))}
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
              checked={selectedOptions === "Particulier"}
              onChange={handleOptionChange}
              disabled
            />
            Particulier
          </label>

          <label>
            <input
              type="radio"
              value="Société/Entité"
              checked={selectedOptions === "Société/Entité"}
              onChange={handleOptionChange}
              disabled
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
            value={selectedClient.denomination || ""}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={selectedClient.name || ""}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={selectedClient.prenom || ""}
            readOnly
          />
        </div>

        <div className="three">
          <div className="formGroup">
            <label htmlFor="numVoie"> Numéro voie:</label>
            <input
              type="text"
              id="numVoie"
              value={selectedClient.numVoie || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="rue"> Rue:</label>
            <input
              className="two"
              type="text"
              id="rue"
              value={selectedClient.rue || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="cp"> CP:</label>
            <input
              type="text"
              id="cp"
              value={selectedClient.cp || ""}
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
              value={selectedClient.localite || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="bp">BP:</label>
            <input
              type="text"
              id="bp"
              value={selectedClient.bp || ""}
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
              value={selectedClient.localitebp || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="pays">Pays:</label>
            <input
              type="text"
              id="pays"
              value={selectedClient.pays || ""}
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
              value={selectedClient.contactInfo || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={selectedClient.email || ""}
              readOnly
            />
          </div>
        </div>
      </form>

      {showPopup && (
        <PopupClients
          onClose={handleClosePopup}
          onSelectClient={handleClientSelection}
        />
      )}
    </div>
  );
};

export default Clients;
