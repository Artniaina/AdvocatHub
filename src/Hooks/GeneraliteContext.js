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
  const [avocatsData, setAvocatsData] = useState([
    {
      nom: "",
      prenom:"",
      etude:"",
      adresseEtude:"",
      telephone:"",
      email:"",
      dateAssermentation:"",
      isSocieteChecked:"",
    },
  ]);

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
        avocatsData,
        setAvocatsData,
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
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
