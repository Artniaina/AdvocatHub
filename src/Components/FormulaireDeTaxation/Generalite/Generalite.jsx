import React from "react";
import Avocat from "./AvocatClients/Avocat";
import Clients from "./AvocatClients/Clients";
import "../../../Styles/TaxationForm/CardInfo.css";
import Collaborateurs from "./Collab-Prestataire/Collaborateurs";
import Prestataires from "./Collab-Prestataire/Prestataires";
import { FaUsers } from "react-icons/fa6";
import Affaire from "./Affaire";
import { IoStatsChartSharp } from "react-icons/io5";
const Generalite = () => {
  return (
    <>
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
