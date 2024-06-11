import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import document from "../../../assets/icons8-document-64(1).png";
import formulaire from "../../../assets/icons8-formulaire-64 (2).png";
import modif from "../../../assets/icons8-liste-presse-papiers-64.png";
import etude from "../../../assets/icons8-configuration-du-projet-64.png";
import "../../../Styles/Homepage/Acceuil/Welcome.css";
import "../../../Styles/Homepage/Acceuil/PopUp.css";
import PopUpCertifIcatdInscri from "../../PopUp/PopUpCertifIcatdInscri";
import PopUpChangementEtude from "../../PopUp/PopUpChangementEtude";

const HomeNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEtudePopup, setShowEtudePopup] = useState(false);
  const [showDocumentPopup, setShowDocumentPopup] = useState(false);

  const handleEtudeClick = () => {
    setShowEtudePopup(true);
  };

  const handleDocumentClick = () => {
    setShowDocumentPopup(true);
  };

  const closeEtudePopup = () => {
    setShowEtudePopup(false);
  };

  const closeDocumentPopup = () => {
    setShowDocumentPopup(false);
  };

  return (
    <nav className="home-nav">
      <ul className="home-navbar-nav">
        <li className="home-item">
          <button onClick={() => navigate("/home/modifFiche")} className="nav-link2">
            <img src={modif} alt="Modification fiche avocat" />
            <br />
            Modification fiche avocat
          </button>
        </li>
        <li className="home-item">
          <button className="nav-link2" onClick={handleDocumentClick}>
            <img src={document} alt="Certificat d'inscription" />
            <br />
            Certificat d'inscription
          </button>
          {showDocumentPopup && (
            <PopUpCertifIcatdInscri
              message="Le certificat d'inscription sera affiché ici."
              onClose={closeDocumentPopup}
            />
          )}
        </li>
        <li className="home-item">
          <button className="nav-link2" onClick={handleEtudeClick}>
            <img src={etude} alt="Changement d'étude" />
            <br />
            Changement d'étude
          </button>
          {showEtudePopup && (
            <PopUpChangementEtude
              message="Le changement d'étude sera affiché ici."
              onClose={closeEtudePopup}
            />
          )}
        </li>
        <li className="home-item">
          <button className="nav-link2">
            <img src={formulaire} alt="Formulaire de taxation" />
            <br />
            Formulaire de taxation
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
