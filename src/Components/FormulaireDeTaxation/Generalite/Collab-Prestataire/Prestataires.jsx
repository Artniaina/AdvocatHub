import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import PopupPrestataires from "./PopUpPresta";
const Prestataires = () => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [etude, setEtude] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <div>
      <div className="titleCard">
        <HiUsers style={{ fontSize: "30px", marginRight: "7px" }} />
        PRESTATAIRE(S) EXTERIEUR(S)
      </div>
      <form onSubmit={handleSubmit} className="avocatForm">
        <div className="clientsForm">
          <label style={{ display: "inline" }} htmlFor="client">
            Prestataire(s) extérieur(s):*{" "}
          </label>
          <select id="client" style={{ width: "23vw" }}>
            <option value=""></option>
          </select>
          <div className="btnAdd" onClick={handleShowPopup}>
            <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="etude">Etude/Société tierce:</label>
          <input
            type="text"
            id="etude"
            value={etude}
            onChange={(e) => setEtude(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="formation">
            Formation et expérience professionnelle
          </label>
          <textarea id="autreInfo" readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="titrePro">Titre Professionnel:</label>
          <input type="text" id="titrePro" readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="autreInfo">Autre informations:</label>
          <textarea id="autreInfo" readOnly />
        </div>
      </form>
      {showPopup && <PopupPrestataires onClose={handleClosePopup} />}
    </div>
  );
};

export default Prestataires;
