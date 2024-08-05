import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvocatInfo, fetchEtudeInfo } from '../Store/AvocatSlice';
import Navbar from '../Components/Navbar';
import Welcome from "../Components/Homepage/Accueil/Welcome";
import Accueil from "../Components/Homepage/Accueil/Accueil";

const HomePage = () => {
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const etudeInfo = useSelector((state) => state.avocat.etudeInfo);
  const user = useSelector((state) => state.user.user); 

  useEffect(() => {
    if (user && user.email) {
      console.log("User Email:", user.email);
      dispatch(fetchAvocatInfo(user.email));
    } else {
      console.log("User or User Email is not available.");
    }
  }, [dispatch, user]);

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
