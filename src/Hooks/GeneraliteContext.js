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
  const [fileInfos, setFileInfos] = useState("");
  const [avocatsData, setAvocatsData] = useState([
    {
      nom: "",
      prenom: "",
      setude: "",
      adresseEtude: "",
      telephone: "",
      email: "",
      dateAssermentation: "",
      isSocieteChecked: "",
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
    observation: "",
    position: "",
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
  });

  const resetClientData = () => setClientData([]);
  const resetSelectedAvocats = () => setSelectedAvocats([]);
  const resetPrestataires = () => setPrestataires([]);
  const resetSelectedDomains = () => setSelectedDomains([]);
  const resetMontantData = () => setMontantData([]);
  const resetHonoraireData = () => setHonoraireData([]);
  const resetProvisionData = () => setProvisionData([]);
  const resetNoteHonoraire = () => setNoteHonoraire([]);
  const resetFileInfos = () => setFileInfos("");
  const resetFormData = () => setFormData({
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
  const resetEditorContents = () => setEditorContents({
    observation: "",
    position: "",
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
  });

  const resetAllData = () => {
    resetClientData();
    resetSelectedAvocats();
    resetPrestataires();
    resetSelectedDomains();
    resetMontantData();
    resetHonoraireData();
    resetProvisionData();
    resetNoteHonoraire();
    resetFileInfos();
    resetFormData();
    resetEditorContents();
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
        avocatsData,
        setAvocatsData,
        noteHonoraire,
        setNoteHonoraire,
        editorContents,
        setEditorContents,
        fileInfos,
        setFileInfos,
        formData,
        setFormData,
        resetAllData,
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
