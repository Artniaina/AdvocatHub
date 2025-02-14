import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import Logo from "../assets/icons8-palais-de-justice-64.png";
import "../Styles/Homepage/Navbar.css";
import { useAuth } from "../Hooks/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAvocatInfo } from "../Store/AvocatSlice";
import { FaUserCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const {
    setIsAuthenticated,
    setIsAdminAuthenticated,
    setIsSimpleAuthenticated,
  } = useAuth();

  const { user } = useAuth();

  const avocatInfo = useSelector((state) => state.avocat.avocatInfo) || {};
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(`'${user.email}'`));
    } else {
      console.log("User or User Email is not available.");
    }
  }, [dispatch, user]);

  const fullName = `${avocatInfo.m_sPrenom || ""} ${avocatInfo.m_sNom || ""}`;

  const handleLogout = () => {
    cookies.remove("COOKIE_SESSION", { path: "/" });
    setIsSimpleAuthenticated(false);
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
  };

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
              location.pathname.includes("/home") ? "active" : ""
            }`}
          >
            <AiFillHome className="icon-nav" />
            Accueil
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link
            to="/document"
            className={`nav-link ${
              location.pathname === "/document" ? "active" : ""
            }`}
          >
            <IoDocumentTextOutline className="icon-nav" />
            Documents
          </Link>
        </li> */}
        <li className="nav-item">
          <Link
            to="/planning"
            className={`nav-link ${
              location.pathname === "/planning" ? "active" : ""
            }`}
          >
            <IoNewspaperOutline className="icon-nav" />
            PLANNING{" "}
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link
            to="/chat"
            className={`nav-link ${
              location.pathname === "/lbc" ? "active" : ""
            }`}
          >
            <IoNewspaperOutline className="icon-nav" />
            Messagerie{" "}
          </Link>
        </li> */}
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
      <div className="navbar-user">
        <p className="txt">
          {fullName}
          <FaUserCircle className="nav-user" />
        </p>
        <button className="btn-nav" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
