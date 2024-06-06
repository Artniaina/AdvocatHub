import React, { useEffect, useState } from "react";
import "../../Styles/Homepage/Acceuil/Acceuil.css";
import EtudeIcon from "../../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../../assets/icons8-contrat-de-travail-100(1).png";

const Accueil = () => {
  const [avocatInfo, setAvocatInfo] = useState(null);

  useEffect(() => {
    fetch("http://192.168.10.5//Utilisateur/AvocatInfo/%7Bidavocatpp%7D")
      .then((response) => response.json())
      .then((data) => setAvocatInfo(data[0]))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  return (
    <div className="mainContainer">
      <div className="container">
        <img src={PersoIcon} alt="logo" className="logo" />
        <h1>
          Informations personnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo">
          <p>
            Nom:
            <br />
            {avocatInfo && avocatInfo.m_sNom}
          </p>
          <p>
            Prénom:
            <br />
            {avocatInfo && avocatInfo.m_sPrenom}
          </p>
          <div className="p">
            <div className="b" style={{ marginLeft: -5 }}>
              <p>
                Genre:
                <br />
                {avocatInfo && avocatInfo.m_sSexe}
              </p>{" "}
              <hr />
            </div>
            <div className="b">
              <p>
                Nationalité:
                <br />
                {avocatInfo && avocatInfo.m_sNationalite}
              </p>
              <hr />
            </div>
          </div>
          <hr />
          <p>
            Date de naissance:
            <br />
            {avocatInfo && avocatInfo.m_dDateNaissance}
          </p>
          <hr />
          <p>
            Lieu de naissance:
            <br />
            {avocatInfo && avocatInfo.m_sLieuNaissance}
          </p>
          <p>
            Adresse privée:
            <br />
            {avocatInfo && avocatInfo.m_sAdressePrivee}
          </p>
          <p>
            Téléphone mobile:
            <br />
            {avocatInfo && avocatInfo.m_stelephoneMobile}
          </p>
          <p>
            E-mail privé:
            <br />
            {avocatInfo && avocatInfo.m_sEmailSecondaire}
          </p>
          <p>
            IBAN:
            <br />
            {avocatInfo && avocatInfo.m_IBAN}
          </p>
          <p>
            Code BIC:
            <br />
            {avocatInfo && avocatInfo.m_BIC}
          </p>
        </div>
      </div>

      <div className="container">
        <img
          src={ProIcon}
          alt="logo"
          className="logo"
          style={{ margin: "0 auto", width: "100px" }}
        />
        <h1>
          Informations professionnnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo">
          <p>
            Identifiant Interne:
            <br />3
          </p>
          <p>
            Liste:
            <br />
            Avocat à la Cour
          </p>
          <p>
            E-mail barreau:
            <br />M
          </p>
          <p>
            E-mail professionnel:
            <br />
            France
          </p>
          <p>
            Date d'assermentation:
            <br />
            121212
          </p>
          <p>
            Date d'avoué:
            <br />
            121212
          </p>
          <p>
            Langue parlées:
            <br />
            121212
          </p>
          <p>
            Activités préférentielles:
            <br />
            121212
          </p>
          <p>
            Assistance Judiciaire:
            <br />
            <button>Oui</button>
            <button>Non</button>
          </p>
        </div>
      </div>
      <div className="container">
        <img src={EtudeIcon} alt="logo" className="logo" />
        <h1>
          Etude <hr className="hr" />
        </h1>
        <div className="containerInfo">
          <p>
            Dénomination:
            <br />
            LUTHER S.A
          </p>
          <p>
            Numéro voie:
            <br />
            1B
          </p>
          <p>
            Adresse:
            <br />
            Hei
          </p>
          <p>
            Nationalité:
            <br />
            France
          </p>
          <p>
            Date de naissance:
            <br />
            121212
          </p>
          <p>
            Lieu de naissance:
            <br />
            121212
          </p>
          <p>
            Adresse privée:
            <br />
            121212
          </p>
          <p>
            Téléphone mobile:
            <br />
            121212
          </p>
          <p>
            E-mail privé:
            <br />
            121212
          </p>
          <p>
            IBAN:
            <br />
            121212
          </p>
          <p>
            Code BIC:
            <br />
            121212
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
