import React from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { FaBookBookmark } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import "../Styles/Homepage/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="logo" />
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/home"  className="nav-link">
            <IoHome className="icon-nav" />
            Acceuil
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/document"  className="nav-link">
            <IoDocumentTextSharp className="icon-nav" />
            Document
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/lbc" className="nav-link">
            <FaBookBookmark className="icon-nav" />
            LBC/FT
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/faq" className="nav-link">
            <TbDeviceIpadQuestion className="icon-nav" />
            FAQ
          </Link>
        </li>
      </ul>
      <div className="nav-user">
        <Link className="nav-user">
          <FaRegUserCircle />
        </Link>
        <button className="btn-nav">
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
