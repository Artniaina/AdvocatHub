import React, { useState, useEffect } from 'react';
import FicheAvocat from './FicheAvocat';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvocatInfo } from '../../../Store/AvocatSlice';
import { useLocation } from 'react-router-dom';

const ModifFiche = () => {
  const dispatch = useDispatch();
  
  const location = useLocation();  
  const { email } = location.state || {}; 
  const [initialAvocat, setInitialAvocat] = useState([]);

  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);

  useEffect(() => {
    if (email) {
      dispatch(fetchAvocatInfo(`'${email}'`));
    }
  }, [email, dispatch]);

  useEffect(() => {
    if (avocatInfo) {
      setInitialAvocat(avocatInfo);
    }
  }, [avocatInfo]);

  return (
    <div>
      <FicheAvocat mode={"edit"} initialValue={initialAvocat} />
    </div>
  );
};

export default ModifFiche;
