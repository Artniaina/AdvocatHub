import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { fetchAvocatInfo, fetchEtudeInfo } from '../Store/AvocatSlice';
import Navbar from '../Components/Homepage/Navbar';
import Welcome from "../Components/Homepage/Accueil/Welcome";
import Accueil from "../Components/Homepage/Accueil/Accueil";

const HomePage = () => {
  const location = useLocation(); 
  const { isAdminAuthenticated, isAuthenticated } = location.state || {};
  
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
    <div>
      <Navbar avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <Welcome avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <Accueil avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
    </div>
  );
};

export default HomePage;
