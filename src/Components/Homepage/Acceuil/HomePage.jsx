import React from "react";
import Navbar from "../Navbar";
import Acceuil from "./ContenuAcceuil";
import Welcome from "./Welcome";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Acceuil />

    </div>
  );
};
export default HomePage;
