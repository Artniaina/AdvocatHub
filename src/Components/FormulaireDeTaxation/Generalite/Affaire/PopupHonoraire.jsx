import React, { useState, useEffect } from 'react';
import '../../../../Styles/TaxationForm/Popup.css'; 
import { IoCloseCircle } from "react-icons/io5";

const PopupHonoraire = ({ onClose, onSubmit }) => {
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onClose();
    };
    return (
        <div className="overlay" onClick={onClose}>
          <div className="popupAffaire" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="closeButton"><IoCloseCircle /></button>
            <form onSubmit={handleSubmit}>
              <table className="domainTable">
                <thead>
                  <tr>
                    <th>Domaine Juridique</th>
                    <th>Choix</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <button type="submit" className="submitButton">Valider</button>
            </form>
          </div>
        </div>
      );
    };


export default PopupHonoraire





 


