
import React, { createContext, useState, useContext } from 'react';

const GeneraliteContext = createContext();

export const GeneraliteProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);
console.log("Client dans le context Tompoko", clientData);
console.log("Collaborateur dans le context Tompoko", selectedAvocats);

  return (
    <GeneraliteContext.Provider value={{ clientData, setClientData, selectedAvocats, setSelectedAvocats }}>
      {children}
    </GeneraliteContext.Provider>
  );
};

export const useGenerealiteContext = () => {
  return useContext(GeneraliteContext);
};
