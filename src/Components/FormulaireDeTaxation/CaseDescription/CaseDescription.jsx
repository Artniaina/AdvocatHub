import React from "react";
import EditeurHTML from "./EditeurHTML";
import "../../../Styles/TaxationForm/CardInfo.css";

const CaseDescription = () => {
  return (
    <>
      <div className="cardGeneralité">
        <div className="mainTitle">DESCRIPTION DE L'AFFAIRE ET DES PRESTATIONS</div>
        <EditeurHTML/>
      </div>
    </>
  );
};

export default CaseDescription;
