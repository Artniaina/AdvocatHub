import React from "react";
import Navbar from "../Navbar";
import Welcome from "./Welcome";
import Accueil from "./Accueil";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = location.state || {};
  navigate("/document", { state: { isAuthenticated: true } });
  console.log(isAuthenticated);
  console.log(location);

  return (
    <div>
      <Navbar />
      <Welcome />
      <Accueil />
    </div>
  );
};
export default HomePage;
