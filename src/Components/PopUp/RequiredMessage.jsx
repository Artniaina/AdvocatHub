import React from 'react';
import "../../Styles/PopUp/SuccessPopup.css";
import { TiWarning } from "react-icons/ti";


const RequiredMessage = ({ onClose, nomChamp  }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <div className="violet-top"></div>
        <div>
        <TiWarning style={{fontSize:"35px", "color":"#6e1992"}}/>
        <p>Le champs {nomChamp} doivent-être rempli.</p>
        <button className="success-popup-button" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default RequiredMessage;
