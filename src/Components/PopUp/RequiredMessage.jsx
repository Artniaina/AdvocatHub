import React from "react";
import "../../Styles/PopUp/SuccessPopup.css";
import { TiWarning } from "react-icons/ti";

const RequiredMessage = ({ onClose, nomChamp }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content2">
        <div className="violet-top2"></div>
        <div>
          <TiWarning style={{ fontSize: "35px", color: "#6e1992" }} />
          <p style={{fontSize:"20px"}}>Le champ {nomChamp} doit-être rempli.</p>

          <button className="warning-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequiredMessage;
