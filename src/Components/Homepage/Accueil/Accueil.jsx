import React from "react";
import "../../Styles/Homepage/Acceuil/Acceuil.css";
import EtudeIcon from "../../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../../assets/icons8-contrat-de-travail-100(1).png";

const Accueil = () => {
  return (
    <div className="mainContainer">
      <div className="container">
        <img src={PersoIcon} alt="logo" className="logo" />
        <h1>
          Informations personnelles
          <hr  className="hr"/> 
        </h1>
        <div className="containerInfo">
          <p>Nom:<br />LUTHER S.A</p> 
          <p>Prénom:<br />1B</p>
          <div className="p">
            <div className="b" style={{marginLeft:-5}}>
          <p>Genre:<br />M</p> <hr/>
            </div>
            <div className="b">
          <p>Nationalité:<br />France   </p><hr />
            </div>
          </div>
          <hr />
          <p>Date de naissance:<br />121212</p><hr/>
          <p>Lieu de naissance:<br />121212</p>
          <p>Adresse privée:<br />121212</p>
          <p>Téléphone mobile:<br />121212</p>
          <p>E-mail privé:<br />121212</p>
          <p>IBAN:<br />121212</p>
          <p>Code BIC:<br />121212</p>
        </div>
      </div>
      
      <div className="container">
        <img src={ProIcon} alt="logo" className="logo" style={{ margin: "0 auto", width: "100px"}} />
        <h1>
         Informations professionnnelles<hr className="hr"/>
        </h1>
        <div className="containerInfo">
          <p >Identifiant Interne:<br />3</p>
          <p>Liste:<br />Avocat à la Cour</p>
          <p>E-mail barreau:<br />M</p>
          <p>E-mail professionnel:<br />France</p>
          <p>Date d'assermentation:<br />121212</p>
          <p>Date d'avoué:<br />121212</p>
          <p>Langue parlées:<br />121212</p>
          <p>Activités préférentielles:<br />121212</p>
          <p>Assistance Judiciaire:<br /><button>Oui</button><button>Non</button></p>
        </div>
      </div>
      <div className="container">
        <img src={EtudeIcon} alt="logo" className="logo" />
        <h1>
          Etude <hr className="hr"/>
        </h1>
        <div className="containerInfo">
          <p>Dénomination:<br />LUTHER S.A</p>
          <p>Numéro voie:<br />1B</p>
          <p>Adresse:<br />Hei</p>
          <p>Nationalité:<br />France</p>
          <p>Date de naissance:<br />121212</p>
          <p>Lieu de naissance:<br />121212</p>
          <p>Adresse privée:<br />121212</p>
          <p>Téléphone mobile:<br />121212</p>
          <p>E-mail privé:<br />121212</p>
          <p>IBAN:<br />121212</p>
          <p>Code BIC:<br />121212</p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
