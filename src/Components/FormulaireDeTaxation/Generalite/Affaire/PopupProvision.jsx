import React, { useState } from "react";
import "../../../../Styles/TaxationForm/Popup.css";
import ToggleButton from "./ToggleButton";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const PopupProvision = ({ onClose, onSubmit }) => {
    const [rowsData, setRowsData] = useState(
      Array.from({ length: 5 }, () => ({
        date: "",
        reference: "",
        amount: "",
        paye: "non"
      }))
    );
  
    const handleInputChange = (index, field, value) => {
      setRowsData((prevState) =>
        prevState.map((row, i) =>
          i === index ? { ...row, [field]: value } : row
        )
      );
    };
  
    const handleToggle = (index, value) => {
      setRowsData((prevState) =>
        prevState.map((row, i) =>
          i === index ? { ...row, paye: value } : row
        )
      );
    };
    const handleReset = (index) => {
      setRowsData((prevState) =>
        prevState.map((row, i) =>
          i === index
            ? { date: "", reference: "", amount: "", paye: "non" }
            : row
        )
      );
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = rowsData; 
      console.log(data);
      onClose();
    };
  
    const rows = Array.from({ length: 5 });
  
    return (
      <div className="overlay" onClick={onClose}>
        <div className="popupAffaire" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="closeButton">
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubmit}>
            <table className="domainTable" >
              <thead>
                <tr>
                  <th>Date*</th>
                  <th>Référence</th>
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
                        value={rowsData[index].date}
                        onChange={(e) => handleInputChange(index, "date", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={rowsData[index].reference}
                        onChange={(e) => handleInputChange(index, "reference", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={rowsData[index].amount}
                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                      />
                    </td>
                    <td style={{display:"flex"}}>
                      <ToggleButton
                        name={`paye-${index}`}
                        checkedValue={rowsData[index].paye}
                        onChange={(value) => handleToggle(index, value)}
                      />
                       <TiDelete
                      style={{ color: "red", fontSize: "50px", cursor: "pointer" }}
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
  
  
export default PopupProvision;
