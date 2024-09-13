import React from "react";
import Editor from "../TextEditor/EditeurHTML";
import "../../../Styles/TaxationForm/CardInfo.css";

const CaseDescription = () => {
  return (
    <>
      <div className="cardGeneralité">
        <div className="mainTitle">
          DESCRIPTION DE L'AFFAIRE ET DES PRESTATIONS
        </div>
        <div className="case">
          <h3>a) Description de l'affaire</h3>
          <div>
          <p>1) Mentionner les faits:*</p>
          <Editor key="editorC1" id="editorC1"/>
          </div>
          <div>
          <p> Enjeux de l'affaire:*</p>
          <Editor key="editorC2" id="editorC2"/>
          </div>
          <div>
          <p>Le(s) resultat(s) obtenu(s):*</p>
          <Editor key="editorC3" id="editorC3"/>
          </div>
          <div>
          <p>L'eperience et la notoriété de l'avocat:*</p>
          <Editor key="editorC4" id="editorC4"/>
          </div>
          <div>
          <p>La situation de fortune du client:*</p>
          <Editor key="editorC5" id="editorC5"/>
          </div>
        </div>
        <div className="case">
          <h3>
            b) Le travail effectué (Merci de joindre les documents au dossier
            taxation)*
          </h3>
          <p>
            (prière de regrouper par types de prestations : par exemple
            correspondances, procédures, rédaction de documents, recherches,
            audiences,etc. et indiquer le temps mis en compte par catégories
            ainsi que le total des honoraires)
          </p>

          
          <Editor key="editorC6" id="editorC6"/>
          </div>
      </div>
    </>
  );
};

export default CaseDescription;
