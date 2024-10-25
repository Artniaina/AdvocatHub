import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/Popup.css";
import ToggleButton from "./ToggleButton";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";
import PopupValidationDate from "../../../PopUp/PopupValidationDate";

const PopupHonoraire = ({ onClose, onSubmit, honoraireData }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningDateIndex, setWarningDateIndex] = useState(null);
  const [isModified, setIsModified] = useState(false);

  const initialData = Array.from({ length: 10 }, () => ({
    date: "",
    reference: "",
    amount: "",
    paye: "non",
  }));
  
  const [rowsData, setRowsData] = useState(initialData);
  const [initialRowsData, setInitialRowsData] = useState(initialData);

  useEffect(() => {
    if (honoraireData && honoraireData.length > 0) {
 
      const updatedRows = initialData.map((row, index) => ({
        ...row,
        ...(honoraireData[index] || {})
      }));
      setRowsData(updatedRows);
    } else {
      setRowsData(initialData); 
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

  useEffect(() => {
    setIsModified(checkIfModified());
  }, [rowsData]);

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

  const handleCloseWarning = () => {
    setShowWarning(false);
    if (warningDateIndex !== null) {
      setRowsData((prevState) =>
        prevState.map((row, i) =>
          i === warningDateIndex ? { ...row, date: "" } : row
        )
      );
      setWarningDateIndex(null);
    }
  };

  const checkIfModified = () => {
    return rowsData.some((row, index) => {
      const initialRow = initialRowsData[index];
      return (
        row.date !== initialRow.date ||
        row.reference !== initialRow.reference ||
        row.amount !== initialRow.amount ||
        row.paye !== initialRow.paye
      );
    });
  };

  const getModifiedData = () => {
    return rowsData.filter((row, index) => {
      const initialRow = initialRowsData[index];
      return (
        row.date !== initialRow.date ||
        row.reference !== initialRow.reference ||
        row.amount !== initialRow.amount ||
        row.paye !== initialRow.paye
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const modifiedData = getModifiedData();
    onSubmit(modifiedData);
    console.log("Données mises à jour", modifiedData);
    onClose();
  };

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div
          className="popupAffaire"
          style={{ top: "10px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="closeButton">
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubmit}>
            <table className="domainTable">
              <thead>
                <tr>
                  <th>Date*</th>
                  <th>Référence</th>
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
                        onChange={(e) =>
                          handleInputChange(index, "date", e.target.value)
                        }
                        required={row.date || row.amount}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.reference}
                        onChange={(e) =>
                          handleInputChange(index, "reference", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.amount}
                        onChange={(e) =>
                          handleInputChange(index, "amount", e.target.value)
                        }
                        required={row.amount || row.date}
                      />
                    </td>
                    <td style={{ display: "flex" }}>
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
      </div>
      {showWarning && warningDateIndex !== null && (
        <PopupValidationDate
          onClose={handleCloseWarning}
          date={rowsData[warningDateIndex]?.date} 
        />
      )}
    </>
  );
};

export default PopupHonoraire;
