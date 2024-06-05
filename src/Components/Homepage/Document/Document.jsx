import React , {useContext} from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ContenuDoc from "./ContenuDoc";
import { AuthContext } from "../../AuthContext";

const Document = () => {
  const { authState } = useContext(AuthContext); 
  console.log(`doc ${authState.isAuthenticated}`);
  return (
    <>
      <Navbar  />
      <ContenuDoc  />
      <Footer />
    </>
  );
};

export default Document;
