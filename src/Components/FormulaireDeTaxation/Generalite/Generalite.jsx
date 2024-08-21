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
const Generalite = () => {
  return (
    <>
      {" "}
      <div>
        <Guide/>
        <GuideAffaire />
      </div>
      <div className="cardGeneralité">
        <div className="mainTitle">GENERALITES</div>
        <Avocat />
        <Clients />
        <h2 className="miniTitle">
          {" "}
          <FaUsers style={{ fontSize: "30px", marginRight: "7px" }} />
          Les collaborateurs ayant participé à la réalisation des prestations{" "}
        </h2>
        <Collaborateurs />
        <Prestataires />
        <h2 className="miniTitle">
          {" "}
          <IoStatsChartSharp style={{ fontSize: "30px", marginRight: "7px" }} />
          AFFAIRE
        </h2>
        <Affaire />
      </div>
    </>
  );
};

export default Generalite;
