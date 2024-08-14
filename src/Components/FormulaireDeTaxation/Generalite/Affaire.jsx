import React, { useState } from "react";
import "../../../Styles/TaxationForm/CardInfo.css";

const Affaire = () => {
  const [showOptionsAffaire, setShowOptionsAffaire] = useState("non");
  const [showOptionsHonoraires, setShowOptionsHonoraires] = useState("non");


  const handleToggleHonoraires = (value) => {
    setShowOptionsHonoraires(value);
  };
  const handleToggleAffaire = (value) => {
    setShowOptionsAffaire(value);
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

      <div className="formGroupbtn">
  <div className="toggleButtons">
    <p>
      Une convention d’honoraires/lettre d’engagement a-t-elle été signée ?
    </p>
    <div className="box">
      <label
        className={`toggleButtonForm ${showOptionsHonoraires == "non" ? "active" : ""}`}
      >
        <input
          type="radio"
          name="honoraires"
          value="non"
          checked={showOptionsHonoraires == "non"}
          onChange={() => handleToggleHonoraires("non")}
        />
        Non
      </label>
      <label
        className={`toggleButtonForm ${showOptionsHonoraires == "oui" ? "active" : ""}`}
      >
        <input
          type="radio"
          name="honoraires"
          value="oui"
          checked={showOptionsHonoraires == "oui"}
          onChange={() => handleToggleHonoraires("oui")}
        />
        Oui
      </label>
    </div>
  </div>
</div>

      <div className="formGroup">
        <label htmlFor="nomAffaire">
          Si oui, quels en étaient les termes ? (merci de joindre la convention
          d’honoraires au dossier de taxation):{" "}
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
   



      <div className="formGroupbtn">
  <div className="toggleButtons">
    <p>
      Affaire(s) en cours ? (si oui, préciser l'état d'avancement):
    </p>
    <div className="box">
      <label
        className={`toggleButtonForm ${showOptionsAffaire === "non" ? "active" : ""}`}
      >
        <input
          type="radio"
          name="affaire"
          value="non"
          checked={showOptionsAffaire === "non"}
          onChange={() => handleToggleAffaire("non")}
        />
        Non
      </label>
      <label
        className={`toggleButtonForm ${showOptionsAffaire === "oui" ? "active" : ""}`}
      >
        <input
          type="radio"
          name="affaire"
          value="oui"
          checked={showOptionsAffaire === "oui"}
          onChange={() => handleToggleAffaire("oui")}
        />
        Oui
      </label>
    </div>
  </div>
</div>
      <div className="formGroup">
        <label htmlFor="nomAffaire">
          Si oui, quels en étaient les termes ? (merci de joindre la convention
          d’honoraires au dossier de taxation):{" "}
        </label>
        <textarea id="nomAffaire" />
      </div>
    </div>
  );
};

export default Affaire;
