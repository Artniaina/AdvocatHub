import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { FaBookBookmark } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import "../../Styles/Homepage/Acceuil/Welcome.css";

const HomeNav = () => {
  const location = useLocation();

  return (
    <nav className="home-nav">
      <ul className="home-navbar-nav">
        <li className="home-item">
          <Link to="/home" className="nav-link2">
          <IoHome className="icon-nav" />
            Modification fiche avocat
          </Link>
        </li>
        <li className="home-item">
          <Link to="/home" className="nav-link2">
          <IoHome className="icon-nav" />
            Certificat d'inscription
          </Link>
        </li>
        <li className="home-item">
          <Link to="/home" className="nav-link2">
            Changement d'étude
          </Link>
        </li>
        <li className="home-item">
          <Link to="/home" className="nav-link2">
            Formulaire de taxation
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
