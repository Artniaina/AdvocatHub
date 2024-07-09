import React, { useEffect, useState } from "react";
import EtudeIcon from "../../assets/icons8-marqueur-de-plan-48.png";
import ProIcon from "../../assets/icons8-management-en-développement-commercial-100.png";
import PersoIcon from "../../assets/icons8-contrat-de-travail-100(1).png";
import { FaFilePen } from "react-icons/fa6";
import "../../Styles/Homepage/Acceuil/Acceuil.css";
import "../../Styles/Homepage/Acceuil/PopUp.css";
import PopUpAdressePrivee from "../PopUp/PopUpAdressePrivee";
import { BsPlusCircleFill } from "react-icons/bs";
import PopUpAnnuler from "../PopUp/PopUpAnnuler";
import PopUpLangueParlees from "../PopUp/PopUpLangueParlees";
import PopUpActiPref from "../PopUp/PopUpActivPref";
import "../../Styles/PopUp/AdressePriveePopUp.css";
import { FaCheck } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import ConfirmationValidation from "../PopUp/ConfirmationValidation";
import { useNavigate } from "react-router-dom";

const ModifFicheAvocat = ({ avocatInfo, etudeInfo }) => {
  const navigate = useNavigate();

  ////////////////////////////////////LANGUES PARLEES////////////////////////////////
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.5/Utilisateur/LanguesParlees"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des langues parlées");
        }
        const data = await response.json();

        const newLanguages = data.map((langue) => ({
          code: langue.sCodelangue,
          name: langue.slangueparlées,
        }));
        setLanguages(newLanguages);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchLanguages();
  }, []);

  const [languages, setLanguages] = useState([]);
  const names = languages.map((language) => language.name);
  const langues =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(",") : [];
  const languageSelected =
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue.split(",") : [];
  const convertLanguagesToCodes = (languageString) => {
    const languageNames = languageString.split(", ");
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
    avocatInfo && avocatInfo.m_langue ? avocatInfo.m_langue : [];
  const languageCodes = convertLanguagesToCodes(LanguageString);
  const [selectedLanguages, setSelectedLanguages] = useState(languageCodes);

  ////////////////////////////////////ACTIVITES PREFERENTIELLES ////////////////////////////////
  useEffect(() => {
    const fetchActivpref = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.5/Utilisateur/ActivitésPréférentielles"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des activités preferentielles");
        }
        const data = await response.json();

        const newActivity = data.map((activites) => ({
          code: activites.Code,
          name: activites.Valuebar,
        }));
        setActivity(newActivity);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchActivpref();
  }, []);

  const [activity, setActivity] = useState([]);
  console.log(activity);

  ///////////////////////////////////////GESTION DES STATES//////////////////////////////////////////////

  const defaultPhoneNumber = avocatInfo
    ? avocatInfo.m_stelephoneMobile.replace(/^\+\d{3}\s?/, "+")
    : "";
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [selectedCountry, setSelectedCountry] = useState("+261");
  const [emailPrivee, setEmailPrivee] = useState(
    avocatInfo && avocatInfo.m_sEmailSecondaire
  );
  const [emailPro, setEmailPro] = useState(
    avocatInfo && avocatInfo.m_sEmailPro
  );
  const [codeIBAN, setCodeIBAN] = useState(avocatInfo ? avocatInfo.m_IBAN : "");
  const [codeBIC, setCodeBIC] = useState(avocatInfo ? avocatInfo.m_BIC : "");
  const [adresse, setAdresse] = useState(
    avocatInfo && avocatInfo.m_sAdressePrivee
  );
  const [showLanguePopup, setShowLanguePopup] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [showActivPrefPopup, setShowActivPrefPopup] = useState(false);
  const [showDocumentPopup, setShowDocumentPopup] = useState(false);
  const [showValiderPopUp, setShowValiderPopUp] = useState(false);
  const [showAnnulePopup, setShowAnnulePopup] = useState(false);

  //////////////////////////////////GESTION DES POPUPS//////////////////////////////////////////

  const handleValidPopup = (e) => {
    setShowValiderPopUp(true);
    handleSubmitAllChangeform(e, "valider");
  };
  const closeValidPopup = () => {
    setShowValiderPopUp(false);
  };
  const handleAnnuleClick = (e) => {
    setShowAnnulePopup(true);
    handleSubmitAllChangeform(e, "annuler");
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
    setSelectedLanguages(selected);
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

  ////////////////////////////////////////////////////////////////////////////////////////
  const activites =
    avocatInfo && avocatInfo.m_langue
      ? avocatInfo.m_sactivitépref.split(",")
      : [];
  const initialAjState = avocatInfo && avocatInfo.m_dispenseaj;
  const [ajState, setAjState] = useState(initialAjState);
  const toggleAj = () => {
    setAjState((prevState) => (prevState == 1 ? false : true));
  };

  useEffect(() => {
    if (avocatInfo) {
      setCodeIBAN(avocatInfo.m_IBAN);
    }
  }, [avocatInfo]);

  useEffect(() => {
    setAjState(initialAjState);
  }, [initialAjState]);

  const formatPhoneNumber = (number) => {
    number = number.replace(/\D/g, "");
    const formattedNumber = number.replace(
      /(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})/,
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

  ///////////////////////////////////SUBMIT- ONCHANGE///////////////////////////////////////
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
    };

    console.log("Données envoyées:", JSON.stringify(dataToSend));

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
      // setTimeout(() => {
      //   window.location.href = "/home";
      // }, 2000);
    } catch (error) {
      alert("Échec lors de l'enregistrement des modifications");
      console.error(
        "Erreur lors de l'enregistrement des modifications:",
        error
      );
    }
  };

  const handleNoChangeSubmitted = () => {
    setTimeout(() => {
      window.location.href = "/home";
    }, 30000);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////

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
                    <option value="+355">Albanie (+355)</option>
                    <option value="+213">Algérie (+213)</option>
                    <option value="+376">Andorre (+376)</option>
                    <option value="+54">Argentine (+54)</option>
                    <option value="+374">Arménie (+374)</option>
                    <option value="+297">Aruba (+297)</option>
                    <option value="+61">Australie (+61)</option>
                    <option value="+43">Autriche (+43)</option>
                    <option value="+994">Azerbaïdjan (+994)</option>
                    <option value="+1 268">Antigua-et-Barbuda (+1 268)</option>
                    <option value="+1 242">Bahamas (+1 242)</option>
                    <option value="+973">Bahreïn (+973)</option>
                    <option value="+880">Bangladesh (+880)</option>
                    <option value="+1 246">Barbade (+1 246)</option>
                    <option value="+375">Biélorussie (+375)</option>
                    <option value="+32">Belgique (+32)</option>
                    <option value="+501">Belize (+501)</option>
                    <option value="+229">Bénin (+229)</option>
                    <option value="+975">Bhoutan (+975)</option>
                    <option value="+591">Bolivie (+591)</option>
                    <option value="+387">Bosnie-Herzégovine (+387)</option>
                    <option value="+267">Botswana (+267)</option>
                    <option value="+55">Brésil (+55)</option>
                    <option value="+673">Brunei (+673)</option>
                    <option value="+359">Bulgarie (+359)</option>
                    <option value="+226">Burkina Faso (+226)</option>
                    <option value="+257">Burundi (+257)</option>
                    <option value="+855">Cambodge (+855)</option>
                    <option value="+237">Cameroun (+237)</option>
                    <option value="+1">Canada (+1)</option>
                    <option value="+238">Cap-Vert (+238)</option>
                    <option value="+236">
                      République centrafricaine (+236)
                    </option>
                    <option value="+235">Tchad (+235)</option>
                    <option value="+56">Chili (+56)</option>
                    <option value="+86">Chine (+86)</option>
                    <option value="+357">Chypre (+357)</option>
                    <option value="+57">Colombie (+57)</option>
                    <option value="+269">Comores (+269)</option>
                    <option value="+506">Costa Rica (+506)</option>
                    <option value="+385">Croatie (+385)</option>
                    <option value="+53">Cuba (+53)</option>
                    <option value="+599">Curaçao (+599)</option>
                    <option value="+45">Danemark (+45)</option>
                    <option value="+253">Djibouti (+253)</option>
                    <option value="+1 767">Dominique (+1 767)</option>
                    <option value="+1">République dominicaine (+1)</option>
                    <option value="+670">Timor oriental (+670)</option>
                    <option value="+593">Équateur (+593)</option>
                    <option value="+20">Égypte (+20)</option>
                    <option value="+503">Salvador (+503)</option>
                    <option value="+291">Érythrée (+291)</option>
                    <option value="+372">Estonie (+372)</option>
                    <option value="+251">Éthiopie (+251)</option>
                    <option value="+679">Fidji (+679)</option>
                    <option value="+358">Finlande (+358)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+241">Gabon (+241)</option>
                    <option value="+220">Gambie (+220)</option>
                    <option value="+995">Géorgie (+995)</option>
                    <option value="+49">Allemagne (+49)</option>
                    <option value="+233">Ghana (+233)</option>
                    <option value="+350">Gibraltar (+350)</option>
                    <option value="+30">Grèce (+30)</option>
                    <option value="+299">Groenland (+299)</option>
                    <option value="+1 473">Grenade (+1 473)</option>
                    <option value="+502">Guatemala (+502)</option>
                    <option value="+224">Guinée (+224)</option>
                    <option value="+245">Guinée-Bissau (+245)</option>
                    <option value="+592">Guyana (+592)</option>
                    <option value="+509">Haïti (+509)</option>
                    <option value="+504">Honduras (+504)</option>
                    <option value="+852">Hong Kong (+852)</option>
                    <option value="+36">Hongrie (+36)</option>
                    <option value="+354">Islande (+354)</option>
                    <option value="+91">Inde (+91)</option>
                    <option value="+62">Indonésie (+62)</option>
                    <option value="+98">Iran (+98)</option>
                    <option value="+964">Irak (+964)</option>
                    <option value="+353">Irlande (+353)</option>
                    <option value="+44">Royaume-Uni (+44)</option>
                    <option value="+972">Israël (+972)</option>
                    <option value="+39">Italie (+39)</option>
                    <option value="+225">Côte d'Ivoire (+225)</option>
                    <option value="+1 876">Jamaïque (+1 876)</option>
                    <option value="+81">Japon (+81)</option>
                    <option value="+962">Jordanie (+962)</option>
                    <option value="+7">Kazakhstan (+7)</option>
                    <option value="+254">Kenya (+254)</option>
                    <option value="+686">Kiribati (+686)</option>
                    <option value="+965">Koweït (+965)</option>
                    <option value="+996">Kirghizistan (+996)</option>
                    <option value="+856">Laos (+856)</option>
                    <option value="+371">Lettonie (+371)</option>
                    <option value="+961">Liban (+961)</option>
                    <option value="+266">Lesotho (+266)</option>
                    <option value="+231">Liberia (+231)</option>
                    <option value="+218">Libye (+218)</option>
                    <option value="+423">Liechtenstein (+423)</option>
                    <option value="+370">Lituanie (+370)</option>
                    <option value="+352">Luxembourg (+352)</option>
                    <option value="+853">Macao (+853)</option>
                    <option value="+389">Macédoine du Nord (+389)</option>
                    <option value="+261">Madagascar (+261)</option>
                    <option value="+265">Malawi (+265)</option>
                    <option value="+60">Malaisie (+60)</option>
                    <option value="+960">Maldives (+960)</option>
                    <option value="+223">Mali (+223)</option>
                    <option value="+356">Malte (+356)</option>
                    <option value="+692">Îles Marshall (+692)</option>
                    <option value="+222">Mauritanie (+222)</option>
                    <option value="+230">Maurice (+230)</option>
                    <option value="+262">Mayotte (+262)</option>
                    <option value="+52">Mexique (+52)</option>
                    <option value="+691">
                      États fédérés de Micronésie (+691)
                    </option>
                    <option value="+373">Moldavie (+373)</option>
                    <option value="+377">Monaco (+377)</option>
                    <option value="+976">Mongolie (+976)</option>
                    <option value="+382">Monténégro (+382)</option>
                    <option value="+212">Maroc (+212)</option>
                    <option value="+258">Mozambique (+258)</option>
                    <option value="+264">Namibie (+264)</option>
                    <option value="+674">Nauru (+674)</option>
                    <option value="+977">Népal (+977)</option>
                    <option value="+31">Pays-Bas (+31)</option>
                    <option value="+687">Nouvelle-Calédonie (+687)</option>
                    <option value="+64">Nouvelle-Zélande (+64)</option>
                    <option value="+505">Nicaragua (+505)</option>
                    <option value="+227">Niger (+227)</option>
                    <option value="+234">Nigeria (+234)</option>
                    <option value="+683">Niue (+683)</option>
                    <option value="+47">Norvège (+47)</option>
                    <option value="+968">Oman (+968)</option>
                    <option value="+92">Pakistan (+92)</option>
                    <option value="+680">Palaos (+680)</option>
                    <option value="+970">Palestine (+970)</option>
                    <option value="+507">Panama (+507)</option>
                    <option value="+675">
                      Papouasie-Nouvelle-Guinée (+675)
                    </option>
                    <option value="+595">Paraguay (+595)</option>
                    <option value="+51">Pérou (+51)</option>
                    <option value="+63">Philippines (+63)</option>
                    <option value="+48">Pologne (+48)</option>
                    <option value="+351">Portugal (+351)</option>
                    <option value="+1 787">Porto Rico (+1 787)</option>
                    <option value="+974">Qatar (+974)</option>
                    <option value="+40">Roumanie (+40)</option>
                    <option value="+7">Russie (+7)</option>
                    <option value="+250">Rwanda (+250)</option>
                    <option value="+290">Sainte-Hélène (+290)</option>
                    <option value="+1 869">
                      Saint-Christophe-et-Niévès (+1 869)
                    </option>
                    <option value="+1 758">Sainte-Lucie (+1 758)</option>
                    <option value="+508">
                      Saint-Pierre-et-Miquelon (+508)
                    </option>
                    <option value="+1 784">
                      Saint-Vincent-et-les-Grenadines (+1 784)
                    </option>
                    <option value="+685">Samoa (+685)</option>
                    <option value="+378">Saint-Marin (+378)</option>
                    <option value="+239">Sao Tomé-et-Principe (+239)</option>
                    <option value="+966">Arabie saoudite (+966)</option>
                    <option value="+221">Sénégal (+221)</option>
                    <option value="+381">Serbie (+381)</option>
                    <option value="+248">Seychelles (+248)</option>
                    <option value="+232">Sierra Leone (+232)</option>
                    <option value="+65">Singapour (+65)</option>
                    <option value="+421">Slovaquie (+421)</option>
                    <option value="+386">Slovénie (+386)</option>
                    <option value="+677">Îles Salomon (+677)</option>
                    <option value="+252">Somalie (+252)</option>
                    <option value="+27">Afrique du Sud (+27)</option>
                    <option value="+211">Soudan du Sud (+211)</option>
                    <option value="+34">Espagne (+34)</option>
                    <option value="+94">Sri Lanka (+94)</option>
                    <option value="+249">Soudan (+249)</option>
                    <option value="+597">Suriname (+597)</option>
                    <option value="+268">Eswatini (+268)</option>
                    <option value="+46">Suède (+46)</option>
                    <option value="+41">Suisse (+41)</option>
                    <option value="+963">Syrie (+963)</option>
                    <option value="+886">Taïwan (+886)</option>
                    <option value="+992">Tadjikistan (+992)</option>
                    <option value="+255">Tanzanie (+255)</option>
                    <option value="+66">Thaïlande (+66)</option>
                    <option value="+670">Timor oriental (+670)</option>
                    <option value="+228">Togo (+228)</option>
                    <option value="+676">Tonga (+676)</option>
                    <option value="+1 868">Trinité-et-Tobago (+1 868)</option>
                    <option value="+216">Tunisie (+216)</option>
                    <option value="+90">Turquie (+90)</option>
                    <option value="+993">Turkménistan (+993)</option>
                    <option value="+688">Tuvalu (+688)</option>
                    <option value="+256">Ouganda (+256)</option>
                    <option value="+380">Ukraine (+380)</option>
                    <option value="+971">Émirats arabes unis (+971)</option>
                    <option value="+44">Royaume-Uni (+44)</option>
                    <option value="+1">États-Unis (+1)</option>
                    <option value="+598">Uruguay (+598)</option>
                    <option value="+998">Ouzbékistan (+998)</option>
                    <option value="+678">Vanuatu (+678)</option>
                    <option value="+379">Cité du Vatican (+379)</option>
                    <option value="+58">Venezuela (+58)</option>
                    <option value="+84">Vietnam (+84)</option>
                    <option value="+967">Yémen (+967)</option>
                    <option value="+260">Zambie (+260)</option>
                    <option value="+263">Zimbabwe (+263)</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    defaultValue={defaultPhoneNumber}
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
                className="modifInput"
                type="text"
                defaultValue={avocatInfo && avocatInfo.m_sEmailSecondaire}
                onChange={(e) => setEmailPrivee(e.target.value)}
              />
            </p>

            <p>
              IBAN:
              <input
                className="modifInput"
                type="text"
                defaultValue={avocatInfo && avocatInfo.m_IBAN}
                value={codeIBAN}
                onChange={(e) => setCodeIBAN(e.target.value)}
              />
            </p>
            <p>
              Code BIC
              <input
                className="modifInput"
                type="text"
                value={codeBIC}
                onChange={(e) => setCodeBIC(e.target.value)}
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
                className="modifInput"
                type="text"
                defaultValue={avocatInfo && avocatInfo.m_sEmailPro}
                onChange={(e) => setEmailPro(e.target.value)}
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
                {selectedActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <strong>{activity.name}</strong>
                    <br />
                  </React.Fragment>
                ))}
                {showActivPrefPopup && (
                  <PopUpActiPref
                    onClose={closeActivitePopup}
                    onSubmit={handleSubmitActivity}
                    value={selectedActivities}
                    activity={activity}
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
          <button className="btnsub" onClick={handleValidPopup}>
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
