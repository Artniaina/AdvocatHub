import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { fetchAvocatInfo, fetchEtudeInfo } from '../Store/AvocatSlice';
import Navbar from "../Components/Homepage/Navbar";
import ModifFicheAvocat from "../Components/HomeNavComp/ModifFicheAvocat";
import Welcome from "../Components/Homepage/Accueil/Welcome";
import { FaCheck } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";

const FicheAvocatPage = () => {
  const location = useLocation(); 
  const { isAdminAuthenticated, isAuthenticated } = location.state || {};
  console.log(`Homepage : ${isAuthenticated}`);
  
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const etudeInfo = useSelector((state) => state.avocat.etudeInfo);

  useEffect(() => {
    dispatch(fetchAvocatInfo(3));
  }, [dispatch]);

  useEffect(() => {
    if (avocatInfo && avocatInfo.m_nidetude) {
      dispatch(fetchEtudeInfo(avocatInfo.m_nidetude));
    }
  }, [dispatch, avocatInfo]);

  return (
    <>
       <Navbar avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
       <Welcome avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <ModifFicheAvocat avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <div style={{textAlign:"end"}}>

      <button className='btnsub'><FiMinusCircle />Annuler</button>
      <button className='btnsub'><FaCheck />Enregistrer</button>
      </div>
    </>
  );
};

export default FicheAvocatPage;

