import React from 'react';
import "../../Styles/PopUp/SuccessPopup.css";

const SuccessPopup = ({  onGenerateAndSendPDF }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <p>Success!</p>
        <button className="success-popup-button" onClick={onGenerateAndSendPDF}>OK</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
