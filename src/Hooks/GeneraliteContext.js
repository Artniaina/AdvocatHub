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

  //Debug kely fa ts hay ze hanjo avy eo
  console.log("Editor contents updated:", editorContents);
  console.log(
    "Observation hehe dans le context Tompoko",
    editorContentObservation
  );
  console.log("Note de provision hehe dans le context Tompoko", provisionData);
  console.log("Note d'honoraire hehe dans le context Tompoko", honoraireData);
  console.log("Note d'honoraire hehe dans le context Tompoko", noteHonoraire);
  console.log("Client dans le context Tompoko", clientData);
  console.log("Collaborateur dans le context Tompoko", selectedAvocats);
  console.log("Prestatire dans le context Tompoko", prestataires);
  console.log(
    "Domaine juridique hehe dans le context Tompoko",
    selectedDomains
  );
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
