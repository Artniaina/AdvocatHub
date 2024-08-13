import React from 'react'
import Navbar from '../Components/Navbar'
import Intro from '../Components/FormulaireDeTaxation/Intro'
import Generalite from '../Components/FormulaireDeTaxation/Generalite/Generalite'
import Affaire from '../Components/FormulaireDeTaxation/Generalite/Affaire'
import Collaborateurs from '../Components/FormulaireDeTaxation/Generalite/Collab-Prestataire/Collaborateurs'
import CaseDescription from '../Components/FormulaireDeTaxation/CaseDescription/CaseDescription'
import Honoraires from '../Components/FormulaireDeTaxation/Honoraires/Honoraires'
import UploadFile from '../Components/FormulaireDeTaxation/UploadFile'

const TaxationFormPage = () => {
  return (
    <>
    <Navbar/>
    <Intro/>
    <div>
    <Generalite/>
    <Collaborateurs/>
    <Affaire/>
    </div>
    <div>
    <CaseDescription/>
    </div>
    <div>
    <Honoraires/>
    </div>
    <div>
    <UploadFile/>
    </div>
    </>
  )
}

export default TaxationFormPage