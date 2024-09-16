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
  const [editorContentObservation, setEditorContentObservation] = useState([]);
  const [editorContentPosition, setEditorContentPosition] = useState({});
  const [fileInfos, setFileInfos] = useState([]);

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
    c1: {},
    c2: {},
    c3: {},
    c4: {},
    c5: {},
    c6: {},
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
