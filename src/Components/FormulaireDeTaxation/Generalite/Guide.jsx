import React, { useState } from 'react';
import '../../../Styles/TaxationForm/Guide.css';
import { BsFillQuestionCircleFill } from "react-icons/bs";

const Popup = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="popup-trigger"
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    ><BsFillQuestionCircleFill style={{color:"blueviolet", fontSize:"45px", position:"absolute", left:"10px", top:"700px"}}/>
      {isHovered && (
        <div className="popup-content">
          <h4>AVOCAT (titulaire du dossier) :</h4>
          <p>ATTENTION : si le mandat est confié à une société d’avocat, ne pas oublier de cocher la case correspondante, à défaut la taxation sera rendue contre l’avocat nominativement.</p>
          
          <h4>CLIENT(S) :</h4>
          <ul>
            <li>Cliquez sur le plus + pour ajouter/créer un client.</li>
            <li>Ne pas omettre de cliquer sur « AJOUTER » pour pouvoir valider le client SINON il ne sera pas enregistré.</li>
            <li>Pour modifier une fiche client existante, cliquez sur l’icône « crayon ».</li>
            <li>Cliquez sur le bouton « Enregistrer ».</li>
          </ul>
          
          <h4>COLLABORATEUR(S) INSCRIT(S) OU NON INSCRIT(S) :</h4>
          <ul>
            <li>Cliquez sur le plus + pour ajouter/créer un collaborateur.</li>
            <li>L’avocat collaborateur ne doit pas omettre de se mentionner.</li>
            <li>Choisir le nom de l’avocat concerné.</li>
            <li>Cliquez sur le bouton « Enregistrer ».</li>
          </ul>
          
          <h4>PRESTATAIRE(S) EXTERIEUR :</h4>
          <ul>
            <li>Cliquez sur le plus + pour ajouter/créer un/plusieurs prestataire(s) extérieur(s).</li>
            <li>Ne pas omettre de cliquer sur « AJOUTER » pour pouvoir valider SINON il ne sera pas enregistré.</li>
            <li>Cliquez sur le bouton « Enregistrer ».</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Popup;
