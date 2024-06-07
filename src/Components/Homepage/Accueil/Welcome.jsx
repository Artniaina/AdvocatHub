import React from "react";
import Navbar from "../Navbar";
import "../../Styles/Homepage/Acceuil/Welcome.css";
import HomeNav from "./HomeNav";

const Welcome = ({avocatInfo}) => {
  const fullName=`${avocatInfo && avocatInfo.m_sPrenom} ${avocatInfo && avocatInfo.m_sNom} `

  return (
    <div className="mainContainerNav">
      <div>
        <p className="text1">Bienvenue</p>
        <p className="text2">
          Me {fullName} <br /> dans votre espace personnel
        </p>
      </div>
      <HomeNav />
    </div>
  );
};

export default Welcome;
