import React from 'react';
import "../../Styles/PopUp/SuccessPopup.css";
import { MdOutlineAttachEmail } from "react-icons/md";
const SuccessPopup = ({  onGenerateAndSendPDF }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <div className="violet-top"></div>
        <div>
        <MdOutlineAttachEmail style={{fontSize:"35px", "color":"#6e1992"}}/>
        <p>Le certificat a été envoyé avec succès.</p>
        <button className="success-popup-button" onClick={onGenerateAndSendPDF}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
