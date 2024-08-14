import React, { useState } from "react";
import "../../../Styles/TaxationForm/CardInfo.css";

const Affaire = () => {
  const [showOptions, setShowOptions] = useState(false);
  const handleToggle = (value) => {
    setShowOptions(value === "oui");
  };

  return (
    <div>
      <div className="formGroup">
        <label htmlFor="formation">Domaine(s) juridique(s) * : </label>
        <input type="text" id="formation" />
      </div>

      <div className="formGroup">
        <label htmlFor="nomAffaire">Nom de l'affaire * : </label>
        <textarea id="nomAffaire" />
      </div>

      <div
        className="formGroup"
        style={{
          display: "flex",
          margin: "15px 100px 15px 15px",
        }}
      >
        <label htmlFor="dateDebut">Date de début du mandat * :</label>
        <input type="date" id="date" />
      </div>

      <div
        className="formGroup"
        style={{
          display: "flex",
          margin: "15px 110px 15px 15px",
        }}
      >
        <label htmlFor="dateFin">Date de fin du mandat * :</label>
        <input type="date" id="date1" />
      </div>

      <div className="formGroup">
        <div className="toggleButtons">
          <p>
            Une convention d’honoraires/lettre d’engagement a-t-elle été signée
            ?
          </p>
          <button
            type="button"
            className={`toggleButton ${showOptions ? "active" : ""}`}
            onClick={() => handleToggle("oui")}
          >
            Oui
          </button>
          <button
            type="button"
            className={`toggleButton ${!showOptions ? "active" : ""}`}
            onClick={() => handleToggle("non")}
          >
            Non
          </button>
        </div>
        </div>

        <div className="formGroup">
          <label htmlFor="nomAffaire">
            Si oui, quels en étaient les termes ? (merci de joindre la
            convention d’honoraires au dossier de taxation):{" "}
          </label>
          <textarea id="nomAffaire" />
        </div>

        <div className="formGroup">
          <label htmlFor="nomAffaire">
            En l’absence de convention d’honoraires/lettre d’engagement en bonne
            et due forme, un budget ou un taux horaire a-t'il été annoncé au
            client ?
          </label>
          <textarea id="nomAffaire" />
        </div>


        <div className="formGroup">
        <div className="toggleButtons">
          <p>
            Une convention d’honoraires/lettre d’engagement a-t-elle été signée
            ?
          </p>
          <button
            type="button"
            className={`toggleButton ${showOptions ? "active" : ""}`}
            onClick={() => handleToggle("oui")}
          >
            Oui
          </button>
          <button
            type="button"
            className={`toggleButton ${!showOptions ? "active" : ""}`}
            onClick={() => handleToggle("non")}
          >
            Non
          </button>
        </div>
        </div>
       
        <div className="formGroup">
          <label htmlFor="nomAffaire">
            Si oui, quels en étaient les termes ? (merci de joindre la
            convention d’honoraires au dossier de taxation):{" "}
          </label>
          <textarea id="nomAffaire" />
        </div>
      </div>
  );
};

export default Affaire;
