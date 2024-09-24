import React from 'react'
import Navbar from '../Components/Navbar'
import Intro from '../Components/FormulaireDeTaxation/Intro'
import Generalite from '../Components/FormulaireDeTaxation/Generalite/Generalite'
import CaseDescription from '../Components/FormulaireDeTaxation/CaseDescription/CaseDescription'
import Honoraires from '../Components/FormulaireDeTaxation/Honoraires/Honoraires'
import UploadFile from '../Components/FormulaireDeTaxation/UploadFile'
import PrisedePosition from '../Components/FormulaireDeTaxation/PrisedePosition'

const UpdateTaxationFormPage = () => {
  return (
    <>
    <Navbar/>
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

export default UpdateTaxationFormPage