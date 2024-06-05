import { AuthContext } from '../../AuthContext';
import React, { useContext } from "react";
import Navbar from "../FAQ/FAQ";
import Welcome from "./Welcome";
import Accueil from "./Accueil";

const HomePage = () => {
  const { authState } = useContext(AuthContext); 
  console.log(`home ${authState.isAuthenticated}`);
  return (
    <div>
      <Navbar   />
      <Welcome /> 
      <Accueil />
    </div>
  );
};
export default HomePage;
