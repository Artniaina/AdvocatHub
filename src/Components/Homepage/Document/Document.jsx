import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ContenuDoc from './ContenuDoc';

const Document = () => {
  const location = useLocation();
  const isAuthenticated = location.state && location.state.isAuthenticated;

  return (
    <>
      <Navbar />
      <ContenuDoc isAuthenticated={isAuthenticated} />
      <Footer />
    </>
  );
};

export default Document;
