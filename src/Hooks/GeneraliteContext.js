import React, { createContext, useState, useContext } from "react";

const GeneraliteContext = createContext();

export const GeneraliteProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [honoraireData, setHonoraireData] = useState([]);
  const [provisionData, setProvisionData] = useState([]);
  const [noteHonoraire, setNoteHonoraire] = useState([]);
  const [editorContentObservation, setEditorContentObservation] = useState([]);

  const [editorContents, setEditorContents] = useState({
    c1: {},
    c2: {},
    c3: {},
    c4: {},
    c5: {},
    c6: {},
  });

  const [textareaContents, setTextareaContents]=useState({
    nomAffaire:{},
    terme:{},
    tauxhoraire:{},
    affaireEnCours:{},
    conciliation:{},
    procedureRelative:{},
    procedureConservatoire:{},
    procedureMediation:{},
    mediationSurChoix:{},
  })

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
        honoraireData,
        setHonoraireData,
        provisionData,
        setProvisionData,
        noteHonoraire,
        setNoteHonoraire,
        editorContentObservation,
        setEditorContentObservation,
        editorContents,
        setEditorContents,
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
