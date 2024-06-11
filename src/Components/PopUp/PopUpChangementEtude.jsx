import React from 'react'

const PopUpChangementEtude = ({ message, onClose }) => {
    return (
      <div className="overlay">
        <div className="popup">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    );
  };
  export default PopUpChangementEtude