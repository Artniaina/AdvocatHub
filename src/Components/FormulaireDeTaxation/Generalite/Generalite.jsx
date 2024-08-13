import React from "react";
import Avocat from "./AvocatClients/Avocat";
import Clients from "./AvocatClients/Clients";
import "../../../Styles/TaxationForm/CardInfo.css";
import Collaborateurs from "./Collab-Prestataire/Collaborateurs";
import Prestataires from "./Collab-Prestataire/Prestataires";

const Generalite = () => {
  return (
    <>
    <div className="cardGeneralité">
    <div className="mainTitle" >GENERALITES</div>
      <Avocat />
      <Clients />
      <Collaborateurs/>
      <Prestataires/>
    </div>
    </>
  );
};

export default Generalite;
