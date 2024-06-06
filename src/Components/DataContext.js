import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [avocatInfo, setAvocatInfo] = useState(null);
  const [etudeInfo, setEtudeInfo] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.10.5//Utilisateur/AvocatInfo/{idavocatpp}`)
      .then((response) => response.json())
      .then((data) => setAvocatInfo(data[0]))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);
  
  useEffect(() => {
    if (avocatInfo && avocatInfo.m_nidetude) {
      fetch(`http://192.168.10.5//Utilisateur/AvocatEtude/${avocatInfo.m_nidetude}`)
        .then((response) => response.json())
        .then((data) => setEtudeInfo(data[0]))
        .catch((error) =>
          console.error("Erreur lors de la récupération des données:", error)
        );
    }
  }, [avocatInfo]);

  return (
    <DataContext.Provider value={{ avocatInfo, etudeInfo }}>
      {children}
    </DataContext.Provider>
  );
};
