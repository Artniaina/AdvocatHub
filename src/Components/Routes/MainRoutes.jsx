import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "../Authentification/Login";
import Registration from "../Authentification/Registration";
import ModifMdp from "../Authentification/ModifMdp";
import DoubleAuth from "../Authentification/DoubleAuth";
import ProtectedRoute from "./ProtectedRoute";
import ValidationOTP from "../Authentification/ValidationOTP";
import HomePage from "../Homepage/Accueil/HomePage";
import VerifEmail from "../Authentification/VerifEmail";
import UserList from "../AdminDashboard/UserList";
import PrivateRoute from "./PrivateRoute";
import FAQ from "../Homepage/FAQ/FAQ";
import LBC from "../Homepage/LBC/LBC";
import Document from "../Homepage/Document/Document";

function PageTitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    let pageTitle = "";

    switch (pathname) {
      case "/":
        pageTitle = "Login";
        break;
      case "/home":
        pageTitle = "Page d'acceuil";
        break;
      case "/faq":
        pageTitle = "FAQ";
        break;
      case "/document":
        pageTitle = "Documents";
        break;
      case "/lbc":
        pageTitle = "LBC/FT";
        break;
      case "/userlist":
        pageTitle = "User list";
        break;
      case "/doubleAuth":
        pageTitle = "Scan QrCode";
        break;
      case "/registration":
        pageTitle = "Inscription";
        break;
      case "/verifemail":
        pageTitle = "Verification Email";
        break;
      case "/modifmdp":
        pageTitle = "Modification de mot de passe";
        break;
      case "/validationotp":
        pageTitle = "Validation OTP";
        break;
      default:
        pageTitle = "My app";
        break;
    }

    document.title = pageTitle;
  }, [location]);

  return null;
}

function MainRoutes() {
  return (
    <Router>
      <PageTitleUpdater />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/document" element={<Document />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/lbc" element={<LBC />} />
        {/* </Route> */}
        <Route exact path="/userlist" element={<PrivateRoute />}>
          <Route exact path="/userlist" element={<UserList />} />
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/doubleAuth" element={<DoubleAuth />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/verifemail" element={<VerifEmail />} />
        <Route path="/modifmdp" element={<ModifMdp />} />
        <Route path="/validationotp" element={<ValidationOTP />} />
      </Routes>
    </Router>
  );
}
export default MainRoutes;
