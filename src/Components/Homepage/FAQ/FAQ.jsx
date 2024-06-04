import React from "react";
import { useLocation } from 'react-router-dom'
import Navbar from "../Navbar";
import Footer from "../Footer";
import ContenuFAQ from "./ContenuFAQ";

const FAQ = () => {
  const location = useLocation();
  const isAuthenticated = true;
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated}/>
      <ContenuFAQ />
      <Footer />
    </>
  );
};

export default FAQ;
