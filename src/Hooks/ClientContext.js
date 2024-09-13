
import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
console.log("Client dans le context Tompoko", clientData);

  return (
    <ClientContext.Provider value={{ clientData, setClientData }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
