import React, { useState, useEffect } from 'react';
import '../../../../../Styles/TaxationForm/PopupDomaineJuridique.css'; 
import '../../../../../Styles/TaxationForm/Popup.css'; 
import { IoCloseCircle } from "react-icons/io5";

const PopupDomaineJuridique = ({ onClose, onSubmit, selectedDomains }) => {
  const [checkedDomains, setCheckedDomains] = useState(selectedDomains);
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

  useEffect(() => {
    setCheckedDomains(selectedDomains);
  }, [selectedDomains]);

  const handleCheckboxChange = (domain) => {
    setCheckedDomains((prev) => 
      prev.includes(domain) 
        ? prev.filter((item) => item !== domain) 
        : [...prev, domain]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(checkedDomains);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn"><IoCloseCircle /></button>
        <form onSubmit={handleSubmit} className="form">
          <table className="domain-table">
            <thead>
              <tr>
                <th className="table-header">Domaine Juridique</th>         
                <th className="table-header">Choix</th>
               
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain}>
                  <td className="table-cell">{domain}</td>
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={checkedDomains.includes(domain)}
                      onChange={() => handleCheckboxChange(domain)}
                      className="checkbox-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="submit-btn">Valider</button>
        </form>
      </div>
    </div>
  );
};

export default PopupDomaineJuridique;
