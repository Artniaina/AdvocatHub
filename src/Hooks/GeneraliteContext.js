import React, { createContext, useState, useContext } from "react";

const GeneraliteContext = createContext();

export const GeneraliteProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [montantData, setMontantData] = useState([]);
  const [honoraireData, setHonoraireData] = useState([]);
  const [provisionData, setProvisionData] = useState([]);
  const [noteHonoraire, setNoteHonoraire] = useState([]);
  const [editorContentObservation, setEditorContentObservation] = useState("");
  const [editorContentPosition, setEditorContentPosition] = useState("");
  const [fileInfos, setFileInfos] = useState("");

  const [formData, setFormData] = useState({
    domaine: [],
    honoraire: [],
    provision: [],
    montant: [],
    nomAffaire: "",
    termesHonoraires: "",
    absenceTerm: "",
    datecontest: "",
    dateDebut: "",
    dateFin: "",
    etatAvancement: "",
    conserv: "",
    mediation: "",
    relative: "",
    conciliation: "",
    mediationChoix: "non",
  });

  const [editorContents, setEditorContents] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
  });

  const prepareDataToSend = () => {
    const data = {
      editorContents,
      clientData,
      selectedAvocats,
      prestataires,
      selectedDomains,
      montantData,
      provisionData,
      honoraireData,
      noteHonoraire,
      editorContentObservation,
      editorContentPosition,
      fileInfos,
      formData,
    };

    console.log("Data to send (JSON):", JSON.stringify(data, null, 2));
    const jsonToSend ={
    "sIDDomaineJuridique": formData.domaine,
    "sDomaineJuridique":formData.domaine,
    "sNomAffaire": formData.nomAffaire,
    "sTermesHonoraires": formData.termesHonoraires,
    "sAbsenceTermes": formData.absenceTerm,
    "sDateContestation":formData.datecontest,
    "sDateDebutMandat": formData.dateDebut,
    "sDateFinMandat": formData.dateFin,
    "sEtatAvancement": formData.etatAvancement,
    "sMesureConservatoire": formData.conserv,
    "sMediation": formData.mediation,
    "sMediationChox":formData.mediationChoix ,
    "sConciliation": formData.conciliation,
    "sProcedureRelative": formData.relative,
    "sObservations":editorContentObservation ,
    "sPositionAvocat":editorContentPosition,
    "sContenu1":editorContents.c1,
    "sContenu2":editorContents.c2 ,
    "sContenu3":editorContents.c3 ,
    "sContenu4":editorContents.c4,
    "sContenu5":editorContents.c5,
    "sContenu6":editorContents.c6,
    "sMontant": montantData,
    "sNoteHonoraire": noteHonoraire,
    "sHonoraire":honoraireData,
    "sProvision":provisionData ,
    "sPrestataireData": prestataires,
    "sClientsData": clientData,
    // "sSubmited_at": "string"
}
    return data;
  };

  return (
    <GeneraliteContext.Provider
      value={{
        clientData, 
        setClientData,
        selectedAvocats,
        setSelectedAvocats,
        prestataires,
        setPrestataires,
        selectedDomains,
        setSelectedDomains,
        montantData,
        setMontantData,
        honoraireData,
        setHonoraireData,
        provisionData,
        setProvisionData,
        noteHonoraire,
        setNoteHonoraire,
        editorContentObservation,
        setEditorContentObservation,
        editorContentPosition,
        setEditorContentPosition,
        editorContents,
        setEditorContents,
        fileInfos,
        setFileInfos,
        formData,
        setFormData,
        prepareDataToSend,
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
