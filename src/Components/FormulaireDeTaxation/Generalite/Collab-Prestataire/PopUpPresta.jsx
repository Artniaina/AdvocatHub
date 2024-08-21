import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css";

const PopupPrestataires = ({ onClose }) => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [etude, setEtude] = useState("");
  const [titrePro, setTitrePro] = useState("");
  const [choix, setChoix] = useState(""); // Added this field
  const [autresInfo, setAutresInfo] = useState("");
  const [formationExp, setFormationExp] = useState("");
  const [Prestataires, setPrestataires] = useState([]);

  const handleSubmitTable = (e) => {
    e.preventDefault();
    setPrestataires([
      ...Prestataires,
      {
        name, 
        prenom,
        email,
        etude,
        titrePro,
        choix, 
        autresInfo,
        formationExp,
      },
    ]);
    setName("");
    setPrenom("");
    setEmail("");
    setEtude("");
    setTitrePro("");
    setChoix(""); 
    setAutresInfo("");
    setFormationExp("");
  };

  return (
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
          PRESTATAIRE(S) EXTERIEUR
          <button
            className="close-button"
            style={{ marginTop: "-5px" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmitTable}>
          <div className="avocatForm2">
            <div className="prestataire">
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

              <div className="formGroup">
                <label htmlFor="etude">Etude/Société tierce*:</label>
                <input
                  type="text"
                  id="etude"
                  value={etude}
                  onChange={(e) => setEtude(e.target.value)}
                  required
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

            <div className="prestataire">
              <div className="formGroup">
                <label htmlFor="titrePro">Titre Professionnel*:</label>
                <input
                  type="text"
                  id="titrePro"
                  value={titrePro}
                  onChange={(e) => setTitrePro(e.target.value)}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="formationExp">
                  Formation et expérience professionnelle:
                </label>
                <input
                  type="text"
                  id="formationExp"
                  value={formationExp}
                  onChange={(e) => setFormationExp(e.target.value)}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="autreInfo">Autre informations:</label>
                <textarea
                  id="autreInfo"
                  value={autresInfo}
                  onChange={(e) => setAutresInfo(e.target.value)}
                />
              </div>
              
              <div className="formGroup">
                <label htmlFor="choix">Choix:</label>
                <input
                  type="text"
                  id="choix"
                  value={choix}
                  onChange={(e) => setChoix(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button className="addButton" type="submit">
            Ajouter
          </button>
        </form>

        <div className="tablediv">
          <table className="tavleInfo">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Etude/Société</th>
                <th>Titre Professionnel</th>
                <th>Formation et expérience</th>
                <th>Autres informations</th>
                <th>Choix</th>
              </tr>
            </thead>
            <tbody>
              {Prestataires.map((Prestataire, index) => (
                <tr key={index}>
                  <td>{Prestataire.name}</td>
                  <td>{Prestataire.prenom}</td>
                  <td>{Prestataire.email}</td>
                  <td>{Prestataire.etude}</td>
                  <td>{Prestataire.titrePro}</td>
                  <td>{Prestataire.formationExp}</td>
                  <td>{Prestataire.autresInfo}</td>
                  <td>{Prestataire.choix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopupPrestataires;
