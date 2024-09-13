import React, { createContext, useState, useContext } from "react";

const GeneraliteContext = createContext();

export const GeneraliteProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  console.log("Client dans le context Tompoko", clientData);
  console.log("Collaborateur dans le context Tompoko", selectedAvocats);
  console.log("Prestatire dans le context Tompoko", prestataires);
  console.log("Domaine juridique hehe dans le context Tompoko", selectedDomains);

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
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
