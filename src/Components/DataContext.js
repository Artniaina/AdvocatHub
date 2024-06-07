import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [avocatInfo, setAvocatInfo] = useState(null);
  const [etudeInfo, setEtudeInfo] = useState(null);

  return (
    <DataContext.Provider value={{ avocatInfo, etudeInfo }}>
      {children}
    </DataContext.Provider>
  );
};
