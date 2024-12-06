import React, { useRef } from 'react'
import Navbar from '../Components/Navbar'
import Intro from '../Components/TaxationOrdinaire/FormulaireDeTaxation/Intro'
import Generalite from '../Components/TaxationOrdinaire/FormulaireDeTaxation/Generalite/Generalite'
import CaseDescription from '../Components/TaxationOrdinaire/FormulaireDeTaxation/CaseDescription/CaseDescription'
import Honoraires from '../Components/TaxationOrdinaire/FormulaireDeTaxation/Honoraires/Honoraires'
import UploadFile from '../Components/TaxationOrdinaire/FormulaireDeTaxation/UploadFile'
import PrisedePosition from '../Components/TaxationOrdinaire/FormulaireDeTaxation/PrisedePosition'

const TaxationFormPage = () => {
  return (
    <>
    <Navbar />
    <Intro/>
    <div>
    <Generalite/>
    </div>
    <div>
    <CaseDescription/>
    </div>
    <div>
    <Honoraires/>
    </div>
    <div>
    <PrisedePosition/>
    </div>
    <div>
    <UploadFile/>
    </div>
    </>
  )
}

export default TaxationFormPage