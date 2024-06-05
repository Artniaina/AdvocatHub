import React , {useContext} from "react";
import { AuthContext } from '../../AuthContext'
import Navbar from '../Navbar'
import ContenuLBC from './ContenuLBC'
import Footer from '../Footer'

const LBC = () => {
  const { authState } = useContext(AuthContext); 
  console.log(`lbc ${authState.isAuthenticated}`);

  return (
   <>
   <Navbar/>
   <ContenuLBC/>
   <Footer/>
   </>
  )
}

export default LBC