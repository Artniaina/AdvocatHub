import React from "react";
import { Link, useLocation } from "react-router-dom";
import document from "../../../assets/icons8-document-64(1).png";
import formulaire from "../../../assets/icons8-formulaire-64 (2).png";
import modif from "../../../assets/icons8-liste-presse-papiers-64.png";
import etude from "../../../assets/icons8-configuration-du-projet-64.png";
import "../../Styles/Homepage/Acceuil/Welcome.css";


const HomeNav = () => {
  const location = useLocation();

  return (
    <nav className="home-nav">
      <ul className="home-navbar-nav">
        <li className="home-item">
          <Link to="/home" className="nav-link2">
            <img src={modif} />
            Modification fiche avocat
          </Link>
        </li>
        <li className="home-item">
          <Link to="/home" className="nav-link2">
      
            <img src={document} />
            Certificat d'inscription
          </Link>
        </li>
        <li className="home-item">
          <Link to="/home" className="nav-link2">
            <img src={etude} />
            Changement d'étude
          </Link>
        </li>
        <li className="home-item">
          <Link to="/home" className="nav-link2">
            <img src={formulaire} />
            Formulaire de taxation
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
