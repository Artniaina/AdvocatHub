import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/Popup.css";
import ToggleButton from "./ToggleButton";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";
import PopupValidationDate from "../../../PopUp/PopupValidationDate";

const PopupHonoraire = ({ onClose, onSubmit }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningDateIndex, setWarningDateIndex] = useState(null);
  const [rowsData, setRowsData] = useState(
    Array.from({ length: 10 }, () => ({
      date: "",
      reference: "",
      amount: "",
      paye: "non",
    }))
  );

  const { honoraireData } = useGeneraliteContext();

  useEffect(() => {
    if (honoraireData && honoraireData.length > 0) {
      setRowsData(honoraireData);
    }
  }, [honoraireData]);

  const validateDate = (selectedDate, index) => {
    const currentDate = new Date();
    const selected = new Date(selectedDate);

    if (selected > currentDate) {
      setShowWarning(true);
      setWarningDateIndex(index);
      setRowsData((prevState) =>
        prevState.map((row, i) => (i === index ? { ...row, date: "" } : row))
      );
    } else {
      setShowWarning(false);
      if (warningDateIndex === index) {
        setWarningDateIndex(null);
      }
    }
  };

  const handleInputChange = (index, field, value) => {
    if (field === "date") {
      validateDate(value, index);
    }
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleToggle = (index, value) => {
    setRowsData((prevState) =>
      prevState.map((row, i) => (i === index ? { ...row, paye: value } : row))
    );
  };

  const handleReset = (index) => {
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { date: "", reference: "", amount: "", paye: "non" } : row
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rowsData);
    onClose();
  };

  const areAllFieldsEmpty = (row) => {
    return !row.date && !row.reference && !row.amount;
  };

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="popupAffaire" style={{ top: "10px" }} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="closeButton">
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubmit}>
            <table className="domainTable">
              <thead>
                <tr>
                  <th>Date*</th>
                  <th>Référence*</th>
                  <th>Montant*</th>
                  <th>Payée?</th>
                </tr>
              </thead>
              <tbody>
                {rowsData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => handleInputChange(index, "date", e.target.value)}
                        required={!areAllFieldsEmpty(row)} 
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.reference}
                        onChange={(e) => handleInputChange(index, "reference", e.target.value)}
                        required={!areAllFieldsEmpty(row)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.amount}
                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                        required={!areAllFieldsEmpty(row)} 
                      />
                    </td>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <ToggleButton
                        name={`paye-${index}`}
                        checkedValue={row.paye}
                        onChange={(value) => handleToggle(index, value)}
                      />
                      <TiDelete
                        style={{
                          color: "red",
                          fontSize: "50px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleReset(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="submitButton">
              Valider
            </button>
          </form>
        </div>
        {showWarning && warningDateIndex !== null && (
          <PopupValidationDate
            onClose={() => {
              setShowWarning(false);
              setWarningDateIndex(null);
            }}
            date={rowsData[warningDateIndex].date}
          />
        )}
      </div>
    </>
  );
};

export default PopupHonoraire;
