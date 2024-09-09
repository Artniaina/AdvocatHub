import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/Popup.css";
import ToggleButton from "./ToggleButton";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoCloseCircle } from "react-icons/io5";

const PopupHonoraire = ({ onClose, onSubmit }) => {
  const [showOptions, setShowOptions] = useState({
    paye: "non",
  });
  const handleToggle = (field, value) => {
    setShowOptions((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="popupAffaire" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="closeButton">
          <IoCloseCircle />
        </button>
        <form onSubmit={handleSubmit}>
          <table className="domainTable">
            <tr>
              <th>Date*</th>
              <th>Référence</th>
              <th>Montant*</th>
              <th>Payée?</th>
            </tr>

            <tr>
              <td>
                <input type="date" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <ToggleButton
                  name="paye"
                  checkedValue={showOptions.paye}
                  onChange={(value) => handleToggle("paye", value)}
                />
              </td>  
               
            </tr>
          </table>
          <button type="submit" className="submitButton">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupHonoraire;
