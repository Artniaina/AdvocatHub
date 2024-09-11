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
  const [choix, setChoix] = useState("");
  const [formationExp, setFormationExp] = useState("");
  const [autresInfo, setAutresInfo] = useState("");
  const [titrePro, setTitrePro] = useState("");
  const [prestataires, setPrestataires] = useState([]);
  const [selectedPrestataire, setSelectedPrestataire] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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
    if (prestataireData.length > 0) {
      setPrestataires(prestataireData);

      // Automatically set the first prestataire in the list
      const firstPrestataire = prestataireData[0];
      setSelectedPrestataire(0);
      setName(firstPrestataire.name);
      setPrenom(firstPrestataire.prenom);
      setEtude(firstPrestataire.etude);
      setEmail(firstPrestataire.email);
      setTitrePro(firstPrestataire.titrePro);
      setChoix(firstPrestataire.choix);
      setAutresInfo(firstPrestataire.autresInfo);
      setFormationExp(firstPrestataire.formationExp);
    }
    setShowPopup(false);
  };

  const handlePrestataireChange = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex !== "") {
      const selected = prestataires[selectedIndex];
      setName(selected.name);
      setPrenom(selected.prenom);
      setEtude(selected.etude);
      setEmail(selected.email);
      setTitrePro(selected.titrePro);
      setChoix(selected.choix);
      setAutresInfo(selected.autresInfo);
      setFormationExp(selected.formationExp);
      setSelectedPrestataire(selectedIndex);
    }
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
          <select
            id="client"
            style={{ width: "23vw" }}
            onChange={handlePrestataireChange}
            value={selectedPrestataire || ""}
          >
            {prestataires.length > 0 && selectedPrestataire === "" ? (
              <option value="">
                {prestataires[0].name} {prestataires[0].prenom}
              </option>
            ) : (
              prestataires.map((prestataire) => (
                <option key={prestataire.id} value={prestataire.id}>
                  {prestataire.name} {prestataire.prenom}
                </option>
              ))
            )}
          </select>

          <div className="btnAdd" onClick={handleShowPopup}>
            <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" value={name} readOnly />
        </div>
        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" value={prenom} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="etude">Etude/Société tierce:</label>
          <input type="text" id="etude" value={etude} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="formation">
            Formation et expérience professionnelle:
          </label>
          <textarea id="formation" value={formationExp} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="titrePro">Titre Professionnel:</label>
          <input type="text" id="titrePro" value={titrePro} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="autreInfo">Autres informations:</label>
          <textarea id="autreInfo" value={autresInfo} readOnly />
        </div>
      </form>

      {showPopup && (
        <PopupPrestataires
          onClose={handleClosePopup}
          onSubmitData={handleDataFromPopup}
        />
      )}
    </div>
  );
};

export default Prestataires;
