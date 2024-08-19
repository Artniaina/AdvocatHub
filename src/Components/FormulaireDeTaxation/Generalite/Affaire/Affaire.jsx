import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import ToggleButton from "./ToggleButton";

const Affaire = () => {
  const [showOptions, setShowOptions] = useState({
    affaire: "non",
    honoraires: "non",
    notes: "non",
    conciliation: "non",
    relative: "non",
    conserv: "non",
    mediation: "non",
    mediationChoix: "non",
  });

  const handleToggle = (field, value) => {
    setShowOptions((prevState) => ({ ...prevState, [field]: value }));
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
              className={`toggleButtonForm ${
                showOptions.honoraires === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="honoraires"
                value="non"
                checked={showOptions.honoraires === "non"}
                onChange={() => handleToggle("honoraires", "non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptions.honoraires === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="honoraires"
                value="oui"
                checked={showOptions.honoraires === "oui"}
                onChange={() => handleToggle("honoraires", "oui")}
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
        <textarea className="textarea" id="nomAffaire" />
      </div>

      <div className="formGroup">
        <label htmlFor="nomAffaire">
          En l’absence de convention d’honoraires/lettre d’engagement en bonne
          et due forme, un budget ou un taux horaire a-t'il été annoncé au
          client ?
        </label>
        <textarea className="textarea" id="nomAffaire" />
      </div> 

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Affaire(s) en cours ? (si oui, préciser l'état d'avancement):</p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptions.affaire === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="affaire"
                value="non"
                checked={showOptions.affaire === "non"}
                onChange={() => handleToggle("affaire", "non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptions.affaire === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="affaire"
                value="oui"
                checked={showOptions.affaire === "oui"}
                onChange={() => handleToggle("affaire", "oui")}
              />
              Oui
            </label>
          </div>
        </div>
      </div>
      
      <div className="formGroup">
        <label htmlFor="nomAffaire">
          Etat d’avancement hors recouvrement des honoraires (Juridiction,
          décisions rendues, expertise, plaidoiries…)
        </label>
        <textarea className="textarea" id="nomAffaire" />
      </div>

      <div className="formGroup">
        <label htmlFor="datecontest">
          Date de la contestation des honoraires * :{" "}
        </label>
        <input
          type="date"
          id="datecontest"
          style={{ margin: "0px", width: "19vw" }}
        />
      </div>

      <div className="formGroup">
        <p>Date, référence et montant TTC de la/des note(s) d'honoraires contestée(s) * :</p>
        <div className="btnAdd" style={{ textAlign: "center", marginRight: "900px" }}>
          <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
        </div>
      </div>

      <div className="formGroup">
        <p>Date, référence et montant TTC de la/des note(s) de provision :</p>
        <div className="btnAdd" style={{ textAlign: "center", marginRight: "900px" }}>
          <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
        </div>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>D’autres notes dans le cadre de la même affaire ont-elles été payées ? (Factures...)</p>
          <ToggleButton
            name="notes"
            checkedValue={showOptions.notes}
            onChange={(value) => handleToggle("notes", value)}
          />
        </div>
      </div>

      <div className="formGroup">
        <label style={{ display: "inline" }} htmlFor="client">
          Merci de bien vouloir indiquer les montants TTC :
        </label>
        <div className="divflex" style={{ display: "flex" }}>
          <select id="client">
            <option value=""></option>
          </select>
          <textarea style={{ width: "30vw", height: "12px" }} />
          <div className="btnAdd">
            <IoAddCircle style={{ color: "green", fontSize: "40px", marginTop: "-2px" }} />
          </div>
        </div>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Proposition de conciliation concernant les honoraires :</p>
          <ToggleButton
            name="conciliation"
            checkedValue={showOptions.conciliation}
            onChange={(value) => handleToggle("conciliation", value)}
          />
        </div>
          <textarea className="textarea" name="conciliation" id="conciliation"></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Une procédure relative au recouvrement des honoraires a-t-elle été introduite ? (date, action judiciaire, procédure et stade de la procédure)</p>
          <ToggleButton
            name="relative"
            checkedValue={showOptions.relative}
            onChange={(value) => handleToggle("relative", value)}
          />
        </div>
          <textarea className="textarea" name="relative" id="relative"></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Des mesures conservatoires ont-elles été introduites ? (date, action judiciaire, procédure et stade de la procédure)</p>
          <ToggleButton
            name="conserv"
            checkedValue={showOptions.conserv}
            onChange={(value) => handleToggle("conserv", value)}
          />
        </div>
          <textarea className="textarea" name="conserv" id="conserv"></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Une médiation est-elle en cours ?</p>
          <ToggleButton
            name="mediation"
            checkedValue={showOptions.mediation}
            onChange={(value) => handleToggle("mediation", value)}
          />
        </div>
        <textarea className="textarea" name="mediation" id="mediation"></textarea>

      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p> Si non, est-elle souhaitée ? </p>
          <ToggleButton
            name="mediationChoix"
            checkedValue={showOptions.mediationChoix}
            onChange={(value) => handleToggle("mediationChoix", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Affaire;
