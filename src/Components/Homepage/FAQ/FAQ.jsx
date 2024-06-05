
import React, { useContext } from "react";
import { AuthContext } from '../../AuthContext';
import Navbar from "../Navbar";
import Footer from "../Footer";
import ContenuFAQ from "./ContenuFAQ";

const FAQ = () => {
  const { authState } = useContext(AuthContext); 
  console.log(`faq ${authState.isAuthenticated}`);

  return (
    <>
      <Navbar />
      <ContenuFAQ />
      <Footer />
    </>
  );
};

export default FAQ;
