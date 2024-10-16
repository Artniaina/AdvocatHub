import React from 'react';
import "../../Styles/PopUp/SuccessPopup.css";
import { MdOutlineAttachEmail } from "react-icons/md";

const NoteHonoraireWarning = ({  onGenerateAndSendPDF }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <div className="violet-top"></div>
        <div>
        <MdOutlineAttachEmail style={{fontSize:"35px", "color":"#6e1992"}}/>
        <p>Eeeeeeeeeee </p>
        <button className="success-popup-button" onClick={onGenerateAndSendPDF}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default NoteHonoraireWarning;
