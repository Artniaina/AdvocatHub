import React from "react";
import Navbar from "../Components/Homepage/Navbar";
import ModifFicheAvocat from "../Components/HomeNavComp/ModifFicheAvocat";
import Welcome from "../Components/Homepage/Accueil/Welcome";

const FicheAvocatPage = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <ModifFicheAvocat />
    </>
  );
};

export default FicheAvocatPage;

