import React, { useState, useRef, useEffect } from "react";
import Editor from "../TextEditor/EditeurHTML";
import "../../../Styles/TaxationForm/CardInfo.css";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";
import PopupHTMLEditorWarning from "../TextEditor/PopupHTMLEditorWarning";
import { useUpdateDataContext } from "../../../Hooks/UpdatedDataContext";

const editors = [
  { id: "c1", label: <div style={{ textDecoration: "underline" }}>1) Mentionner les faits: *</div> },
  {
    id: "c2",
    label: (
      <>
        Enjeux de l'affaire* : <br />
        <span className="spanish">
          (par exemple : l’enjeu financier de l’affaire, l’importance et le
          degré de difficulté de l’affaire, reprise de mandat en cours de
          procédure, etc.)
        </span>
      </>
    ),
  },
  {
    id: "c3",
    label: (
      <>
        "Le(s) resultat(s) obtenu(s)*: <br />
        <span>
          (par exemple : revirement jurisprudentiel ou jurisprudence constante,
          résultat exceptionnel, autorisations ou agréments obtenus…)",
        </span>
      </>
    ),
  },
  {
    id: "c4",
    label: (
      <>
        "L'expérience et la notoriété de l'avocat*: <br />
        <span className="spanish">
          (par exemple : spécialisation en lien avec la matière traitée,
          expérience professionnelle, autre(s) activité(s) en lien avec la
          profession, publications/ouvrages…)",
        </span>
      </>
    ),
  },
  {
    id: "c5",
    label: (
      <>
        "La situation de fortune du client* : <br />
        <span className="spanish">
          (assistance judiciaire abordée et/ou sollicitée, estimation des
          revenus moyens du mandant, risque de faillite...)",
        </span>
      </>
    ),
  },
  {
    id: "c6",
    label: (
      <>
        "Le travail effectué (Merci de joindre les documents au dossier
        taxation):" <br />
        <span className="spanish">
          (prière de regrouper par types de prestations : par exemple
          correspondances, procédures, rédaction de documents, recherches,
          audiences,etc. et indiquer le temps mis en compte par catégories ainsi
          que le total des honoraires)
        </span>
      </>
    ),
  },
];

const CaseDescription = () => {
  const { editorContents, setEditorContents } = useUpdateDataContext();
  const [showWarnings, setShowWarnings] = useState({});
  const editorRefs = useRef({});

  useEffect(() => {
    editors.forEach(({ id }) => {
      editorRefs.current[id] = React.createRef();
    });
  }, []);

  const handleClickOutside = (event) => {
    let clickedOutsideAllEditors = true;

    editors.forEach(({ id }) => {
      if (editorRefs.current[id]?.current && editorRefs.current[id].current.contains(event.target)) {
        clickedOutsideAllEditors = false;
      }
    });

    if (clickedOutsideAllEditors) {
      editors.forEach(({ id }) => {
        const plainText = extractPlainText(editorContents[id] || "");
        
        if (plainText.length < 6 && plainText.trim() !== "") {
          setShowWarnings((prev) => ({ ...prev, [id]: true }));
        }
      });
    }
  };

  const handleEditorBlur = (id) => {
    const plainText = extractPlainText(editorContents[id] || "");
    
    if (plainText.length < 6 && plainText.trim() !== "") {
      setShowWarnings((prev) => ({ ...prev, [id]: true }));
    } else {
      setShowWarnings((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleEditorChange = (id, content) => {
    setEditorContents((prevContents) => ({
      ...prevContents,
      [id]: content,
    }));
  };

  const extractPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editorContents]);

  return (
    <div className="cardGeneralité" style={{ display: "block" }}>
      <div className="mainTitle">
        DESCRIPTION DE L'AFFAIRE ET DES PRESTATIONS
      </div>
      <div className="case">
        <h3>a) Description de l'affaire</h3>
        {editors.slice(0, 5).map(({ id, label }) => (
          <div key={id} ref={editorRefs.current[id]}>
            <p className="spanish">{label}</p>
            <Editor
              id={id}
              onChange={(content) => handleEditorChange(id, content)}
              onBlur={() => handleEditorBlur(id)} 
            />
            {showWarnings[id] && (
              <PopupHTMLEditorWarning 
                onClose={() => setShowWarnings((prev) => ({ ...prev, [id]: false }))}
                nomChamp={`champ ${id}`} 
              />
            )}
          </div>
        ))}
      </div>
      <div className="case">
        <h3>
          b) Le travail effectué (Merci de joindre les documents au dossier
          taxation)
        </h3>
        <p>
          (prière de regrouper par types de prestations : par exemple
          correspondances, procédures, rédaction de documents, recherches,
          audiences, etc. et indiquer le temps mis en compte par catégories
          ainsi que le total des honoraires)
        </p>
        {editors.slice(5).map(({ id, label }) => (
          <div key={id} ref={editorRefs.current[id]}>
            <Editor
              id={id}
              onChange={(content) => handleEditorChange(id, content)}
              onBlur={() => handleEditorBlur(id)} 
            />
            {showWarnings[id] && (
              <PopupHTMLEditorWarning 
                onClose={() => setShowWarnings((prev) => ({ ...prev, [id]: false }))}
                nomChamp={`champ`} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseDescription;