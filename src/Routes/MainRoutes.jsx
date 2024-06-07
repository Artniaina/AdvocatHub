import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "../Screens/Login";
import Registration from "../Screens/Registration";
import ModifMdp from "../Screens/ModifMdp";
import DoubleAuth from "../Screens/DoubleAuth";
import ProtectedRoute from "./ProtectedRoute";
import ValidationOTP from "../Screens/ValidationOTP";
import HomePage from "../Pages/HomePage";
import VerifEmail from "../Screens/VerifEmail";
import UserList from "../Components/AdminDashboard/UserList";
import PrivateRoute from "./PrivateRoute";
import FAQ from "../Pages/FAQPage";
import LBC from "../Pages/LBCPage";
import Document from "../Pages/DocumentPage";

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
        pageTitle = "Acceuil";
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
