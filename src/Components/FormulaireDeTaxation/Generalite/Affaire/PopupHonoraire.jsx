import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/Popup.css";
import ToggleButton from "./ToggleButton";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";
import PopupValidationDate from "../../../PopUp/PopupValidationDate";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupHonoraire = ({ onClose, onSubmit }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningDateIndex, setWarningDateIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorPopupMessage, setErrorPopupMessage] = useState(null);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const { honoraireData } = useGeneraliteContext();
  const initialData = Array.from({ length: 10 }, () => ({
    date: "",
    reference: "",
    amount: "",
    paye: "non",
  }));

  const [rowsData, setRowsData] = useState(initialData);
  const [initialRowsData, setInitialRowsData] = useState(initialData);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (honoraireData && honoraireData.length > 0) {
      setRowsData((prevRowsData) => {
        const updatedData = [...prevRowsData];
        honoraireData.forEach((honoraire, index) => {
          if (updatedData[index]) {
            updatedData[index] = { ...updatedData[index], ...honoraire };
          }
        });
        return updatedData;
      });
    }
    setInitialRowsData(rowsData);
  }, [honoraireData]);

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

  useEffect(() => {
    setIsModified(checkIfModified());
  }, [rowsData]);

  const handleInputChange = (index, field, value) => {
    if (field === "date") {
      validateDate(value, index);
    }
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
    validateRow(index, { ...rowsData[index], [field]: value });
  };

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

  const validateRow = (index, row) => {
    const rowErrors = {};
    if (!row.date) {
      rowErrors.date = "Date is required";
    }
    if (!row.amount) {
      rowErrors.amount = "Amount is required";
    }
    if (!row.reference) {
      rowErrors.reference = "Reference is required";
    }

    setErrors((prev) => ({ ...prev, [index]: rowErrors }));

    
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
    setErrors((prev) => ({ ...prev, [index]: {} }));
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
    const hasErrors = Object.values(errors).some(
      (rowErrors) => Object.keys(rowErrors).length > 0
    );

    if (!hasErrors) {
      onSubmit(modifiedData);
      console.log("Données mises à jour", modifiedData);
      onClose();
    } else {
      console.log("Il y a des erreurs dans le formulaire");
      setErrorPopupMessage(`Veuillez remplir ce champ`);
      setIsErrorPopupOpen(true);
    }
  };

  const rows = Array.from({ length: 10 });
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {isErrorPopupOpen && (
        <div className="error-popup">
          <Popup
            open={isErrorPopupOpen}
            onClose={() => setIsErrorPopupOpen(false)}
          >
            <div>{errorPopupMessage}</div>
            <button onClick={() => setIsErrorPopupOpen(false)}>Close</button>
          </Popup>
        </div>
      )}
      <div className="overlay" onClick={onClose}>
        <div
          className="popupAffaire"
          style={{ top: "10px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="closeButton">
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubmitForm}>
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
                {rows.map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        id={`date-${index}`}
                        value={rowsData[index].date}
                        onChange={(e) =>
                          handleInputChange(index, "date", e.target.value)
                        }
                        className={errors[index]?.date ? "error" : ""}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={rowsData[index].reference}
                        onChange={(e) =>
                          handleInputChange(index, "reference", e.target.value)
                        }
                        className={errors[index]?.reference ? "error" : ""}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={rowsData[index].amount}
                        onChange={(e) =>
                          handleInputChange(index, "amount", e.target.value)
                        }
                        className={errors[index]?.amount ? "error" : ""}
                      />
                    </td>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <ToggleButton
                        name={`paye-${index}`}
                        checkedValue={rowsData[index].paye}
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
            <button
              type="submit"
              className="submitButton"
              style={{
                pointerEvents: isModified ? "auto" : "none",
                opacity: isModified ? 1 : 0.5,
              }}
              disabled={
                !isModified 
              }
              onClick={handleSubmit}
            >
              Valider
            </button>
          </form>
        </div>
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
    </>
  );
};

export default PopupHonoraire;
