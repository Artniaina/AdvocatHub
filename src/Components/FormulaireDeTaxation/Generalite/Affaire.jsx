import React, { useState } from "react";
import "../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";

const Affaire = () => {
  const [showOptionsAffaire, setShowOptionsAffaire] = useState("non");
  const [showOptionsHonoraires, setShowOptionsHonoraires] = useState("non");
  const [showOptionsNotes, setShowOptionsNotes] = useState("non");
  const [showOptionsConciliation, setShowOptionsConciliation] = useState("non");
  const [showOptionsRelative, setShowOptionsRelative] = useState("non");
  const [showOptionsConserv, setShowOptionsConserv] = useState("non");
  const [showOptionsMediation, setShowOptionsMediation] = useState("non");
  const [showOptionsMediationChoix, setShowOptionsMediationChoix] = useState("non");

  const handleToggleHonoraires = (value) => {
    setShowOptionsHonoraires(value);
  };

  const handleToggleAffaire = (value) => {
    setShowOptionsAffaire(value);
  };

  const handleToggleNotes = (value) => {
    setShowOptionsNotes(value);
  };

  const handleToggleConciliation = (value) => {
    setShowOptionsConciliation(value);
  };

  const handleToggleRelative = (value) => {
    setShowOptionsRelative(value);
  };

  const handleToggleConserv = (value) => {
    setShowOptionsConserv(value);
  };

  const handleToggleMediation = (value) => {
    setShowOptionsMediation(value);
  };
  const handleToggleMediationChoix = (value) => {
    setShowOptionsMediationChoix(value);
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
            Une convention d’honoraires/lettre d’engagement a-t-elle été signée
            ?
          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsHonoraires == "non" ? "active" : ""
              }`}
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
              className={`toggleButtonForm ${
                showOptionsHonoraires == "oui" ? "active" : ""
              }`}
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
                showOptionsAffaire === "non" ? "active" : ""
              }`}
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
              className={`toggleButtonForm ${
                showOptionsAffaire === "oui" ? "active" : ""
              }`}
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
      <div className="formGroup  ">
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
        <p>
          Date, référence et montant TTC de la/des note(s) d'honoraires
          contestée(s) * :
        </p>
        <div
          className="btnAdd"
          style={{ textAlign: "center", marginRight: "900px" }}
        >
          <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
        </div>
      </div>
      <div className="formGroup">
        <p>Date, référence et montant TTC de la/des note(s) de provision :</p>
        <div
          className="btnAdd"
          style={{ textAlign: "center", marginRight: "900px" }}
        >
          <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
        </div>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            D’autres notes dans le cadre de la même affaire ont-elles été payées
            ?(Factures...)
          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsNotes === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="affaire"
                value="non"
                checked={showOptionsAffaire === "non"}
                onChange={() => handleToggleNotes("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsNotes === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="affaire"
                value="oui"
                checked={showOptionsNotes === "oui"}
                onChange={() => handleToggleNotes("oui")}
              />
              Oui
            </label>
          </div>
        </div>
      </div>

      <div className="formGroup">
        <label style={{ display: "inline" }} htmlFor="client">
          Merci de bien vouloir indiquer les montants TTC :
        </label>
        <div className="divflex" style={{display: "flex"}}>
          <select id="client" >
            <option value=""></option>
          </select>
          <textarea style={{width:"30vw", height:"12px"}} name="" id=""></textarea>
          <div className="btnAdd">
            <IoAddCircle style={{ color: "green", fontSize: "40px", marginTop:"-2px" }} />
          </div>
        </div>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
          Proposition de conciliation concernant les honoraires :
          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsConciliation === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="non"
                checked={showOptionsConciliation === "non"}
                onChange={() => handleToggleConciliation("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsConciliation === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="oui"
                checked={showOptionsConciliation === "oui"}
                onChange={() => handleToggleConciliation("oui")}
              />
              Oui
            </label>
          </div>
        </div>
        <textarea className="textarea" name="conciliation" id="conciliation"></textarea>
      </div>

                  

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
          Proposition de conciliation concernant les honoraires :
          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsConciliation === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="non"
                checked={showOptionsConciliation === "non"}
                onChange={() => handleToggleConciliation("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsConciliation === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="oui"
                checked={showOptionsConciliation === "oui"}
                onChange={() => handleToggleConciliation("oui")}
              />
              Oui
            </label>
          </div>
        </div>
        <textarea className="textarea" name="conciliation" id="conciliation"></textarea>
      </div>



      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
          Une procédure relative au recouvrement des honoraires a-t-elle été introduite ?(date, action judiciaire, procédure et stade de la procédure)          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsRelative === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="non"
                checked={showOptionsRelative === "non"}
                onChange={() => handleToggleRelative("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsRelative === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="oui"
                checked={showOptionsRelative === "oui"}
                onChange={() => handleToggleRelative("oui")}
              />
              Oui
            </label>
          </div>
        </div>
        <textarea className="textarea" name="relative" id="relative"></textarea>
      </div>





      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
Des mesures conservatoires ont-elles été introduites ?(date, action judiciaire, procédure et stade de la procédure)          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsConserv === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="non"
                checked={showOptionsConserv === "non"}
                onChange={() => handleToggleConserv("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsConserv === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="oui"
                checked={showOptionsConserv === "oui"}
                onChange={() => handleToggleConserv("oui")}
              />
              Oui
            </label>
          </div>
        </div>
        <textarea className="textarea" name="conciliation" id="conciliation"></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
          Une médiation est-elle en cours ? 
          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsMediation === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="non"
                checked={showOptionsMediation === "non"}
                onChange={() => handleToggleMediation("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsMediation === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="oui"
                checked={showOptionsMediation === "oui"}
                onChange={() => handleToggleMediation("oui")}
              />
              Oui
            </label>
          </div>
        </div>
        <textarea className="textarea" name="conciliation" id="conciliation"></textarea>
      </div>
      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
          Si non, est-elle souhaitée ?
          </p>
          <div className="box">
            <label
              className={`toggleButtonForm ${
                showOptionsMediationChoix === "non" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="non"
                checked={showOptionsMediationChoix === "non"}
                onChange={() => handleToggleMediationChoix("non")}
              />
              Non
            </label>
            <label
              className={`toggleButtonForm ${
                showOptionsMediationChoix === "oui" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="conciliation"
                value="oui"
                checked={showOptionsMediationChoix === "oui"}
                onChange={() => handleToggleMediationChoix("oui")}
              />
              Oui
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affaire;
