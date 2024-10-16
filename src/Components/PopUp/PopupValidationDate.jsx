import React from "react";
import "../../Styles/PopUp/SuccessPopup.css";
import { TiWarning } from "react-icons/ti";

const PopupValidationDate = ({ onClose, nomChamp }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content2">
        <div className="violet-top2"></div>
        <div>
          <TiWarning style={{ fontSize: "35px", color: "#6e1992" }} />
          <p style={{fontSize:"20px"}}>La date de contestation des honoraires doit être inférieure ou égale à la date du jour.</p>

          <button className="warning-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupValidationDate;
