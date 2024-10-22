import React, { useState, useEffect, useRef } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import ToggleButton from "./ToggleButton";
import PopupDomaineJuridique from "./PopupDomaineJuridique";
import PopupProvision from "./PopupProvision";
import PopupHonoraire from "./PopupHonoraire";
import PopupMontant from "./PopupMontant";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";
import PopupValidationDate from "../../../PopUp/PopupValidationDate";
import PopupHTMLEditorWarning from "../../TextEditor/PopupHTMLEditorWarning";

const Affaire = () => {
  const { selectedDomains, setSelectedDomains } = useGeneraliteContext();
  const { honoraireData, setHonoraireData } = useGeneraliteContext();
  const { honoraireToCompare, setHonoraireToCompare } = useGeneraliteContext();
  const { provisionData, setProvisionData } = useGeneraliteContext();
  const { montantData, setMontantData } = useGeneraliteContext();
  const { formData, setFormData } = useGeneraliteContext();
  const { showOptions, setShowOptions } = useGeneraliteContext();
  const popupRef = useRef(null);

  const [showWarningLength, setShowWarningLength] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [id, setId] = useState("");

  const validateDate = (selectedDate, id) => {
    const currentDate = new Date();
    const selected = new Date(selectedDate);

    if (selected > currentDate) {
      setShowWarning(true);
      setFormData((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    } else {
      setShowWarning(false);
    }
  };

  const closePopup = () => {
    setShowWarningLength(false);
  };
  const textareaRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupMontantVisible, setIsPopupMontantVisible] = useState(false);
  const [isPopupHonoraireVisible, setIsPopupHonoraireVisible] = useState(false);
  const [isPopupProvisionVisible, setIsPopupProvisionVisible] = useState(false);
  const [selectedHonoraireDate, setSelectedHonoraireDate] = useState("");
  const [selectedProvisionDate, setSelectedProvisionDate] = useState("");
  const [uniqueHonoraireDates, setUniqueHonoraireDates] = useState([]);
  const [uniqueProvisionDates, setUniqueProvisionDates] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedComment, setSelectedComment] = useState("");

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      domaine: selectedDomains,
      honoraire: honoraireData,
      provision: provisionData,
      montant: montantData,
    }));
  }, [selectedDomains, honoraireData, provisionData, montantData]);

  useEffect(() => {
    if (montantData.length > 0) {
      setSelectedAmount(montantData[0].amount);
      setSelectedComment(montantData[0].comment);
    }
  }, [montantData]);

  const handleAmountChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAmount(selectedValue);

    const selectedData = montantData.find(
      (item) => item.amount === selectedValue
    );
    setSelectedComment(selectedData ? selectedData.comment : "");
  };

  const handleToggle = (field, value) => {
    setShowOptions((prevState) => ({ ...prevState, [field]: value }));

    setFormData((prevState) => {
      const updatedFormData = { ...prevState };

      if (value === "non") {
        updatedFormData[field] = "non";
      } else if (prevState[field] === "non") {
        updatedFormData[field] = "";
      }

      return updatedFormData;
    });
  };

  useEffect(() => {
    const updatedFormData = { ...formData };

    Object.keys(showOptions).forEach((field) => {
      if (showOptions[field] === "non") {
        updatedFormData[field] = "non";
      }
    });

    setFormData(updatedFormData);
  }, [showOptions]);

  const isDisabled = (field) => showOptions[field] === "non";

  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setIsPopupHonoraireVisible(false);
    setIsPopupMontantVisible(false);
    setIsPopupProvisionVisible(false);
  };

  const handlePopupDomaineSubmit = async (data) => {
    setSelectedDomains(data);
    setFormData((prevState) => ({
      ...prevState,
    }));

    handlePopupClose();
  };

  useEffect(() => {
    if (honoraireData.length > 0) {
      const noteHonoraire = honoraireData.map(
        ({ date, amount, reference }) => ({
          date,
          amount,
          reference,
        })
      );
      setHonoraireToCompare(noteHonoraire);
    } else {
      setHonoraireToCompare([]);
    }
  }, [honoraireData]);

  const handlePopupMontantSubmit = async (data) => {
    setMontantData(data);
    setFormData((prevState) => ({
      ...prevState,
      noteDivers: data.length > 0 ? data[0].amount : "",
    }));
    handlePopupClose();
  };

  const handlePopupHonoraireSubmit = async (data) => {
    setHonoraireData(data);
    setUniqueHonoraireDates([...new Set(data.map((item) => item.date))]);
    handlePopupClose();
  };
  const [contentTextarea, setContentTextarea] = useState("");
  const handlePopupProvisionSubmit = async (data) => {
    setProvisionData(data);
    setUniqueProvisionDates([...new Set(data.map((item) => item.date))]);
    handlePopupClose();
  };

  const popupRefLength = useRef(null);

  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const handleFocus = () => {
    setIsTextareaFocused(true);
    setShowWarningLength(false);
  };

  const contentRef = useRef(contentTextarea);

  const handleTextareaChange = (event) => {
    const { id, value: newValue } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));

    if (id === "dateFin" || id === "dateDebut" || id === "datecontest") {
      validateDate(newValue, id);
    } else if (id == "nomAffaire" || id == "client") {
      //Do nothing haha
    } else {
      setContentTextarea(newValue);
      console.log(`Ito ny id:${id} Dia ito ny value ${newValue}`);
      contentRef.current = newValue;
    }
  };

  const handleClickOutsideTextarea = (event) => {
    if (textareaRef.current && !textareaRef.current.contains(event.target)) {
      if (contentRef.current === "") {
        setShowWarningLength(false);
        console.log("Valid: empty is also Gwenchanaaaaaa.");
      } else if (contentRef.current.length < 6) {
        setShowWarningLength(true);
        console.log("Invalid: Not Daijobuuu");
      } else {
        setShowWarningLength(false);
        console.log("Valid: Length is Gwenchanaaaaaa.");
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClickOutsideTextarea(event);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClickOutsideTextarea(event);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handlePopupClose();
    }
  };

  const filteredHonoraireData = honoraireData.filter(
    (item) => item.date === selectedHonoraireDate
  );

  const filteredProvisionData = provisionData.filter(
    (item) => item.date === selectedProvisionDate
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <textarea
          id="nomAffaire"
          value={formData.nomAffaire}
          onChange={handleTextareaChange}
          required
        />
      </div>

      <div
        className="formGroup"
        style={{
          display: "flex",
          margin: "15px 100px 15px 15px",
        }}
      >
        <label htmlFor="dateDebut">Date de début du mandat * :</label>
        <input
          type="date"
          id="dateDebut"
          value={formData.dateDebut}
          onChange={handleTextareaChange}
          required
        />
      </div>
      <div
        className="formGroup"
        style={{
          display: "flex",
          margin: "15px 110px 15px 15px",
        }}
      >
        <label htmlFor="dateFin">Date de fin du mandat * :</label>
        <input
          type="date"
          id="dateFin"
          value={formData.dateFin}
          onChange={handleTextareaChange}
          required
        />
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            Une convention d’honoraires/lettre d’engagement a-t-elle été signée
            ?
            <br />
            Si oui, quels en étaient les termes ? (merci de joindre la
            convention d’honoraires au dossier de taxation):
          </p>
          <ToggleButton
            name="termesHonoraires"
            checkedValue={showOptions.termesHonoraires}
            onChange={(value) => handleToggle("termesHonoraires", value)}
          />
        </div>
        <textarea
          id="termesHonoraires"
          ref={textareaRef}
          className={`textarea ${
            isDisabled("termesHonoraires") ? "disabled" : ""
          }`}
          value={
            isDisabled("termesHonoraires") ? "" : formData.termesHonoraires
          }
          onChange={handleTextareaChange}
          disabled={isDisabled("termesHonoraires")}
        />
      </div>
      {showWarningLength && (
        <div className="popupContainer" ref={popupRefLength}>
          <PopupHTMLEditorWarning onClose={closePopup} nomChamp="champ" />
        </div>
      )}
      <div className="formGroup">
        <label htmlFor="absenceTerm">
          En l’absence de convention d’honoraires/lettre d’engagement en bonne
          et due forme, un budget ou un taux horaire a-t'il été annoncé au
          client ?
        </label>
        <textarea
          ref={textareaRef}
          style={{ width: "100%" }}
          id="absenceTerm"
          value={formData.absenceTerm}
          onChange={handleTextareaChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            Affaire(s) en cours ? (si oui, préciser l’état d’avancement) :<br />
            Etat d’avancement hors recouvrement des honoraires (Juridiction,
            décisions rendues, expertise, plaidoiries…)
          </p>
          <ToggleButton
            name="etatAvancement"
            checkedValue={showOptions.etatAvancement}
            onChange={(value) => handleToggle("etatAvancement", value)}
          />
        </div>
        <div ref={textareaRef}>
          <textarea
            id="etatAvancement"
            className={`textarea ${
              isDisabled("etatAvancement") ? "disabled" : ""
            }`}
            value={isDisabled("etatAvancement") ? "" : formData.etatAvancement}
            onChange={handleTextareaChange}
            disabled={isDisabled("etatAvancement")}
            onFocus={handleFocus}
          />
        </div>
      </div>
      <div className="formGroup">
        <label htmlFor="datecontest">
          Date de la contestation des honoraires * :{" "}
        </label>
        <input
          type="date"
          id="datecontest"
          value={formData.datecontest}
          onChange={handleTextareaChange}
          style={{ margin: "0px", width: "19vw" }}
          required
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
          {honoraireData.length === 0 ? (
            <IoAddCircle
              style={{ color: "green", fontSize: "40px" }}
              onClick={() =>
                setIsPopupHonoraireVisible(!isPopupHonoraireVisible)
              }
            />
          ) : (
            <>
              <IoAddCircle
                style={{ color: "green", fontSize: "40px" }}
                onClick={() =>
                  setIsPopupHonoraireVisible(!isPopupHonoraireVisible)
                }
              />
              <select
                value={selectedHonoraireDate}
                onChange={(e) => setSelectedHonoraireDate(e.target.value)}
                style={{ marginBottom: "20px" }}
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
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <label>
                          <strong>Date :</strong>
                          <input type="text" value={item.date} readOnly />
                        </label>
                        <label>
                          <strong>Référence :</strong>
                          <input
                            type="text"
                            value={item.reference || ""}
                            readOnly
                          />
                        </label>
                        <label>
                          <strong>Montant TTC :</strong>
                          <input
                            type="text"
                            value={item.amount || ""}
                            readOnly
                          />
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
                onClose={handlePopupClose}
                onOpen={() => {
                  setIsPopupHonoraireVisible(true);
                }}
                onSubmit={handlePopupHonoraireSubmit}
              />
            </div>
          )}
        </div>
      </div>

      <div className="formGroup">
        <p>Date, référence et montant TTC de la/des note(s) de provision :</p>
        <div
          className="btnAdd"
          style={{ textAlign: "center", marginRight: "900px" }}
        >
          {provisionData.length === 0 ? (
            <IoAddCircle
              style={{ color: "green", fontSize: "40px" }}
              onClick={() =>
                setIsPopupProvisionVisible(!isPopupProvisionVisible)
              }
            />
          ) : (
            <>
              <IoAddCircle
                style={{ color: "green", fontSize: "40px" }}
                onClick={() =>
                  setIsPopupProvisionVisible(!isPopupProvisionVisible)
                }
              />
              <select
                value={selectedProvisionDate}
                onChange={(e) => setSelectedProvisionDate(e.target.value)}
                style={{ marginBottom: "20px" }}
              >
                <option value="">Select Date</option>
                {uniqueProvisionDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>

              <div className="honoraireData">
                {selectedProvisionDate && filteredProvisionData.length > 0 && (
                  <div className="honoraireData">
                    {filteredProvisionData.map((item, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <label>
                          <strong>Date :</strong>
                          <input type="text" value={item.date} readOnly />
                        </label>
                        <label>
                          <strong>Référence :</strong>
                          <input
                            type="text"
                            value={item.reference || ""}
                            readOnly
                          />
                        </label>
                        <label>
                          <strong>Montant :</strong>
                          <input
                            type="text"
                            value={item.amount || ""}
                            readOnly
                          />
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

        <div className="formGroup">
          <label style={{ display: "inline" }} htmlFor="client">
            Merci de bien vouloir indiquer les montants TTC :
          </label>
          <div className="divflex" style={{ display: "flex" }}>
            <select
              className={`selectarea ${isDisabled("notes") ? "disabled" : ""}`}
              id="client"
              value={selectedAmount}
              onChange={handleAmountChange}
            >
              {montantData.map((item, index) => (
                <option key={index} value={item.amount}>
                  {item.amount} TTC
                </option>
              ))}
            </select>
            <textarea
              className={`textarea ${isDisabled("notes") ? "disabled" : ""}`}
              style={{ width: "30vw", height: "40px", marginTop: "-2px" }}
              value={selectedComment}
              onFocus={handleFocus}
              readOnly
            />

            <div className="btnAdd">
              <IoAddCircle
                className={` buttonIoAdd ${
                  isDisabled("notes") ? "disabled" : ""
                }`}
                style={{ color: "green", fontSize: "40px", marginTop: "-2px" }}
                onClick={() => {
                  if (!isDisabled("notes")) {
                    setIsPopupMontantVisible(!isPopupMontantVisible);
                  }
                }}
              />
            </div>
            {isPopupMontantVisible && (
              <div className="popupContainer" ref={popupRef}>
                <PopupMontant
                  onClose={handlePopupClose}
                  onSubmit={handlePopupMontantSubmit}
                />
              </div>
            )}
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
          ref={textareaRef}
          className={`textarea ${isDisabled("conciliation") ? "disabled" : ""}`}
          onFocus={handleFocus}
          name="conciliation"
          id="conciliation"
          onChange={handleTextareaChange}
          value={isDisabled("conciliation") ? "" : formData.conciliation}
          disabled={isDisabled("conciliation")}
        />
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
          ref={textareaRef}
          className={`textarea ${isDisabled("relative") ? "disabled" : ""}`}
          name="relative"
          id="relative"
          onChange={handleTextareaChange}
          value={isDisabled("relative") ? "" : formData.relative}
          disabled={isDisabled("relative")}
          onFocus={handleFocus}
        />
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>
            Des mesures conservatoires ont-elles été introduites ?(date, action
            judiciaire, procédure et stade de la procédure)
          </p>
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
          onChange={handleTextareaChange}
          value={isDisabled("conserv") ? "" : formData.conserv}
          disabled={isDisabled("conserv")}
          onFocus={handleFocus}
          ref={textareaRef}
        />
      </div>

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Unde médiation est-elle en cours?</p>
          <ToggleButton
            name="mediation"
            checkedValue={showOptions.mediation}
            onChange={(value) => handleToggle("mediation", value)}
          />
        </div>

        <textarea
          ref={textareaRef}
          className={`textarea ${isDisabled("mediation") ? "disabled" : ""}`}
          name="mediation"
          id="mediation"
          onChange={handleTextareaChange}
          value={isDisabled("mediation") ? "" : formData.mediation}
          disabled={isDisabled("mediation")}
          onFocus={handleFocus}
        />
      </div>
      {showWarning && (
        <div className="popupContainer">
          <PopupValidationDate
            onClose={() => {
              setShowWarning(false);
            }}
            nomChamp={
              id == "datecontest"
                ? "date de contestation des honoraires"
                : id == "dateDebut"
                ? "date de début du mandat"
                : id == "dateFin"
                ? "date de fin du mandat"
                : "date"
            }
          />
        </div>
      )}

      <div className="formGroupbtn">
        <div className="toggleButtons">
          <p>Si non, est-elle souhaitée ?</p>
          <ToggleButton
            name="mediationChoix"
            checkedValue={showOptions.mediationChoix}
            onChange={(value) => {
              handleToggle("mediationChoix", value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Affaire;
