import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "../Pages/SimpleAuthentication/Login";
import Registration from "../Pages/SimpleAuthentication/Registration";
import ModifMdp from "../Pages/SimpleAuthentication/ModifMdp";
import DoubleAuth from "../Pages/DoubleAuthentication/DoubleAuth";
import ProtectedRoute from "./ProtectedRoute";
import ValidationOTP from "../Pages/DoubleAuthentication/ValidationOTP";
import HomePage from "../Pages/HomePage";
import VerifEmail from "../Pages/SimpleAuthentication/VerifEmail";
import UserList from "../Components/AdminDashboard/UserList";
import PrivateRoute from "./PrivateRoute";
import FAQ from "../Pages/FAQPage";
import LBC from "../Pages/LBCPage";
import Document from "../Pages/DocumentPage";
import FicheAvocatPage from "../Pages/FicheAvocatPage";


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
          pageTitle = "Accueil";
          break;
      case "/home/modifFiche":
        pageTitle = "Accueil";
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
        pageTitle = "My-app";
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
        <Route path="/registration" element={<Registration />} />
        <Route path="/verifemail" element={<VerifEmail />} />
        <Route path="/modifmdp" element={<ModifMdp />} />
        <Route path="/home/modifFiche" element={<FicheAvocatPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/document" element={<Document />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/lbc" element={<LBC />} />
        </Route>

        <Route exact path="/userlist" element={<PrivateRoute />}>
          <Route exact path="/userlist" element={<UserList />} />
        </Route>

        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/doubleAuth" element={<DoubleAuth />} />
          <Route path="/validationotp" element={<ValidationOTP />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default MainRoutes;
