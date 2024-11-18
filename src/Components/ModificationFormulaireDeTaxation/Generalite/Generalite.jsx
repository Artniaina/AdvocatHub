import React from "react";
import Avocat from "./AvocatClients/Avocat";
import Clients from "./AvocatClients/Clients";
import "../../../Styles/TaxationForm/CardInfo.css";
import Collaborateurs from "./Collab-Prestataire/Collaborateurs";
import Prestataires from "./Collab-Prestataire/Prestataires";
import { FaUsers } from "react-icons/fa6";
import Affaire from "./Affaire/Affaire";
import { IoStatsChartSharp } from "react-icons/io5";
import Guide from "./Guide";
import GuideAffaire from "./Affaire/GuideAffaire";


const Generalite = ({ formulaire }) => {
  
  return (
    <>
      <div>
        <Guide />
        <GuideAffaire />
      </div>
      <section className="cardGeneralité">
        <h1 className="mainTitle">GENERALITES</h1>
        <Avocat />
        <Clients clientsDataToModify={formulaire?.sClientsData} />
        
        <h2 className="miniTitle">
          <FaUsers style={{ fontSize: "30px", marginRight: "7px" }} />
          Les collaborateurs ayant participé à la réalisation des prestations
        </h2>
        <Collaborateurs collaboratorsToModify={formulaire?.sCollaboratorsData}/>
        <Prestataires prestatairesDataToModify={formulaire?.sPrestataireData} />
        
        <h2 className="miniTitle">
          <IoStatsChartSharp style={{ fontSize: "30px", marginRight: "7px" }} />
          AFFAIRE
        </h2>
        <Affaire formulaire={formulaire}/>
      </section>
    </>
  );
};

export default Generalite;
