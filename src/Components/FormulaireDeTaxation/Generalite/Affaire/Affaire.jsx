import React, { useState, useEffect, useRef } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import ToggleButton from "./ToggleButton";
import PopupDomaineJuridique from "./PopupDomaineJuridique";
import PopupProvision from "./PopupProvision";
import PopupHonoraire from "./PopupHonoraire";


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
  const popupRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupHonoraireVisible, setIsPopupHonoraireVisible] = useState(false);
  const [isPopupProvisionVisible, setIsPopupProvisionVisible] = useState(false);
  const [honoraireData, setHonoraireData] = useState([]);
  const [provisionData, setProvisionData] = useState([]);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
      setIsPopupHonoraireVisible(false);
      setIsPopupProvisionVisible(false);
    }
  };
  const [selectedDomains, setSelectedDomains] = useState([]);
    
  const [selectedHonoraireDate, setSelectedHonoraireDate] = useState('');
  const [selectedProvisionDate, setSelectedProvisionDate] = useState('');
    
  const [uniqueHonoraireDates, setUniqueHonoraireDates] = useState([]);
  const [uniqueProvisionDates, setUniqueProvisionDates] = useState([]);

  const filteredHonoraireData = honoraireData.filter(item => item.date === selectedHonoraireDate);
  const filteredProvisionData = provisionData.filter(item => item.date === selectedProvisionDate);
  

  
  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setIsPopupHonoraireVisible(false);
    setIsPopupProvisionVisible(false);
  };

  const handlePopupDomaineSubmit = (data) => {
    setSelectedDomains(data);
    setIsPopupVisible(false);
  };

  const handlePopupHonoraireSubmit = (data) => {
    setHonoraireData(data);
    setUniqueHonoraireDates([...new Set(data.map(item => item.date))]);
    setIsPopupHonoraireVisible(false);
  };

  const handlePopupProvisionSubmit = (data) => {
    setProvisionData(data);
    setUniqueProvisionDates([...new Set(data.map(item => item.date))]);
    setIsPopupProvisionVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleToggle = (field, value) => {
    setShowOptions((prevState) => ({ ...prevState, [field]: value }));
  };

  const isDisabled = (field) => showOptions[field] === "non";

  return (
    <div>
      <div className="formGroup">
        <label htmlFor="formation">Domaine(s) juridique(s) * : </label>
        <textarea
          id="formation"
          value={selectedDomains.join("\n")}
          readOnly
          rows={selectedDomains.length}
        />
        <IoAddCircle
          onClick={() => setIsPopupVisible(!isPopupVisible)}
          style={{
            color: "green",
            fontSize: "40px",
            margin: "0px 0px 25px 20px",
          }}
        />
        {isPopupVisible && (
          <div className="popupContainer" ref={popupRef}>
            <PopupDomaineJuridique
              onClose={handlePopupClose}
              onSubmit={handlePopupDomaineSubmit}
              selectedDomains={selectedDomains}
            />
          </div>
        )}
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
        <textarea
          className={`textarea ${isDisabled("honoraires") ? "disabled" : ""}`}
          id="nomAffaire"
          disabled={isDisabled("honoraires")}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="nomAffaire">
          En l’absence de convention d’honoraires/lettre d’engagement en bonne
          et due forme, un budget ou un taux horaire a-t'il été annoncé au
          client ?
        </label>
        <textarea className={`textarea`} id="nomAffaire" />
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
        <textarea
          className={`textarea ${isDisabled("affaire") ? "disabled" : ""}`}
          id="nomAffaire"
          disabled={isDisabled("affaire")}
        />
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
        <div className="btnAdd" style={{ textAlign: 'center', marginRight: '900px' }}>
          {honoraireData.length === 0 ? (
            <IoAddCircle
              style={{ color: 'green', fontSize: '40px' }}
              onClick={() => setIsPopupHonoraireVisible(!isPopupHonoraireVisible)}
            />
          ) : (
            <>
             <IoAddCircle
              style={{ color: 'green', fontSize: '40px' }}
              onClick={() => setIsPopupHonoraireVisible(!isPopupHonoraireVisible)}
            />
              <select
                value={selectedHonoraireDate}
                onChange={(e) => setSelectedHonoraireDate(e.target.value)}
                style={{ marginBottom: '20px' }}
              >
                <option value="">Select Date</option>
                {uniqueHonoraireDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>

              <div className="honoraireData">
                {selectedHonoraireDate && filteredHonoraireData.length > 0 && (
                  <div className="honoraireData">
                    {filteredHonoraireData.map((item, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <label>
                          <strong>Date :</strong>
                          <input type="text" value={item.date} readOnly />
                        </label>
                        <label>
                          <strong>Référence :</strong>
                          <input type="text" value={item.reference || ''} readOnly />
                        </label>
                        <label>
                          <strong>Montant TTC :</strong>
                          <input type="text" value={item.amount || ''} readOnly />
                        </label>
                        <label>
                          <strong>Payée :</strong>
                          <input type="text" value={item.paye} readOnly />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {isPopupHonoraireVisible && (
            <div className="popupContainer" ref={popupRef}>
              <PopupHonoraire
                honoraireData={honoraireData}
                onClose={handlePopupClose}
                onSubmit={handlePopupHonoraireSubmit}
              />
            </div>
          )}
        </div>
      </div>

      <div className="formGroup">
        <p>Date, référence et montant TTC de la/des note(s) de provision :</p>
        <div className="btnAdd" style={{ textAlign: 'center', marginRight: '900px' }}>
          {provisionData.length === 0 ? (
            <IoAddCircle
              style={{ color: 'green', fontSize: '40px' }}
              onClick={() => setIsPopupProvisionVisible(!isPopupProvisionVisible)}
            />
          ) : (
            <>
             <IoAddCircle
              style={{ color: 'green', fontSize: '40px' }}
              onClick={() => setIsPopupHonoraireVisible(!isPopupHonoraireVisible)}
            />
              <select
                value={selectedProvisionDate}
                onChange={(e) => setSelectedProvisionDate(e.target.value)}
                style={{ marginBottom: '20px' }}
              >
                <option value="">Select Date</option>
                {uniqueProvisionDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>

              <div className="honoraireData" >
                {selectedProvisionDate && filteredProvisionData.length > 0 && (
                  <div className="honoraireData">
                    {filteredProvisionData.map((item, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <label>
                          <strong>Date :</strong>
                          <input type="text" value={item.date} readOnly />
                        </label>
                        <label>
                          <strong>Référence :</strong>
                          <input type="text" value={item.reference || ''} readOnly />
                        </label>
                        <label>
                          <strong>Montant :</strong>
                          <input type="text" value={item.amount || ''} readOnly />
                        </label>
                        <label>
                          <strong>Payée :</strong>
                          <input type="text" value={item.paye} readOnly />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {isPopupProvisionVisible && (
            <div className="popupContainer" ref={popupRef}>
              <PopupProvision
                provisionData={provisionData}
                onClose={handlePopupClose}
                onSubmit={handlePopupProvisionSubmit}
              />
            </div>
          )}
        </div>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            D’autres notes dans le cadre de la même affaire ont-elles été payées
            ? (Factures...)
          </p>
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
            <IoAddCircle
              style={{ color: "green", fontSize: "40px", marginTop: "-2px" }}
            />
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
        <textarea
          className={`textarea ${isDisabled("conciliation") ? "disabled" : ""}`}
          name="conciliation"
          id="conciliation"
          disabled={isDisabled("conciliation")}
        ></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            Une procédure relative au recouvrement des honoraires a-t-elle été
            introduite ? (date, action judiciaire, procédure et stade de la
            procédure)
          </p>
          <ToggleButton
            name="relative"
            checkedValue={showOptions.relative}
            onChange={(value) => handleToggle("relative", value)}
          />
        </div>
        <textarea
          className={`textarea ${isDisabled("relative") ? "disabled" : ""}`}
          name="relative"
          id="relative"
          disabled={isDisabled("relative")}
        ></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Une procédure conservatoire a-t-elle été introduite ?</p>
          <ToggleButton
            name="conserv"
            checkedValue={showOptions.conserv}
            onChange={(value) => handleToggle("conserv", value)}
          />
        </div>
        <textarea
          className={`textarea ${isDisabled("conserv") ? "disabled" : ""}`}
          name="conserv"
          id="conserv"
          disabled={isDisabled("conserv")}
        ></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            Une procédure de médiation a-t-elle été introduite ? (date,
            médiateur et résultat)
          </p>
          <ToggleButton
            name="mediation"
            checkedValue={showOptions.mediation}
            onChange={(value) => handleToggle("mediation", value)}
          />
        </div>
        <textarea
          className={`textarea ${isDisabled("mediation") ? "disabled" : ""}`}
          name="mediation"
          id="mediation"
          disabled={isDisabled("mediation")}
        ></textarea>
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Médiation sur choix :</p>
          <ToggleButton
            name="mediationChoix"
            checkedValue={showOptions.mediationChoix}
            onChange={(value) => handleToggle("mediationChoix", value)}
          />
        </div>
        <textarea
          className={`textarea ${
            isDisabled("mediationChoix") ? "disabled" : ""
          }`}
          name="mediationChoix"
          id="mediationChoix"
          disabled={isDisabled("mediationChoix")}
        ></textarea>
      </div>
    </div>
  );
};

export default Affaire;
