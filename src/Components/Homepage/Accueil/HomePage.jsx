import { useData } from '../../DataContext';
import React from "react";
import Navbar from '../Navbar';
import Welcome from "./Welcome";
import Accueil from "./Accueil";

const HomePage = () => {
  const { avocatInfo, etudeInfo } = useData();
  console.log(avocatInfo);

  return (
    <div>
      <Navbar description={avocatInfo && avocatInfo.m_sNom + " " + avocatInfo.m_sPrenom} />
      <Welcome description={avocatInfo && avocatInfo.m_sNom + " " + avocatInfo.m_sPrenom} />
      <Accueil />
    </div>
  );
};

export default HomePage;
