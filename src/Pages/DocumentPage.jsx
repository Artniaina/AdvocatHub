import React , {useContext} from "react";
import Navbar from "../Components/Homepage/Navbar";
import Footer from "../Components/Homepage/Footer";
import ContenuDoc from "../Components/Homepage/Document/ContenuDoc";

const Document = () => {

  return (
    <>
      <Navbar  />
      <ContenuDoc  />
      <Footer />
    </>
  );
};

export default Document;
