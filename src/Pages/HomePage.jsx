import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvocatInfo, fetchEtudeInfo } from '../Store/AvocatSlice';
import Navbar from '../Components/Navbar';
import Welcome from "../Components/Homepage/Accueil/Welcome";
import Accueil from "../Components/Homepage/Accueil/Accueil";

const HomePage = () => {
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const etudeInfo = useSelector((state) => state.avocat.etudeInfo);
  const [email, setEmail] = useState(''); 
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://192.168.10.5/Utilisateur/UserIdByEmail?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user ID');
        }
        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    if (email) {
      fetchUserId();
    }
  }, [email]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAvocatInfo(userId));
    }
  }, [dispatch, userId]);


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
