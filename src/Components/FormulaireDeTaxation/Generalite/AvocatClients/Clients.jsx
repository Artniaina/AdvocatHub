import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../assets/icons8-avocat-24.png";
import { IoAddCircle } from "react-icons/io5";
import PopupClients from "./PopupClients";

const Clients = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [clientData, setClientsData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e) => {
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSelectClient = (clients) => {
    setClientsData(clients);
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
          <select id="client">
            <option value=""></option>
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
            value={clientData.denomination}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" value={clientData.name} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" value={clientData.prenom} readOnly />
        </div>

        <div className="three">
          <div className="formGroup">
            <label htmlFor="numVoie"> Numéro voie:</label>
            <input
              type="text"
              id="numVoie"
              value={clientData.numVoie}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="rue"> Rue:</label>
            <input
              className="two"
              type="text"
              id="rue"
              value={clientData.rue}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="cp"> CP:</label>
            <input type="text" id="cp" value={clientData.cp} readOnly />
          </div>
        </div>

        <div className="two">
          <div className="formGroup ">
            <label htmlFor="localite">Localité:</label>
            <input
              type="text"
              id="localite"
              value={clientData.localite}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="bp">BP:</label>
            <input type="text" id="bp" value={clientData.bp} readOnly />
          </div>
        </div>

        <div className="two">
          <div className="formGroup ">
            <label htmlFor="localitebp">Localité BP:</label>
            <input
              type="text"
              id="localitebp"
              value={clientData.localitebp}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="pays">Pays:</label>
            <input type="text" id="pays" value={clientData.pays} readOnly />
          </div>
        </div>

        <div className="two">
          <div className="formGroup ">
            <label htmlFor="telephone">Téléphone:</label>
            <input
              type="text"
              id="telephone"
              value={clientData.telephone}
              readOnly
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={clientData.email} readOnly />
          </div>
        </div>
      </form>
      {showPopup && (
        <PopupClients onClose={handleClosePopup}  onSelectClient={handleSelectClient}  />
      )}
    </div>
  );
};

export default Clients;
