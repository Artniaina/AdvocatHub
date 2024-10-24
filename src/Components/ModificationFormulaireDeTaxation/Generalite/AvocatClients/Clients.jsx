import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../assets/icons8-avocat-24.png";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";
import { IoAddCircle } from "react-icons/io5";
import PopupClients from "./PopupClients";

const Clients = ({ clientsDataToModify }) => {
  const [clientData, setClientData] = useState(clientsDataToModify || []);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");
  const [defaultData, setDefaultData] = useState({ name: "" });

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
    setSelectedOption(data[0]?.id || ""); // Set the selected option based on the new data
    handleClosePopup();
  };

  const selectedClient =
    clientData.find((client) => client.id === selectedOption) || {};

  useEffect(() => {
    // Set default data based on the selected client or first client if none is selected
    if (Object.keys(selectedClient).length > 0) {
      setDefaultData({ name: selectedClient.name });
    } else if (clientData.length > 0) {
      setDefaultData({ name: clientData[0].name }); // Display first client's name
      setSelectedOption(clientData[0].id); // Optionally set the selected option to the first client
    } else {
      setDefaultData({ name: "" }); // Handle case with no clients
    }
  }, [selectedClient, clientData]); // Add clientData as a dependency

  console.log(clientData);
  console.log(selectedClient);
  console.log(Object.keys(selectedClient).length > 0);
  console.log("Default Client :", defaultData.name);

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
            {clientData.map((client) => (
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
            value={defaultData.name}
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
            <label htmlFor="numVoie">Numéro voie:</label>
            <input
              type="text"
              id="numVoie"
              value={selectedClient.numVoie || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="rue">Rue:</label>
            <input
              className="two"
              type="text"
              id="rue"
              value={selectedClient.rue || ""}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="cp">CP:</label>
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
          defaultClient={clientsDataToModify}
        />
      )}
    </div>
  );
};

export default Clients;
