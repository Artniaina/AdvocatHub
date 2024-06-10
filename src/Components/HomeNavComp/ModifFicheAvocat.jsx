import React, { useEffect, useState } from "react";
import EtudeIcon from "../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../assets/icons8-contrat-de-travail-100(1).png";
import "../../Styles/Homepage/Acceuil/Acceuil.css"


const ModifFicheAvocat = ({ avocatInfo, etudeInfo }) => {
  const aj = avocatInfo && avocatInfo.m_dispenseaj;
  const [isDispensed, setIsDispensed] = useState(aj);

  useEffect(() => {
    setIsDispensed(aj);
  }, [avocatInfo]);
  return (
    <div className="mainContainer">
      <div className="container" style={{marginLeft:"30px"}}>
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

      <div className="container " style={{width:"520px"}}>
        <img src={ProIcon} alt="logo" className="logo" />
        <h1>
          Informations professionnnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo middle">
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
            <strong></strong>
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
          <p>Assistance Judiciaire:</p>
          <div className="bout">
            {aj == 1 ? (
              <>
                <button className="boutonn oui">Oui</button>
                <button className="boutonn non">Non</button>
              </>
            ) : (
              <>
                <button className="boutonn non">Oui</button>
                <button className="boutonn oui">Non</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container" style={{marginRight:"30px"}}>
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
                Complement d'adresse:
                <br />
                <strong>{etudeInfo.m_sAdresseSuite}</strong>
              </p>
              <p>
                Code postal:
                <br />
                <strong>{etudeInfo.m_sCodePostale}</strong>
              </p>
              <p>
                Localité:
                <br />
                <strong>{etudeInfo.m_sLocalite}</strong>
              </p>
              <p>
                BP:
                <br />
                <strong>{etudeInfo.m_sboitepostal}</strong>
              </p>
              <p>
                Code postal BP:
                <br />
                <strong>{etudeInfo.m_sCodepostalboitepostal}</strong>
              </p>
              <p>
                Localité BP:
                <br />
                <strong>{etudeInfo.m_sLocaliteboitepostal}</strong>
              </p>
              <p>
                Telehone fixe:
                <br />
                <strong>{etudeInfo.m_IBAN}</strong>
              </p>
              <p>
                Fax:
                <br />
                <strong>{etudeInfo.m_sfax}</strong>
              </p>
              <p>
                Site web:
                <br />
                <strong>{etudeInfo.m_ssite}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifFicheAvocat;
