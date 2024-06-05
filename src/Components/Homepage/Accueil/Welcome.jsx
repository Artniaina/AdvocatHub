import React from "react";
import Navbar from "../Navbar";
import "../../Styles/Homepage/Acceuil/Welcome.css";
import HomeNav from "./HomeNav";
const Welcome = () => {
  return (
    <div className="mainContainerNav">
      <div>
        <p className="text1">Bienvenue</p>
        <p className="text2">
          <strong>Votre nom</strong> <br /> dans votre espace personnel
        </p>
      </div>
      <HomeNav />
    </div>
  );
};

export default Welcome;
