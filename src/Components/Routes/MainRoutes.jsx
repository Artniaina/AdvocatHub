import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Authentification/Login";
import Registration from "../Authentification/Registration";
import ModifMdp from "../Authentification/ModifMdp";
import DoubleAuth from "../Authentification/DoubleAuth";
import ProtectedRoute from "./ProtectedRoute";
import ValidationOTP from "../Authentification/ValidationOTP";
import HomePage from "../Homepage/Acceuil/HomePage";
import VerifEmail from "../Authentification/VerifEmail";
import UserList from "../AdminDashboard/UserList";
import PrivateRoute from "./PrivateRoute";
import FAQ from "../Homepage/FAQ/FAQ";
import LBC from "../Homepage/LBC/LBC";
import Document from "../Homepage/Document/Document";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

          <Route path="/home" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/document" element={<Document />} />
          <Route path="/lbc" element={<LBC />} />
        </Route>

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
