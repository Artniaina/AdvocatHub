import React, { useState } from "react";
import Editor from "../TextEditor/EditeurHTML";
import "../../../Styles/TaxationForm/CardInfo.css";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";

const CaseDescription = () => {
  const {editorContentC1, setEditorContentC1} = useGeneraliteContext();
  const {editorContentC2, setEditorContentC2} = useGeneraliteContext();
  const {editorContentC3, setEditorContentC3} = useGeneraliteContext();
  const {editorContentC4, setEditorContentC4} = useGeneraliteContext();
  const {editorContentC5, setEditorContentC5} = useGeneraliteContext();
  const {editorContentC6, setEditorContentC6} = useGeneraliteContext();

  const handleEditorChangeC1 = (id, content) => {
    setEditorContentC1((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };
  const handleEditorChangeC2 = (id, content) => {
    setEditorContentC2((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };
  const handleEditorChangeC3 = (id, content) => {
    setEditorContentC3((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };
  const handleEditorChangeC4 = (id, content) => {
    setEditorContentC4((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };
  const handleEditorChangeC5 = (id, content) => {
    setEditorContentC5((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
  };
  const handleEditorChangeC6 = (id, content) => {
    setEditorContentC6((prevContent) => ({
      ...prevContent,
      [id]: content,
    }));
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
              onChange={(content) => handleEditorChangeC1("editorC1", content)}
            />
          </div>
          <div>
            <p>
              {" "}
              Enjeux de l'affaire:* <br />
              (par exemple : l’enjeu financier de l’affaire, l’importance et le
              degré de difficulté de l’affaire, reprise de mandat en cours de
              procédure, etc.)
            </p>
            <Editor
              key="editorC2"
              id="editorC2"
              onChange={(content) => handleEditorChangeC2("editorC2", content)}
            />
          </div>
          <div>
            <p>
              Le(s) resultat(s) obtenu(s):* <br />
              (par exemple : revirement jurisprudentiel ou jurisprudence
              constante, résultat exceptionnel, autorisations ou agréments
              obtenus…)
            </p>
            <Editor
              key="editorC3"
              id="editorC3"
              onChange={(content) => handleEditorChangeC3("editorC3", content)}
            />
          </div>
          <div>
            <p>
              L'eperience et la notoriété de l'avocat:*
              <br />
              (par exemple : spécialisation en lien avec la matière traitée,
              expérience professionnelle, autre(s) activité(s) en lien avec la
              profession,publications/ouvrages…)
            </p>
            <Editor
              key="editorC4"
              id="editorC4"
              onChange={(content) => handleEditorChangeC4("editorC4", content)}
            />
          </div>
          <div>
            <p>
              La situation de fortune du client:*
              <br />
              (assistance judiciaire abordée et/ou sollicitée, estimation des
              revenus moyens du mandant, risque de faillite...)
            </p>
            <Editor
              key="editorC5"
              id="editorC5"
              onChange={(content) => handleEditorChangeC5("editorC5", content)}
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
            onChange={(content) => handleEditorChangeC6("editorC6", content)}
          />
        </div>
      </div>
    </>
  );
};

export default CaseDescription;
