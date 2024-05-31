import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { FaBookBookmark } from "react-icons/fa6";
import "../Styles/Homepage/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Logo
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link 
            to="/home"  
            className={`nav-link ${location.pathname === "/home" || location.pathname === "/home" ? "active" : ""}`}
          >
            <IoHome className="icon-nav" />
            Acceuil
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/document"  
            className={`nav-link ${location.pathname === "/document" ? "active" : ""}`}
          >
            <IoDocumentTextSharp className="icon-nav" />
            Document
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/lbc" 
            className={`nav-link ${location.pathname === "/lbc" ? "active" : ""}`}
          >
            <FaBookBookmark className="icon-nav" />
            LBC/FT
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/faq" 
            className={`nav-link ${location.pathname === "/faq" ? "active" : ""}`}
          >
            <TbDeviceIpadQuestion className="icon-nav" />
            FAQ
          </Link>
        </li>
      </ul>
      <div className="nav-user">
      <p></p>
          <FaRegUserCircle />
        <button className="btn-nav">
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
