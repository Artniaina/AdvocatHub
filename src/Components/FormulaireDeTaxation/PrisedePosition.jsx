import React, { useState } from "react";
import Editor from "./TextEditor/EditeurHTML";
import "../../Styles/TaxationForm/CardInfo.css";
import { useGeneraliteContext } from "../../Hooks/GeneraliteContext";

const PrisedePosition = () => {
  const { editorContents, setEditorContents } = useGeneraliteContext();

  const handleEditorChange = (id, content) => {
    setEditorContents((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };

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
          <Editor
            key="position"
            id="position"
            onChange={(content) => handleEditorChange("position", content)}
          />
        </div>
      </div>
    </>
  );
};

export default PrisedePosition;
