import React, { useState, useEffect } from "react";
import "../../../../../Styles/TaxationForm/Popup.css";
import "../../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../../../../Hooks/GeneraliteContext";

const PopupMontant = ({ onClose, onSubmit }) => {
  const { montantData } = useGeneraliteContext();
  const initialData = Array.from({ length: 5 }, () => ({
    amount: "",
    comment: "",
  }));

  const [rowsData, setRowsData] = useState(initialData);
  const [initialRowsData, setInitialRowsData] = useState(initialData);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (montantData && montantData.length > 0) {
      setRowsData((prevRowsData) => {
        const updatedData = [...prevRowsData];
        montantData.forEach((provision, index) => {
          if (updatedData[index]) {
            updatedData[index] = { ...updatedData[index], ...provision };
          }
        });
        return updatedData;
      });
    }
    setInitialRowsData(rowsData);
  }, [montantData]);

  const checkIfModified = () => {
    return rowsData.some((row, index) => {
      const initialRow = initialRowsData[index];
      return (
        row.amount !== initialRow.amount || row.comment !== initialRow.comment
      );
    });
  };

  useEffect(() => {
    setIsModified(checkIfModified());
  }, [rowsData]);

  const handleInputChange = (index, field, value) => {
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleReset = (index) => {
    setRowsData((prevState) =>
      prevState.map((row, i) =>
        i === index ? { amount: "", comment: "" } : row
      )
    );
  };

  const getModifiedData = () => {
    return rowsData.filter((row, index) => {
      const initialRow = initialRowsData[index];
      return (
        row.amount !== initialRow.amount || row.comment !== initialRow.comment
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifiedData = getModifiedData();
    const updateMontant = [...modifiedData];

    onSubmit(updateMontant);
    console.log("Données mises à jour", updateMontant);
    onClose();
  };

  const rows = Array.from({ length: 5 });

  const isRequired = (index) => {
    const row = rowsData[index];
    return row.amount.trim() || row.comment.trim() ? true : false;
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popupAffaire" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="closeButton">
          <IoCloseCircle />
        </button>
        <form onSubmit={handleSubmit}>
          <table className="domainTable">
            <thead>
              <tr>
                <th>Montant*</th>
                <th>Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      placeholder="0.00 €"
                      value={rowsData[index].amount}
                      onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                      }
                      required={isRequired(index)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      value={rowsData[index].comment}
                      onChange={(e) =>
                        handleInputChange(index, "comment", e.target.value)
                      }
                      style={{
                        border: "none",
                        backgroundColor: "#ffffff00",
                      }}
                    />
                  </td>
                  <td style={{ display: "flex" }}>
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
  );
};

export default PopupMontant;
