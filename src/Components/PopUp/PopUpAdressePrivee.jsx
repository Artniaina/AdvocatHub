import React, { useRef, useEffect, useState } from 'react';
import { SlClose } from "react-icons/sl";
import "../../Styles/PopUp/AdressePriveePopUp.css";

const PopUpAdressePrivee = ({ onClose, onSubmit }) => {
  const overlayRef = useRef(null);
  const [adressePrivee, setAdressePrivee] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(adressePrivee);
    onClose();
  };

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="popup">
        <button className="closebtn" onClick={onClose}>
        <SlClose />
        </button>
        <div className="popup-content">
          <h3 className="pup">Adresse privée</h3>
          <textarea 
            name="adressePrivee" 
            id="adressePrivee" 
            value={adressePrivee}
            onChange={(e) => setAdressePrivee(e.target.value)}
          /> 
          <br />
          <button className="buttonPop" onClick={handleSubmit}>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpAdressePrivee;
