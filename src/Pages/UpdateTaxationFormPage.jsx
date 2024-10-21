import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormulaireById } from '../Store/TaxationFormSlice';
import Navbar from '../Components/Navbar';
import Intro from '../Components/FormulaireDeTaxation/Intro';
import Generalite from '../Components/FormulaireDeTaxation/Generalite/Generalite';
import CaseDescription from '../Components/FormulaireDeTaxation/CaseDescription/CaseDescription';
import Honoraires from '../Components/FormulaireDeTaxation/Honoraires/Honoraires';
import UploadFile from '../Components/FormulaireDeTaxation/UploadFile';
import PrisedePosition from '../Components/FormulaireDeTaxation/PrisedePosition';

const UpdateTaxationFormPage = () => {
  const dispatch = useDispatch();
  const { formulaire, status, error } = useSelector((state) => state.formulaire);

  useEffect(() => {
    dispatch(fetchFormulaireById(451));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <Intro />
      <div>
        <Generalite formulaire={formulaire} /> 
      </div>
      <div>
        <CaseDescription formulaire={formulaire} /> 
      </div>
      <div>
        <Honoraires formulaire={formulaire} /> 
      </div>
      <div>
        <PrisedePosition formulaire={formulaire} />
      </div>
      <div>
        <UploadFile formulaire={formulaire} />
      </div>
    </>
  );
};

export default UpdateTaxationFormPage;
