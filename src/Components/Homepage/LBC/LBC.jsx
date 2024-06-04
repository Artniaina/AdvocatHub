import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import ContenuLBC from './ContenuLBC'
import Footer from '../Footer'

const LBC = () => {
  const location = useLocation();
  const isAuthenticated = true;
  
  return (
   <>
   <Navbar isAuthenticated={isAuthenticated}/>
   <ContenuLBC/>
   <Footer/>
   </>
  )
}

export default LBC