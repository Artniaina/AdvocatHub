import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../../../Store/ActivtesPreferentiellesSlice";
import "../../../Styles/Homepage/Acceuil/Acceuil.css";
import EtudeIcon from "../../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../../assets/icons8-contrat-de-travail-100(1).png";

const Accueil = ({ avocatInfo, etudeInfo }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const activities = useSelector((state) => state.activities.activities);
  const { state } = useLocation();

  const selectedActPref = activities || [];
  const aj = avocatInfo && avocatInfo.m_dispenseaj;
  const [isDispensed, setIsDispensed] = useState(aj);

  const m_sactivitépref = (avocatInfo && avocatInfo.m_sactivitépref) || "";
  const activityCodes = m_sactivitépref.slice(1, -1).split(",");

  const activityNames = activityCodes.map((code) => {
    const activity = selectedActPref
      .flat()
      .find((activity) => activity.code === code);
    return activity ? activity.name : code;
  });

  const langues =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(",") : [];
  const activites =
    avocatInfo && avocatInfo.m_langue
      ? avocatInfo.m_sactivitépref.split(",")
      : [];
  const formatDate = (dateString) => {
    if (!dateString) return "";

    if (dateString.length === 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    } else if (dateString.length === 10) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } else {
      return "Format de date inconnu";
    }
  };


  const formatPhoneNumber = (number) => {

    number = number.replace(/\D/g, "");
  
    const formattedNumber = number.replace(
      /^(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})$/,
      "+$1 $2 $3 $4 $5"
    );
  
    return formattedNumber;
  };
  const telephoneMobile=formatPhoneNumber(avocatInfo && avocatInfo.m_stelephoneMobile)


  useEffect(() => {
    setIsDispensed(aj);
  }, [avocatInfo]);
  return (
    <div className="mainContainer">
      <div className="container" style={{ marginLeft: "30px" }}>
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
          <p style={{ height: "200px" }}>
            Adresse privée:
            <br />
            <strong>{avocatInfo && avocatInfo.m_sAdressePrivee}</strong>
          </p>
          <p>
            Téléphone mobile:
            <br />
            <strong>{telephoneMobile}</strong>
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

      <div className="container " style={{ width: "520px" }}>
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
            <strong>{avocatInfo && avocatInfo.m_sEmailPro}</strong>
          </p>
          <p>
            Date d'assermentation:
            <br />
            <strong>
              {avocatInfo && formatDate(avocatInfo.m_dDateAssermentation)}
            </strong>
          </p>
          <p>
            Date d'avoué:
            <br />
            <strong>{avocatInfo && formatDate(avocatInfo.m_dDateAvoue)}</strong>
          </p>
          <p style={{ minHeight: "150px" }}>
            Langue parlées:
            <br />
            {langues.map((langue, index) => (
              <React.Fragment key={index}>
                <strong>{langue}</strong>
                <br />
              </React.Fragment>
            ))}
          </p>
          <p style={{ height: "200px" }}>
            Activités préférentielles:
            <br />
            {activityNames.map((name, index) => (
              <React.Fragment key={index}>
                <strong>{name}</strong>
                <br />
              </React.Fragment>
            ))}
          </p>

          <p>
            Assistance Judiciaire:
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
          </p>
        </div>
      </div>
      <div className="container" style={{ marginRight: "30px" }}>
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

export default Accueil;
