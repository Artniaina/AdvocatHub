import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAvocatInfo, fetchEtudeInfo } from "../Store/AvocatSlice";
import { useAuth } from "../Hooks/AuthContext";
import Navbar from "../Components/Navbar";
import ModifFicheAvocat from "../Components/Homepage/HomeNavComp/ModifFicheAvocat";
import Welcome from "../Components/Homepage/Accueil/Welcome";

const FicheAvocatPage = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const etudeInfo = useSelector((state) => state.avocat.etudeInfo);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(`'${user.email}'`));
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
    <>
      <Navbar />
      <Welcome avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
      <ModifFicheAvocat avocatInfo={avocatInfo} etudeInfo={etudeInfo} />
    </>
  );
};

export default FicheAvocatPage;
