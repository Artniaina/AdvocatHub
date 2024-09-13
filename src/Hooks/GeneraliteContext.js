import React, { createContext, useState, useContext } from "react";

const GeneraliteContext = createContext();

export const GeneraliteProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [honoraireData, setHonoraireData] = useState([]);
  const [provisionData, setProvisionData] = useState([]);

  //Debug kely fa ts hay ze hanjo avy eo
  console.log("Note d'honoraire hehe dans le context Tompoko", honoraireData);
  console.log("Note de provision hehe dans le context Tompoko", provisionData);
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
      }}
    >
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGeneraliteContext = () => {
  return useContext(GeneraliteContext);
};
