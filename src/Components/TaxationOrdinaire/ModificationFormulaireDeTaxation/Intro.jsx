import React from "react";
import "../../../Styles/TaxationForm/Intro.css";

const Intro = () => {
  return (
      <div className="divPara">
        <h1 className="title1"> DEMANDE D'INFORMATIONS POUR TAXATION</h1>
        <div className="title2">
          <span className="remarque">REMARQUE :</span> LA TAXATION NE POURRA
          ÊTRE TRAITÉE SI LE FORMULAIRE EST INCOMPLET ET/OU SI LES DOCUMENTS
          LISTÉS NE SONT PAS JOINTS (VOIR A LA FIN DU FORMULAIRE) !
        </div>

        <div className="paragraph1">
          - Les champs avec une * doivent être obligatoirement remplis <br />-
          Les données sont automatiquement sauvegardées si vous quittez la page
          (sauf les documents téléchargés qui ne sont sauvegardés qu’au moment
          de l’envoi du fichier)
        </div>

      </div>
  );
};

export default Intro;

