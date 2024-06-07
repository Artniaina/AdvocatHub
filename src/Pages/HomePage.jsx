import React, { useState, useEffect } from "react";
import Navbar from '../Components/Homepage/Navbar';
import Welcome from "../Components/Homepage/Accueil/Welcome";
import Accueil from "../Components/Homepage/Accueil/Accueil";

const HomePage = () => {
  const [avocatInfo, setAvocatInfo] = useState(null);
  const [etudeInfo, setEtudeInfo] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.10.5/Utilisateur/AvocatInfo/3`)
      .then((response) => response.json())
      .then((data) => setAvocatInfo(data[0]))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);
  
  useEffect(() => {
    if (avocatInfo && avocatInfo.m_nidetude) {
      fetch(`http://192.168.10.5/Utilisateur/AvocatEtude/${avocatInfo.m_nidetude}`)
        .then((response) => response.json())
        .then((data) => setEtudeInfo(data[0]))
        .catch((error) =>
          console.error("Erreur lors de la récupération des données:", error)
        );
    }
  }, [avocatInfo]);

  return (
    <div>
      <Navbar avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <Welcome avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <Accueil avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
    </div>
  );
};

export default HomePage;
