import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from '../../../Hooks/AuthContext';
import { fetchAvocatInfo } from '../../../Store/AvocatSlice';
import { useNavigate } from "react-router-dom";
import { fetchLangues } from "../../../Store/LanguagesSlice";
import { fetchActivities } from "../../../Store/ActivtesPreferentiellesSlice";
import { FaCheck } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { FaFilePen } from "react-icons/fa6";
import EtudeIcon from "../../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../../assets/icons8-contrat-de-travail-100(1).png";
import PopUpLangueParlees from "../../PopUp/PopUpLangueParlees";
import PopUpActiPref from "../../PopUp/PopUpActivPref";
import PopUpAdressePrivee from "../../PopUp/PopUpAdressePrivee";
import PopUpAnnuler from "../../PopUp/PopUpAnnuler";
import ConfirmationValidation from "../../PopUp/ConfirmationValidation";
import "../../../Styles/PopUp/AdressePriveePopUp.css";
import "../../../Styles/Homepage/Acceuil/Acceuil.css";
import "../../../Styles/Homepage/Acceuil/PopUp.css";


const ModifFicheAvocat = ({ etudeInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countryCodes = useSelector((state) => state.countryCodes.countryCodes);

  const avocatInfo = useSelector((state) => state.avocat.avocatInfo);
  const { user } = useAuth();
 
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(`'${user.email}'`));
    } else {
      console.log('User or User Email is not available.');
    }
  }, [dispatch, user]);
console.log("Avocat", avocatInfo);

////////////////////////////////////DISPENSE ASSISTANCE JUDICIAIRE/////////////////////////////////////

  const activites =
    avocatInfo && avocatInfo.m_langue
      ? avocatInfo.m_sactivitépref.split(",")
      : [];
  const initialAjState = avocatInfo && avocatInfo.m_dispenseaj;
  const toggleAj = () => {
    setAjState((prevState) => (prevState == 1 ? false : true));
  };

  ////////////////////////////////////LANGUES PARLEES////////////////////////////////

  useEffect(() => {
    dispatch(fetchLangues());
  }, [dispatch]);

  const languages = useSelector((state) => state.langues.langues);
  const names = languages.map((language) => language.name);
  const langues =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(",") : [];
  const languageSelected =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(",") : [];

  const convertLanguagesToCodes = (languageString) => {
    if (typeof languageString !== "string" || languageString.trim() === "") {
      return [];
    }
    const languageNames = languageString.split(",").map((name) => name.trim());
    const uniqueLanguageCodes = [];
    languageNames.forEach((name) => {
      const language = languages.find((lang) => lang.name === name);
      if (language && !uniqueLanguageCodes.includes(language.code)) {
        uniqueLanguageCodes.push(language.code);
      }
    });
    return uniqueLanguageCodes;
  };

  const LanguageString =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue : "";
  const languageCodes = convertLanguagesToCodes(LanguageString);

  ////////////////////////////////////ACTIVITES PREFERENTIELLES ////////////////////////////////

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const activity = useSelector((state) => state.activities.activities) || [];

  const transformStringToArray = (str) => {
    if (Array.isArray(str)) {
      console.error("Input is an array, expected a string:", str);
      return [];
    }

    if (typeof str !== "string") {
      console.error("Input is not a string:", str);
      return [];
    }
    const trimmedStr = str.slice(1, -1);
    const codesArray = trimmedStr.split(",");
    return codesArray.map((code) => code.trim());
  };

  const defaultActivity = (avocatInfo && avocatInfo.m_sactivitépref) || [];
  const defaultActivityArray = transformStringToArray(defaultActivity);

  /////////////////////////////////////////////INITIAL STATES////////////////////////////////////////////////

  const defaultPhoneNumber = avocatInfo
    ? avocatInfo.m_stelephoneMobile.replace(/^\+\d{3}\s?/, "+")
    : "";
  const initialState = {
    ajState: initialAjState,
    phoneNumber: defaultPhoneNumber || "",
    adresse: (avocatInfo && avocatInfo.m_sAdressePrivee) || "",
    selectedCountry: "+261",
    emailPrivee: avocatInfo?.m_sEmailSecondaire || "",
    emailPro: avocatInfo?.m_sEmailPro || "",
    codeIBAN: avocatInfo?.m_IBAN || "",
    codeBIC: avocatInfo?.m_BIC || "",
    selectedActivities: defaultActivityArray || [],
    selectedLanguages: languageCodes || [],
  };

  

  ///////////////////////////////////////GESTION DES STATES INITIALES///////////////////////////////////////

  const [ajState, setAjState] = useState(initialState.dispenseAJ);
  const [adresse, setAdresse] = useState(initialState.adresse);
  const [phoneNumber, setPhoneNumber] = useState(initialState.phoneNumber);
  const [selectedCountry, setSelectedCountry] = useState(
    initialState.selectedCountry
  );
  const [emailPrivee, setEmailPrivee] = useState(initialState.emailPrivee);
  const [emailPro, setEmailPro] = useState(initialState.emailPro);
  const [codeIBAN, setCodeIBAN] = useState(initialState.codeIBAN);
  const [codeBIC, setCodeBIC] = useState(initialState.codeBIC);
  const [selectedActivities, setSelectedActivities] = useState(
    initialState.selectedActivities
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    initialState.selectedLanguages
  );
  const [showLanguePopup, setShowLanguePopup] = useState(false);
  const [showActivPrefPopup, setShowActivPrefPopup] = useState(false);
  const [showDocumentPopup, setShowDocumentPopup] = useState(false);
  const [showValiderPopUp, setShowValiderPopUp] = useState(false);
  const [showAnnulePopup, setShowAnnulePopup] = useState(false);

  ////////////////////////////////REGEX: FORME DE SAISI CORRECTE: DES EMAILS, BIC ET IBAN//////////////////////
  const inputRef = useRef(null);
  const validateEmail = (email) => {
    if (email === '') return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validBIC = (codeBIC) => {
    if (codeBIC === '') return true;
    const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    return bicRegex.test(codeBIC);
  };
  
  const validIBAN = (codeIBAN) => {
    if (codeIBAN === '') return true;
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
    return ibanRegex.test(codeIBAN);
  };

  
  const handleEmailProChange = (e) => {
    setEmailPro(e.target.value);
  };

  const handleEmailPriveeChange = (e) => {
    setEmailPrivee(e.target.value);
  };

  const handleBICChange = (e) => {
    setCodeBIC(e.target.value);
  };

  const handleIBANChange = (e) => {
    setCodeIBAN(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (!validateEmail(emailPro)) {
          alert("Adresse email professionnelle invalide");
        } else if (!validateEmail(emailPrivee)) {
          alert("Adresse email privée invalide");
        } else if (!validBIC(codeBIC)) {
          alert("Code BIC invalide");
        } else if (!validIBAN(codeIBAN)) {
          alert("Code IBAN invalide");
        }
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [emailPro, emailPrivee, codeBIC, codeIBAN]);
  //////////////////////////////////FONCTION DE GESTION DE DISPLAY DES POPUPS//////////////////////////////////////////

  const closeValidPopup = () => {
    setShowValiderPopUp(false);
  };

  const closeAnnulePopup = () => {
    setShowAnnulePopup(false);
  };
  const handleActiviteClick = () => {
    setShowActivPrefPopup(true);
  };
  const closeActivitePopup = () => {
    setShowActivPrefPopup(false);
  };
  const handleSubmitActivity = (selected) => {
    setSelectedActivities(selected);
    setShowActivPrefPopup(false);
  };
  const handleLangueClick = () => {
    setShowLanguePopup(true);
  };
  const closeLanguePopup = () => {
    setShowLanguePopup(false);
  };

  const handleSubmitLangues = (selected) => {
    setSelectedLanguages(selected);
    setShowLanguePopup(false);
  };

  const handleDocumentClick = () => {
    setShowDocumentPopup(true);
  };

  const closeDocumentPopup = () => {
    setShowDocumentPopup(false);
  };

  //////////////////////////////////////USEEFFECT DES CODE IBAN, BIC/////////////////////////////////////////////
  useEffect(() => {
    if (avocatInfo) {
      setCodeIBAN(avocatInfo.m_IBAN);
    }
  }, [avocatInfo]);
  
  useEffect(() => {
    if (avocatInfo) {
      setCodeBIC(avocatInfo.m_BIC);
    }
  }, [avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setAdresse(avocatInfo.m_sAdressePrivee);
    }
  }, [avocatInfo]);
  
  useEffect(() => {
    if (avocatInfo) {
      setEmailPrivee(avocatInfo.m_sEmailSecondaire);
    }
  }, [avocatInfo]);
  
  useEffect(() => {
    if (avocatInfo) {
      setEmailPro(avocatInfo.m_sEmailPro);
    }
  }, [avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setPhoneNumber(defaultPhoneNumber);
    }
  }, [avocatInfo]);
  
  useEffect(() => {
    if (avocatInfo) {
      setSelectedLanguages(languageCodes);
    }
  }, [avocatInfo]);

  useEffect(() => {
    if (avocatInfo) {
      setSelectedActivities(defaultActivityArray);
    }
  }, [avocatInfo]);

  useEffect(() => {
    setAjState(initialAjState);
  }, [initialAjState]);

  const formatPhoneNumber = (number) => {
    number = number.replace(/\D/g, "");

    const formattedNumber = number.replace(
      /^(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})$/,
      "+$1 $2 $3 $4 $5"
    );

    return formattedNumber;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    if (dateString.length == 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    } else if (dateString.length == 10) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } else {
      return "Format de date inconnu";
    }
  };

  ///////////////////////////////////FONCTION DE SOUMISSION///////////////////////////////////////
  const handleAdresseSubmit = (adressePrivee) => {
    setAdresse(adressePrivee);
  };

  const handleCountryCodeChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const inputNumber = event.target.value.replace(selectedCountry, "").trim();
    const formattedNumber = formatPhoneNumber(inputNumber);
    setPhoneNumber(formattedNumber);
  };

  const handleSubmitAllChangeform = (e, buttonType) => {
    e.preventDefault();
    if (buttonType == "valider") {
      setShowValiderPopUp(true);
    } else if (buttonType == "annuler") {
      setShowAnnulePopup(true);
    }
  };

  const handleSubmitAllChange = async (e) => {
    e.preventDefault();
    const dataToSend = {
      m_sAdressePrivee: adresse,
      m_sEmailPro: emailPro,
      m_sEmailSecondaire: emailPrivee,
      m_stelephoneMobile: `${selectedCountry} ${formatPhoneNumber(
        phoneNumber
      )}`,
      m_IBAN: codeIBAN,
      m_BIC: codeBIC,
      m_dispenseaj: ajState,
      m_tableauLangue: selectedLanguages,
      m_tableauActivPref: selectedActivities,
    };

    console.log(
      "Données envoyées pour la modification:",
      JSON.stringify(dataToSend)
    );

    const IdAvocat = avocatInfo && avocatInfo.m_nIDAvocat_PP;

    try {
      const response = await fetch(
        `http://192.168.10.5/Utilisateur/ModifFicheAvocat/${IdAvocat}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Échec lors de l'enregistrement des modifications");
      }

      navigate("/home");
    } catch (error) {
      alert("Échec lors de l'enregistrement des modifications");
      console.error(
        "Erreur lors de l'enregistrement des modifications:",
        error
      );
    }
  };

  const handleNoChangeSubmitted = () => {
    navigate("/home");
  };
  /////////////////////////////////////FONCTION DE DETECTION DE CHANGEMENT DES DONNEES ///////////////////////////////

  const currentState = {
    ajState,
    phoneNumber,
    selectedCountry,
    adresse,
    emailPrivee,
    emailPro,
    codeIBAN,
    codeBIC,
    selectedActivities,
    selectedLanguages,
  };

  const ObjectComparison = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!keys2.includes(key) || !ObjectComparison(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(
    ObjectComparison(initialState, currentState)
  );

  useEffect(() => {
    console.log("initialState:", initialState);
    console.log("currentState:", currentState);
    const isDisabled = ObjectComparison(initialState, currentState);
    setIsButtonDisabled(isDisabled);
  }, [initialState, currentState]);

  const handleValidPopup = (e) => {
    if (isButtonDisabled) {
      console.log("Pas de changement sur les donnees");
      setIsButtonDisabled(true);
    } else {
      console.log("Changement sur les donnees");
      handleSubmitAllChangeform(e, "valider");
      setShowValiderPopUp(true);
      setIsButtonDisabled(false);
    }
  };

  const popupClassName = isButtonDisabled ? "disabled-popup" : "btnsub";

  const handleAnnuleClick = (e) => {
    if (ObjectComparison(initialState, currentState)) {
      navigate("/home");
      console.log("Pas de changement sur les donnees");
    } else {
      setShowAnnulePopup(true);
      handleSubmitAllChangeform(e, "annuler");
      console.log("Changement sur les donnees");
    }
  };

  /////////////////////////////////////////FIN//////////////////////////////////////////////

  return (
    <form onSubmit={handleSubmitAllChangeform}>
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
              <strong>
                {avocatInfo && formatDate(avocatInfo.m_dDateNaissance)}{" "}
              </strong>
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
              {adresse ? (
                <strong>{adresse}</strong>
              ) : (
                <strong>{avocatInfo && avocatInfo.m_sAdressePrivee}</strong>
              )}
              <button className="btnpop" onClick={handleDocumentClick}>
                <FaFilePen />
              </button>
              {showDocumentPopup && (
                <PopUpAdressePrivee
                  onClose={closeDocumentPopup}
                  onSubmit={handleAdresseSubmit}
                  value={adresse}
                  defaultValuee={
                    adresse
                      ? adresse
                      : avocatInfo && avocatInfo.m_sAdressePrivee
                  }
                />
              )}
            </p>
            <p>
              Téléphone mobile:
              <div className="p">
                <div>
                <select
                    name="pays"
                    value={selectedCountry}
                    onChange={handleCountryCodeChange}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    value={`${selectedCountry} ${formatPhoneNumber(
                      phoneNumber
                    )}`}
                    onChange={handlePhoneNumberChange}
                    placeholder="Numéro de téléphone"
                    className="modifInput"
                  />
                </div>
              </div>
            </p>

            <p>
              E-mail privé:
              <input
                ref={inputRef}
                className="modifInput"
                type="text"
                value={emailPrivee}
                onChange={handleEmailPriveeChange}
              />
            </p>

            <p>
              IBAN:
              <input
                className="modifInput"
                type="text"
                value={codeIBAN}
                onChange={handleIBANChange}
              />
            </p>
            <p>
              Code BIC
              <input
                className="modifInput"
                type="text"
                value={codeBIC}
                onChange={handleBICChange}
              />
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
              <input
                ref={inputRef}
                className="modifInput"
                type="text"
                value={emailPro}
                onChange={handleEmailProChange}
              />
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
              <strong>
                {avocatInfo && formatDate(avocatInfo.m_dDateAvoue)}
              </strong>
            </p>
            <p style={{ minHeight: "150px" }}>
              Langues parlées:
              <button onClick={handleLangueClick} className="btnadd">
                <BsPlusCircleFill />
              </button>
              <br />
              <span>
                {selectedLanguages.length === 0
                  ? languageCodes.map((code, index) => {
                      const language = languages.find(
                        (lang) => lang.code === code
                      );
                      return (
                        <React.Fragment key={`default-${index}`}>
                          <strong>{language ? language.name : code}</strong>
                          <br />
                        </React.Fragment>
                      );
                    })
                  : selectedLanguages.map((code, index) => {
                      const language = languages.find(
                        (lang) => lang.code === code
                      );
                      return (
                        <React.Fragment key={`selected-${index}`}>
                          <strong>{language ? language.name : code}</strong>
                          <br />
                        </React.Fragment>
                      );
                    })}

                {showLanguePopup && (
                  <PopUpLangueParlees
                    onClose={closeLanguePopup}
                    onSubmit={handleSubmitLangues}
                    value={selectedLanguages}
                    languages={languages}
                    defaultLangue={languageCodes}
                  />
                )}
              </span>
            </p>
            <p style={{ minHeight: "200px" }}>
              Activités préférentielles:
              <button onClick={handleActiviteClick} className="btnadd">
                <BsPlusCircleFill />
              </button>
              <br />
              <span>
                {selectedActivities.length === 0
                  ? defaultActivityArray.map((code, index) => {
                      const activites = activity.find(
                        (act) => act.code === code
                      );
                      return (
                        <React.Fragment key={`default-${index}`}>
                          <strong>{activites ? activites.name : code}</strong>
                          <br />
                        </React.Fragment>
                      );
                    })
                  : selectedActivities.map((code, index) => {
                      const activites = activity.find(
                        (act) => act.code === code
                      );
                      return (
                        <React.Fragment key={`selected-${index}`}>
                          <strong>{activites ? activites.name : code}</strong>
                          <br />
                        </React.Fragment>
                      );
                    })}
                {showActivPrefPopup && (
                  <PopUpActiPref
                    onClose={closeActivitePopup}
                    onSubmit={handleSubmitActivity}
                    value={selectedActivities}
                    activity={activity}
                    defaultActivity={defaultActivityArray}
                  />
                )}
              </span>
            </p>
            <p>
              Assistance Judiciaire
              <div className="bout">
                <label className={`btnt ${ajState == 1 ? "selected" : ""}`}>
                  <input
                    type="radio"
                    checked={ajState === 1}
                    onChange={toggleAj}
                  />
                  Oui
                </label>
                <label className={`btnt ${ajState == 0 ? "selected" : ""}`}>
                  <input
                    type="radio"
                    checked={ajState === 0}
                    onChange={toggleAj}
                  />
                  Non
                </label>
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
                  Telephone fixe:
                  <br />
                  <strong>{etudeInfo.m_stelephone}</strong>
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
        }}
      >
        <div style={{ minHeight: "150px" }}>
          <button className="btnsub" onClick={handleAnnuleClick}>
            <FiMinusCircle />
            Annuler
          </button>
          <br />
          <span>
            {showAnnulePopup && (
              <PopUpAnnuler
                onClose={closeAnnulePopup}
                onReset={handleNoChangeSubmitted}
              />
            )}
          </span>
        </div>
        <div style={{ minHeight: "150px" }}>
          <button className={popupClassName} onClick={handleValidPopup}>
            <FaCheck />
            Enregistrer
          </button>
          <br />
          <span>
            {showValiderPopUp && (
              <ConfirmationValidation
                onClose={closeValidPopup}
                onSubmit={handleSubmitAllChange}
                onNoSubmit={handleNoChangeSubmitted}
              />
            )}
          </span>
        </div>
      </div>
    </form>
  );
};

export default ModifFicheAvocat;
