import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import Logo from "../../assets/icons8-palais-de-justice-64.png";
import { AiFillHome } from "react-icons/ai";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import "../Styles/Homepage/Navbar.css";
import { IoNewspaperOutline } from "react-icons/io5";

const Navbar = ({ avocatInfo }) => {
  const location = useLocation();
  const fullName = `${avocatInfo && avocatInfo.m_sPrenom} ${
    avocatInfo && avocatInfo.m_sNom
  } `;

  console.log();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/home"
            className={`nav-link ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            <AiFillHome className="icon-nav" />
            Accueil
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/document"
            className={`nav-link ${
              location.pathname === "/document" ? "active" : ""
            }`}
          >
            <IoDocumentTextOutline className="icon-nav" />
            Documents
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/lbc"
            className={`nav-link ${
              location.pathname === "/lbc" ? "active" : ""
            }`}
          >
            <IoNewspaperOutline className="icon-nav" />
            LBC/FT
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/faq"
            className={`nav-link ${
              location.pathname === "/faq" ? "active" : ""
            }`}
          >
            <TbDeviceIpadQuestion className="icon-nav" />
            FAQ
          </Link>
        </li>
      </ul>
      <div>
        <p className="txt">
          {fullName}
          <FaRegUserCircle className="nav-user" />
        </p>
        <button className="btn-nav">Déconnexion</button>
      </div>
    </nav>
  );
};

export default Navbar;
