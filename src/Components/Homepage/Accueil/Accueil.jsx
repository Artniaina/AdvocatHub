import React, { useEffect, useState } from "react";
import "../../Styles/Homepage/Acceuil/Acceuil.css";
import EtudeIcon from "../../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../../assets/icons8-contrat-de-travail-100(1).png";

const Accueil = () => {
  const [avocatInfo, setAvocatInfo] = useState(null);
  const [etudeInfo, setEtudeInfo] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.10.5//Utilisateur/AvocatEtude/{idetude}`)
      .then((response) => response.json())
      .then((data) => setEtudeInfo(data[0]))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://192.168.10.5//Utilisateur/AvocatInfo/{idavocatpp}")
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
            <strong>{avocatInfo && avocatInfo.m_sNom}</strong>
          </p>
          <p>
            Prénom:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sPrenom}</strong>
          </p>
          <div className="p">
            <div className="b1" style={{ marginLeft: -5 }}>
              <p>
                Genre:
                <br />
                <strong>{avocatInfo && avocatInfo.m_sSexe}</strong>
              </p>
            </div>
            <div className="b">
              <p>
                Nationalité:
                <br />
                <strong>{avocatInfo && avocatInfo.m_sNationalite}</strong>
              </p>
            </div>
          </div>
          <hr />
          <p>
            Date de naissance:
            <br />
            <strong>{avocatInfo && avocatInfo.m_dDateNaissance}</strong>
          </p>
          <hr />
          <p>
            Lieu de naissance:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sLieuNaissance}</strong>
          </p>
          <p>
            Adresse privée:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sAdressePrivee}</strong>
          </p>
          <p>
            Téléphone mobile:
            <br />
            <strong>{avocatInfo && avocatInfo.m_stelephoneMobile}</strong>
          </p>
          <p>
            E-mail privé:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sEmailSecondaire}</strong>
          </p>
          <p>
            IBAN:
            <br />
            <strong>{avocatInfo && avocatInfo.m_IBAN}</strong>
          </p>
          <p>
            Code BIC:
            <br />
            <strong>{avocatInfo && avocatInfo.m_BIC}</strong>
          </p>
        </div>
      </div>

      <div className="container">
        <img src={ProIcon} alt="logo" className="logo" />
        <h1>
          Informations professionnnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo">
          <p>
            Identifiant Interne:
            <br />
            <strong>{avocatInfo && avocatInfo.m_NumInterne}</strong>
          </p>
          <p>
            Liste:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sLibelleliste}</strong>
          </p>
          <p>
            E-mail barreau:
            <br />
            <strong>{avocatInfo && avocatInfo.m_emailbarreau}</strong>
          </p>
          <p>
            E-mail professionnel:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sNationalite}</strong>
          </p>
          <p>
            Date d'assermentation:
            <br />
            <strong>{avocatInfo && avocatInfo.m_dDateAssermentation}</strong>
          </p>
          <p>
            Date d'avoué:
            <br />
            <strong>{avocatInfo && avocatInfo.m_dDateAvoue}</strong>
          </p>
          <p>
            Langue parlées:
            <br />
            <strong>{avocatInfo && avocatInfo.m_langue}</strong>
          </p>
          <p>
            Activités préférentielles:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sactivitépref}</strong>
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
          {etudeInfo && (
            <>
              <p>
                Dénomination:
                <br />
                <strong>{etudeInfo.m_sDénominationEtude}</strong>
              </p>
              <p>
                Numéro voie:
                <br />
                <strong>{etudeInfo.m_nNumVoie}</strong>
              </p>
              <p>
                Adresse:
                <br />
                <strong>{etudeInfo.m_sAdresse}</strong>
              </p>
              <p>
                Nationalité:
                <br />
                <strong>{etudeInfo.m_sNationalite}</strong>
              </p>
              <p>
                Date de naissance:
                <br />
                <strong>{etudeInfo.m_dDateNaissance}</strong>
              </p>
              <p>
                Lieu de naissance:
                <br />
                <strong>{etudeInfo.m_sLieuNaissance}</strong>
              </p>
              <p>
                Adresse privée:
                <br />
                <strong>{etudeInfo.m_sAdressePrivee}</strong>
              </p>
              <p>
                Téléphone mobile:
                <br />
                <strong>{etudeInfo.m_stelephoneMobile}</strong>
              </p>
              <p>
                E-mail privé:
                <br />
                <strong>{etudeInfo.m_sEmailSecondaire}</strong>
              </p>
              <p>
                IBAN:
                <br />
                <strong>{etudeInfo.m_IBAN}</strong>
              </p>
              <p>
                Code BIC:
                <br />
                <strong>{etudeInfo.m_BIC}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
