import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchFormulaireById } from '../Store/TaxationFormSlice';
import Navbar from '../Components/Navbar';
import Intro from '../Components/ModificationFormulaireDeTaxation/Intro';
import Generalite from '../Components/ModificationFormulaireDeTaxation/Generalite/Generalite';
import CaseDescription from '../Components/ModificationFormulaireDeTaxation/CaseDescription/CaseDescription';
import Honoraires from '../Components/ModificationFormulaireDeTaxation/Honoraires/Honoraires';
import UploadFile from '../Components/ModificationFormulaireDeTaxation/UploadFile';
import PrisedePosition from '../Components/ModificationFormulaireDeTaxation/PrisedePosition';
import { useUpdateDataContext } from '../Hooks/UpdatedDataContext';

const UpdateTaxationFormPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formulaireId = location.state?.id;
  const { setFormulaire } = useUpdateDataContext();

  const { formulaire, status, error } = useSelector((state) => state.formulaire);

  useEffect(() => {
    if (formulaireId) {
      dispatch(fetchFormulaireById(formulaireId));
    }
  }, [dispatch, formulaireId]);

  useEffect(() => {
    if (formulaire.length > 0) {
      setFormulaire(formulaire); 
    }
  }, [formulaire, setFormulaire]); 

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
        <Generalite formulaire={formulaire || {}} /> 
      </div>
      <div>
        <CaseDescription formulaire={formulaire  || {}} /> 
      </div>
      <div>
        <Honoraires formulaire={formulaire || {}} /> 
      </div>
      <div>
        <PrisedePosition formulaire={formulaire || {}} /> 
      </div>
      <div>
        <UploadFile formulaire={formulaire || {}} /> 
      </div>
    </>
  );
};

export default UpdateTaxationFormPage;
