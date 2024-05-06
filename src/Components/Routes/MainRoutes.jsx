import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "../Authentification/Login";
import Home from "../Home";
import Registration from "../Authentification/Registration";
import Modifie from "../Authentification/Modifie";
import ModifMdp from "../Authentification/ModifMdp";
import DoubleAuth from "../Authentification/DoubleAuth";
import ProtectedRoute from "./ProtectedRoute";
import QrScan from "../Authentification/QrScan";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/home" element={<ProtectedRoute />}>
          <Route exact path="/home" element={<Home />} />
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/doubleAuth" element={<DoubleAuth />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/modifie" element={<Modifie />} />
        <Route path="/modifmdp" element={<ModifMdp />} />
        <Route path="/qrscan" element={<QrScan />} />
      </Routes>
    </Router>
  );
}
export default MainRoutes;
