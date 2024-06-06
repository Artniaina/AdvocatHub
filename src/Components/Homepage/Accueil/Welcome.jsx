import React from "react";
import Navbar from "../Navbar";
import "../../Styles/Homepage/Acceuil/Welcome.css";
import HomeNav from "./HomeNav";
const Welcome = ({description}) => {

  return (
    <div className="mainContainerNav">
      <div>
        <p className="text1">Bienvenue</p>
        <p className="text2">
          <strong>{description}</strong> <br /> dans votre espace personnel
        </p>
      </div>
      <HomeNav />
    </div>
  );
};

export default Welcome;
