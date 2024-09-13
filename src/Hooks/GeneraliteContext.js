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
  const [editorContentObservation, setEditorContentObservation] = useState({});
  const [editorcontentC1, setEditorcontentC1] = useState({});
  const [editorcontentC2, setEditorcontentC2] = useState({});
  const [editorcontentC3, setEditorcontentC3] = useState({});
  const [editorcontentC4, setEditorcontentC4] = useState({});
  const [editorcontentC5, setEditorcontentC5] = useState({});
  const [editorcontentC6, setEditorcontentC6] = useState({});

  //Debug kely fa ts hay ze hanjo avy eo
  // console.log("Observation hehe dans le context Tompoko", editorContentObservation);
  // console.log("Note de provision hehe dans le context Tompoko", provisionData);
  // console.log("Note d'honoraire hehe dans le context Tompoko", honoraireData);
  // console.log("Note d'honoraire hehe dans le context Tompoko", noteHonoraire);
  // console.log("Client dans le context Tompoko", clientData);
  // console.log("Collaborateur dans le context Tompoko", selectedAvocats);
  // console.log("Prestatire dans le context Tompoko", prestataires);
  // console.log(
  //   "Domaine juridique hehe dans le context Tompoko",
  //   selectedDomains
  // );

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
        editorcontentC1,
        setEditorcontentC1,
        editorcontentC2,
        setEditorcontentC2,
        editorcontentC3,
        setEditorcontentC3,
        editorcontentC4,
        setEditorcontentC4,
        editorcontentC5,
        setEditorcontentC5,
        editorcontentC6,
        setEditorcontentC6,
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
