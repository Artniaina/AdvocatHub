import React from 'react';
import '../../Styles/PopUp/Confirmation.css';

const PopUpAnnuler = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="popup-content">
          <p>Hello</p>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpAnnuler;
