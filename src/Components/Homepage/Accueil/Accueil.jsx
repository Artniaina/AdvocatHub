import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../../../Store/ActivtesPreferentiellesSlice";
// import "../../../Styles/Homepage/Acceuil/Acceuil.css";
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
    number = number || "";
    number = number.replace(/\D/g, "");

    const formattedNumber = number.replace(
      /^(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})$/,
      "+$1 $2 $3 $4 $5"
    );

    return formattedNumber;
  };
  const telephoneMobile = formatPhoneNumber(
    avocatInfo && avocatInfo.m_stelephoneMobile
  );

  useEffect(() => {
    setIsDispensed(aj);
  }, [avocatInfo]);
  return (
    <div className="mainContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div className="container border border-[#7272774f] flex flex-col p-4 rounded-lg bg-white mx-3">
        <img src={PersoIcon} alt="logo" className="logo w-16 h-16 mx-auto" />
        <h1 className="text-center text-xl text-[#3c1880d7] uppercase m-0">
          Informations personnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo flex flex-col items-start">
          <p>
            Nom: <strong>{avocatInfo && avocatInfo.m_sNom}</strong>
          </p>
          <p>
            Prénom: <strong>{avocatInfo && avocatInfo.m_sPrenom}</strong>
          </p>
          <div className="flex flex-wrap">
            <div className="b1" style={{ marginLeft: -5 }}>
              <p>
                Genre: <strong>{avocatInfo && avocatInfo.m_sSexe}</strong>
              </p>
            </div>
            <div className="b">
              <p>
                Nationalité:{" "}
                <strong>{avocatInfo && avocatInfo.m_sNationalite}</strong>
              </p>
            </div>
          </div>
          <hr />
          <p>
            Date de naissance:{" "}
            <strong>{avocatInfo && avocatInfo.m_dDateNaissance}</strong>
          </p>
          <hr />
          <p>
            Lieu de naissance:{" "}
            <strong>{avocatInfo && avocatInfo.m_sLieuNaissance}</strong>
          </p>
          <p style={{ height: "200px" }}>
            Adresse privée:{" "}
            <strong>{avocatInfo && avocatInfo.m_sAdressePrivee}</strong>
          </p>
          <p>
            Téléphone mobile: <strong>{telephoneMobile}</strong>
          </p>
          <p>
            E-mail privé:{" "}
            <strong>{avocatInfo && avocatInfo.m_sEmailSecondaire}</strong>
          </p>
          <p>
            IBAN: <strong>{avocatInfo && avocatInfo.m_IBAN}</strong>
          </p>
          <p>
            Code BIC: <strong>{avocatInfo && avocatInfo.m_BIC}</strong>
          </p>
        </div>
      </div>

      <div className="container border border-[#7272774f] flex flex-col p-4 rounded-lg bg-white mx-3">
        <img src={ProIcon} alt="logo" className="logo w-16 h-16 mx-auto" />
        <h1 className="text-center text-xl text-[#3c1880d7] uppercase m-0">
          Informations professionnelles
          <hr className="hr" />
        </h1>
        <div className="containerInfo flex flex-col items-start">
          <p>
            Identifiant Interne:{" "}
            <strong>{avocatInfo && avocatInfo.m_NumInterne}</strong>
          </p>
          <p>
            Liste: <strong>{avocatInfo && avocatInfo.m_sLibelleliste}</strong>
          </p>
          <p>
            E-mail barreau:{" "}
            <strong>{avocatInfo && avocatInfo.m_emailbarreau}</strong>
          </p>
          <p>
            E-mail professionnel:{" "}
            <strong>{avocatInfo && avocatInfo.m_sEmailPro}</strong>
          </p>
          <p>
            Date d'assermentation:{" "}
            <strong>
              {avocatInfo && formatDate(avocatInfo.m_dDateAssermentation)}
            </strong>
          </p>
          <p>
            Date d'avoué:{" "}
            <strong>{avocatInfo && formatDate(avocatInfo.m_dDateAvoue)}</strong>
          </p>
          <p style={{ minHeight: "150px" }}>
            Langues parlées:
            {langues.map((langue, index) => (
              <React.Fragment key={index}>
                <strong>{langue}</strong>
              </React.Fragment>
            ))}
          </p>
          <p style={{ height: "200px" }}>
            Activités préférentielles:
            {activityNames.map((name, index) => (
              <React.Fragment key={index}>
                <strong>{name}</strong>
              </React.Fragment>
            ))}
          </p>

          <div>
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
      </div>

      <div className="container border border-[#7272774f] flex flex-col p-4 rounded-lg bg-white mx-3">
        <img src={EtudeIcon} alt="logo" className="logo w-16 h-16 mx-auto" />
        <h1 className="text-center text-xl text-[#3c1880d7] uppercase m-0">
          Etude
          <hr className="hr" />
        </h1>
        <div className="containerInfo flex flex-col items-start">
          {etudeInfo && (
            <>
              <p>
                Dénomination: <strong>{etudeInfo.m_sDénominationEtude}</strong>
              </p>
              <p>
                Numéro voie: <strong>{etudeInfo.m_nNumVoie}</strong>
              </p>
              <p>
                Adresse: <strong>{etudeInfo.m_sAdresse}</strong>
              </p>
              <p>
                Complement d'adresse:{" "}
                <strong>{etudeInfo.m_sAdresseSuite}</strong>
              </p>
              <p>
                Code postal: <strong>{etudeInfo.m_sCodePostale}</strong>
              </p>
              <p>
                Localité: <strong>{etudeInfo.m_sLocalite}</strong>
              </p>
              <p>
                BP: <strong>{etudeInfo.m_sboitepostal}</strong>
              </p>
              <p>
                Code postal BP:{" "}
                <strong>{etudeInfo.m_sCodepostalboitepostal}</strong>
              </p>
              <p>
                Localité BP: <strong>{etudeInfo.m_sLocaliteboitepostal}</strong>
              </p>
              <p>
                Téléphone fixe: <strong>{etudeInfo.m_IBAN}</strong>
              </p>
              <p>
                Fax: <strong>{etudeInfo.m_sfax}</strong>
              </p>
              <p>
                Site web: <strong>{etudeInfo.m_ssite}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
