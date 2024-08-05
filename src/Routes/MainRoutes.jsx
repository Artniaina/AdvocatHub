import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PartialProtectedRoute from "./PartialProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";

import Login from "../Pages/SimpleAuthentication/Login";
import Page404 from "../Pages/Page404";
import Registration from "../Pages/SimpleAuthentication/Registration";
import ModifMdp from "../Pages/SimpleAuthentication/ModifMdp";
import ScanQRCode from "../Pages/DoubleAuthentication/ScanQRCode";
import ValidationOTP from "../Pages/DoubleAuthentication/ValidationOTP";
import HomePage from "../Pages/HomePage";
import VerifEmail from "../Pages/SimpleAuthentication/VerifEmail";
import UserList from "../Components/AdminDashboard/UserList";
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
        pageTitle = "Articles";
        break;
      case "/userlist":
        pageTitle = "User list";
        break;
      case "/scanqrcode":
        pageTitle = "Two-factor-Authentication";
        break;
      case "/registration":
        pageTitle = "Inscription";
        break;
      case "/verifemail":
        pageTitle = "Email";
        break;
      case "/modifmdp":
        pageTitle = "Modification";
        break;
      case "/validationotp":
        pageTitle = "Two-factor-Authentication";
        break;
      default:
        pageTitle = "Page not found";
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
        //SIMPLE ROUTE EVERYONE CAN ACCESS WITHOUT BEING AUTHENTICATED
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verifemail" element={<VerifEmail />} />
        <Route path="/modifmdp" element={<ModifMdp />} />

        //PRIVATE ROUTE: ACCESSIBLE ONLY FOR ADMIN
        <Route element={<PrivateRoute />}>
          <Route exact path="/userlist" element={<UserList />} />
        </Route>

        //PARTIAL PROTECTED ROUTE: ACCESSIBLE WITHOUT 2FA AUTHENTICATION
        <Route element={<PartialProtectedRoute />}>
          <Route path="/validationotp" element={<ValidationOTP />} />
          <Route exact path="/scanqrcode" element={<ScanQRCode />} />
          <Route path="/home/modifFiche" element={<FicheAvocatPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/document" element={<Document />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/lbc" element={<LBC />} />
        </Route>
        
        //MAIN PROTECTED ROUTE: NEED AUTHENTICATION WITH 2FA
        <Route element={<ProtectedRoute />}>
        </Route>
      </Routes>
    </Router>
  );
}
export default MainRoutes;
