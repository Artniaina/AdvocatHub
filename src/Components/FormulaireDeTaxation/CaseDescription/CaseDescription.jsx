import React from "react";
import Editor from "../TextEditor/EditeurHTML";
import "../../../Styles/TaxationForm/CardInfo.css";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";

const editors = [
  { id: "c1", label: "Mentionner les faits:" },
  {
    id: "c2",
    label:
      "Enjeux de l'affaire* : (par exemple : l’enjeu financier de l’affaire, l’importance et le degré de difficulté de l’affaire, reprise de mandat en cours de procédure, etc.)",
  },
  {
    id: "c3",
    label:
      "Le(s) resultat(s) obtenu(s)*: (par exemple : revirement jurisprudentiel ou jurisprudence constante, résultat exceptionnel, autorisations ou agréments obtenus…)",
  },
  {
    id: "c4",
    label:
      "L'expérience et la notoriété de l'avocat*: (par exemple : spécialisation en lien avec la matière traitée, expérience professionnelle, autre(s) activité(s) en lien avec la profession,publications/ouvrages…)",
  },
  {
    id: "c5",
    label:
      "La situation de fortune du client* : (assistance judiciaire abordée et/ou sollicitée, estimation des revenus moyens du mandant, risque de faillite...)",
  },
  {
    id: "c6",
    label:
      "Le travail effectué (Merci de joindre les documents au dossier taxation):",
  },
];

const CaseDescription = () => {
  const { editorContents, setEditorContents } = useGeneraliteContext();

  const handleEditorChange = (id, content) => {
    setEditorContents((prevContents) => ({
      ...prevContents,
      [id]: content,
    }));
  };

  return (
    <div className="cardGeneralité">
      <div className="mainTitle">
        DESCRIPTION DE L'AFFAIRE ET DES PRESTATIONS
      </div>
      <div className="case">
        <h3>a) Description de l'affaire</h3>
        {editors.slice(0, 5).map(({ id, label }) => (
          <div key={id}>
            <p>{label}</p>
            <Editor 
              id={id}
              onChange={(content) => handleEditorChange(id, content)}
            />
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
        {editors.slice(5).map(({ id }) => (
          <Editor
            key={id}
            id={id}
            onChange={(content) => handleEditorChange(id, content)}
          />
        ))}
      </div>
    </div>
  );
};

export default CaseDescription;
