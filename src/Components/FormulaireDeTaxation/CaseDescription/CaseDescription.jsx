import React, { useState } from "react";
import Editor from "../TextEditor/EditeurHTML";
import "../../../Styles/TaxationForm/CardInfo.css";

const CaseDescription = () => {
  const [editorContent, setEditorContent] = useState({});

  const handleEditorChange = (id, content) => {
    setEditorContent((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };

  const handleSubmit = () => {
    console.log(editorContent);
  };

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
            <Editor
              key="editorC1"
              id="editorC1"
              onChange={(content) => handleEditorChange("editorC1", content)}
            />
          </div>
          <div>
            <p> Enjeux de l'affaire:*</p>
            <Editor
              key="editorC2"
              id="editorC2"
              onChange={(content) => handleEditorChange("editorC2", content)}
            />
          </div>
          <div>
            <p>Le(s) resultat(s) obtenu(s):*</p>
            <Editor
              key="editorC3"
              id="editorC3"
              onChange={(content) => handleEditorChange("editorC3", content)}
            />
          </div>
          <div>
            <p>L'eperience et la notoriété de l'avocat:*</p>
            <Editor
              key="editorC4"
              id="editorC4"
              onChange={(content) => handleEditorChange("editorC4", content)}
            />
          </div>
          <div>
            <p>La situation de fortune du client:*</p>
            <Editor
              key="editorC5"
              id="editorC5"
              onChange={(content) => handleEditorChange("editorC5", content)}
            />
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

          <Editor
            key="editorC6"
            id="editorC6"
            onChange={(content) => handleEditorChange("editorC6", content)}
          />
        </div>
      </div>
    </>
  );
};

export default CaseDescription;
