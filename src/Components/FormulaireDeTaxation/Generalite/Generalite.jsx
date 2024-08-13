import React from "react";
import Avocat from "./Avocat";
import Clients from "./Clients";
import "../../../Styles/TaxationForm/CardInfo.css";

const Generalite = () => {
  return (
    <>
    <div className="cardGeneralité">
    <div className="mainTitle" >GENERALITES</div>
      <Avocat />
      <Clients />
    </div>
    </>
  );
};

export default Generalite;
