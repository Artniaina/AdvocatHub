import React from "react";
import Editor from "./TextEditor/EditeurHTML";
import "../../Styles/TaxationForm/CardInfo.css";

const PrisedePosition = () => {
  return (
    <>
      <div className="cardGeneralité" style={{ display: "block" }}>
        <div className="mainTitle">PRISE DE POSITION DE L'AVOCAT</div>
        <p>
          (au regard des contestations du client, de la facturation réalisée, du
          taux horaire appliqué, l’implication du client dans le traitement du
          dossier. Merci de mentionner ici tout ce qui peut aider le taxateur
          dans son appréciation du dossier et ce qu’il vous parait important à
          souligner)
        </p>
        <div>
            <Editor key="editor2" id="editor2"/>
        </div>
      </div>
    </>
  );
};

export default PrisedePosition;
