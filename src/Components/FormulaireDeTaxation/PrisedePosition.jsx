import React, { useState, useRef, useEffect } from "react";
import Editor from "./TextEditor/EditeurHTML";
import "../../Styles/TaxationForm/CardInfo.css";
import { useGeneraliteContext } from "../../Hooks/GeneraliteContext";
import PopupHTMLEditorWarning from "./TextEditor/PopupHTMLEditorWarning";

const PrisedePosition = () => {
  const { editorContents, setEditorContents } = useGeneraliteContext();
  const [showWarning, setShowWarning] = useState(false);
  const priseDePosition = useRef(null);
  const [content, setContent] = useState("");

  const handleClosePopup = () => {
    setShowWarning(false);
  };

  const handleClickOutside = (event) => {
    if (priseDePosition.current && !priseDePosition.current.contains(event.target)) {
      const plainText = extractPlainText(content);

      if (plainText.length < 6 && plainText.trim() !== "") {
        setShowWarning(true);
      }
    }
  };

  const extractPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleEditorChange = (id, newContent) => {
    setContent(newContent);
    setEditorContents((prevContent) => ({
      ...prevContent,
      [id]: newContent,
    }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [content]);

  return (
    <div className="cardGeneralité" ref={priseDePosition} style={{ display: "block" }}>
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
      {showWarning && (
        <PopupHTMLEditorWarning 
          onClose={handleClosePopup} 
          nomChamp="prise de position" 
        />
      )}
    </div>
  );
};

export default PrisedePosition;
