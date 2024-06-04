import React from "react";
import Navbar from "../Navbar";
import Welcome from "./Welcome";
import Accueil from "./Accueil";
import {  useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const isAuthenticated = location.state && location.state.isAuthenticated;
  console.log(isAuthenticated);
  
  return (
    <div>
      <Navbar  isAuthenticated={isAuthenticated} />
      <Welcome /> 

      <Accueil />
    </div>
  );
};
export default HomePage;
