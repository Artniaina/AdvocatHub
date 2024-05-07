import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "../Authentification/Login";
import Registration from "../Authentification/Registration";
import Modifie from "../Authentification/VerifEmail";
import ModifMdp from "../Authentification/ModifMdp";
import DoubleAuth from "../Authentification/DoubleAuth";
import ProtectedRoute from "./ProtectedRoute";
import ValidationOTP from "../Authentification/ValidationOTP";
import HomePage from "../Homepage/HomePage";
import VerifEmail from "../Authentification/VerifEmail";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/home" element={<ProtectedRoute />}>
          <Route exact path="/home" element={<HomePage />} />
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
