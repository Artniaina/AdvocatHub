import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/PopUp/SuccessPopup.css";
import { MdOutlineAttachEmail } from "react-icons/md";

const SuccessPopup = ({ onGenerateAndSendPDF, content }) => {

  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <div className="violet-top"></div>
        <div>
          <MdOutlineAttachEmail
            style={{ fontSize: "35px", color: "#6e1992" }}
          />
          <p>Le {content} a été envoyé avec succès.</p>
          <button
            className="success-popup-button1"
            onClick={onGenerateAndSendPDF}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
