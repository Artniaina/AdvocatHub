import React from "react";
import Navbar from "../Navbar";
import Acceuil from "./ContenuAcceuil";
import Footer from "../Footer"

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Acceuil/>
      <Footer/>
    </div>
  );
};
export default HomePage;
