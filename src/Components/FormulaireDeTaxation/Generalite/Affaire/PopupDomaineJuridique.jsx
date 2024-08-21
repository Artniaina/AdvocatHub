import React, { useState } from 'react';
import '../../../../Styles/TaxationForm/Popup.css'; 

const PopupDomaineJuridique = ({ onClose, onSubmit }) => {
  const [selectedDomains, setSelectedDomains] = useState([]);

  const domains = [
    'Droit fiscal',
    'Droit de la construction et de l’immobilier',
    'Droit de la sécurité sociale',
    'Droit des assurances',
    'Droit bancaire',
    'Droit de la propriété intellectuelle',
    'Droit de la presse',
    'Droit de l’environnement',
    'Fonds d’investissement',
    'Recouvrement de créances',
    'Successions et libéralités',
    'Tutelles/curatelles'
  ];

  const handleCheckboxChange = (domain) => {
    setSelectedDomains((prev) => 
      prev.includes(domain) 
        ? prev.filter((item) => item !== domain) 
        : [...prev, domain]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedDomains);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popupDomaineJuridique" onClick={(e) => e.stopPropagation()}>
        <h2>Domaines Juridiques</h2>
        <form onSubmit={handleSubmit}>
          {domains.map((domain) => (
            <div key={domain} className="domainItem">
              <label>
                <input
                  type="checkbox"
                  checked={selectedDomains.includes(domain)}
                  onChange={() => handleCheckboxChange(domain)}
                />
                {domain}
              </label>
            </div>
          ))}
          <button type="submit" className="submitButton">Submit</button>
        </form>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default PopupDomaineJuridique;
