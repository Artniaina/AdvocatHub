import { AuthContext } from '../../AuthContext';
import React, { useContext, useEffect, useState } from "react";
import Navbar from '../Navbar';
import Welcome from "./Welcome";
import Accueil from "./Accueil";

const HomePage = () => {
  const [avocatInfo, setAvocatInfo] = useState(null);

  const { authState } = useContext(AuthContext); 
  console.log(`home ${authState.isAuthenticated}`);

  useEffect(() => {
    fetch("http://192.168.10.5//Utilisateur/AvocatInfo/{idavocatpp}")
      .then((response) => response.json())
      .then((data) => setAvocatInfo(data[0]))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  return (
    <div>
       
      <Navbar  description= {avocatInfo && avocatInfo.m_sNom+" "+avocatInfo.m_sPrenom} />
      <Welcome description= {avocatInfo && avocatInfo.m_sNom+" "+avocatInfo.m_sPrenom}/> 
      <Accueil />
    </div>
  );
};
export default HomePage;
