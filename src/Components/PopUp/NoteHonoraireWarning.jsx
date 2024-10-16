import React from 'react';
import "../../Styles/PopUp/SuccessPopup.css";
import { MdOutlineAttachEmail } from "react-icons/md";

const NoteHonoraireWarning = ({  date, amount, reference, onClose}) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <div className="violet-top"></div>
        <div>
        <MdOutlineAttachEmail style={{fontSize:"35px", "color":"#6e1992"}}/>
        <p>
        Vous devez saisir les détails de la/des note(s) d'honoraires contestées suivante(s) dans la section HONORAIRES : </p>
       <p>
      - Date: {date}<br />
        Reference: {reference} <br />
        Montant: {amount}
       </p>
        <button className="success-popup-button" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default NoteHonoraireWarning;
