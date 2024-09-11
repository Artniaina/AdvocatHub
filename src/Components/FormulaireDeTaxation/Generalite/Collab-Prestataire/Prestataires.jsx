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
  const [choix, setChoix ]= useState("");
  const [formationExp, setFormationExp] = useState("");
  const [autresInfo, setAutresInfo] = useState("");
  const [titrePro, setTitrePro] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  const handleDataFromPopup = (prestataireData) => {
    if (Array.isArray(prestataireData) && prestataireData.length > 0) {
      const firstPrestataire = prestataireData[0]; 
      setName(firstPrestataire.name);
      setPrenom(firstPrestataire.prenom);
      setEtude(firstPrestataire.etude);
      setEmail(firstPrestataire.email);
      setTitrePro(firstPrestataire.titrePro);
      setChoix(firstPrestataire.choix);
      setAutresInfo(firstPrestataire.autresInfo);
      setFormationExp(firstPrestataire.formationExp);

    } else {
      console.error("Invalid data format");
    }
    setShowPopup(false); 
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
          <textarea id="autreInfo" value={formationExp} readOnly />
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
          <input type="text" id="titrePro" value={titrePro} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="autreInfo">Autre informations:</label>
          <textarea id="autreInfo" value={autresInfo} readOnly />
        </div>
      </form>
      {showPopup && <PopupPrestataires
          onClose={handleClosePopup}
          onSubmitData={handleDataFromPopup} 
        />}
    </div>
  );
};

export default Prestataires;
