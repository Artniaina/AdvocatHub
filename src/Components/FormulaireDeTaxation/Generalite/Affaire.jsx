import React, { useState } from 'react';
import '../../../Styles/TaxationForm/CardInfo.css'; 

const Affaire = () => {
  const [showOptions, setShowOptions] = useState(false);
  const handleToggle = (value) => {
    setShowOptions(value === 'oui');
  };

  return (
    <div>
      <div className="formGroup">
        <label htmlFor="formation">Domaine(s) juridique(s) * : </label>
        <textarea
          id="formation"
          readOnly
        />
      </div>
      <div className="formGroup">
        <label htmlFor="nomAffaire">Nom de l'affaire * : </label>
        <textarea
          id="nomAffaire"
          readOnly
        />
      </div>
      <div className="formGroup">
        <label htmlFor="dateDebut">Date de début du mandat * :</label>
        <input
          type="date"
          id="dateDebut"
          readOnly
        />
      </div>
      <div className="formGroup">
        <label htmlFor="dateFin">Date de fin du mandat * :</label>
        <input
          type="date"
          id="dateFin"
          readOnly
        />
      </div>

      <div className="formGroup">
        <div className="toggleButtons">
          <p>Une convention d’honoraires/lettre d’engagement a-t-elle été signée ?</p>
          <button 
            type="button" 
            className={`toggleButton ${showOptions ? 'active' : ''}`} 
            onClick={() => handleToggle('oui')}
          >
            Oui
          </button>
          <button 
            type="button" 
            className={`toggleButton ${!showOptions ? 'active' : ''}`} 
            onClick={() => handleToggle('non')}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
};

export default Affaire;
