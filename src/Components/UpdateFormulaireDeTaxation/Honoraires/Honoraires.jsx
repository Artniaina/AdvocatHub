import React from 'react'
import Facture from './Facture'
import Observation from './Observation'
import "../../../Styles/TaxationForm/CardInfo.css";
import { LuPencilLine } from "react-icons/lu";
import GuideHonoraires from './GuideHonoraires';


const Honoraires = () => {
  
  return ( 
    <>
    <div>

    <GuideHonoraires/>
    </div>
      <div className="cardGeneralité" style={{display:"block"}}>
        <div className="mainTitle">HONORAIRES</div>
        <Facture />
        <h2 className="miniTitle" style={{border:"none"}}>
          {" "}<LuPencilLine style={{marginRight:"10px", fontSize:"30px"}} />
          Observations particulières : prise en charge totale ou partielle par un tiers/assurance protection juridique du client 
        </h2>
        <Observation />
      </div>
    </>
  );
};

export default Honoraires;
