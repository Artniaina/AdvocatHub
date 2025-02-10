import React, { useState, useEffect } from "react";
import { Calendar, User, Briefcase, Building, Import } from "lucide-react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { fetchLangues } from "../../../Store/LanguagesSlice";
import { fetchActivities } from "../../../Store/ActivtesPreferentiellesSlice";
import PopUpActiPref from "../../PopUp/PopUpActivPref";
import PopUpLangueParlees from "../../PopUp/PopUpLangueParlees";
import "../../../Styles/AdminDashboard/fiche.css";

const FicheAvocat = ({ mode = "add", initialValue = {} }) => {
  const dispatch = useDispatch();
 const languages = useSelector((state) => state.langues.langues);

  const names = languages.map((language) => language.name);
  const langues =
    initialValue && initialValue.m_langue
      ? initialValue.m_langue.split(",")
      : [];
  const languageSelected =
    initialValue && initialValue.m_langue
      ? initialValue.m_langue.split(",")
      : [];

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
    initialValue && initialValue.m_langue ? initialValue.m_langue : "";
  const languageCodes = convertLanguagesToCodes(LanguageString);

  useEffect(() => {
    dispatch(fetchLangues());
  }, [dispatch]);

  useEffect(() => {
     dispatch(fetchActivities()); 
   }, [dispatch]);
 
 
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
 
   const defaultActivity = (initialValue && initialValue.m_sactivitépref) || [];
   const defaultActivityArray = transformStringToArray(defaultActivity);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(languageCodes || []);
  const [showLanguePopup, setShowLanguePopup] = useState(false);
  const [showActivPrefPopup, setShowActivPrefPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
  });
  useEffect(() => {
    if (initialValue) {
      setSelectedLanguages(languageCodes);
    }
  }, [initialValue]);

  useEffect(() => {
    if (initialValue) {
      setSelectedActivities(defaultActivityArray);
    }
  }, [initialValue]);
  const activity = useSelector((state) => state.activities.activities) || [];
  const countryCodes = useSelector((state) => state.countryCodes.countryCodes);
  useEffect(() => {
    dispatch(fetchLangues());
  }, [dispatch]);

  const handleSubmitActivity = (selected) => {
    setSelectedActivities(selected);
    setShowActivPrefPopup(false);
  };
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return `${dateString.slice(0, 4)}-${dateString.slice(
      4,
      6
    )}-${dateString.slice(6, 8)}`;
  };

  const formatDateForSubmit = (dateString) => {
    if (!dateString) return null;
    return dateString.replace(/-/g, "");
  };

  const [formData, setFormData] = useState({
    m_nidetude: "",
    m_dDateInscription: "",
    m_sNom: "",
    m_sPrenom: "",
    m_Liste: "",
    m_sDénominationEtude: "",
    m_dDateAssermentation: "",
    m_sStatut: "",
    m_sAdresse: "",
    m_sAdresseSuite: "",
    m_sCodePostale: "",
    m_sLocalite: "",
    m_Description: "",
    m_stelephone: "",
    m_sactivitépref: "",
    m_sfax: "",
    m_ssite: "",
    m_langue: "",
    m_dispenseaj: false,
    m_emailbarreau: "",
    m_barreau: "",
    m_numrcs: "",
    m_stype: "",
    m_sFormeSociale: "",
    m_sboitepostal: "",
    m_sCodepostalboitepostal: "",
    m_sLocaliteboitepostal: "",
    m_sLibelleliste: "",
    m_sbarreauorigine: "",
    m_stitreprofessionnel: "",
    m_sadressecomplet: "",
    m_sdenominationsansaccent: "",
    m_sdescriptionsansaccent: "",
    m_sGedEtude: "",
    m_sGedFonction: "",
    m_sformesocialsansaccent: "",
    m_stelephonetri: "",
    m_sNationalite: "",
    m_sSexe: "",
    m_dDateNaissance: "",
    m_sLieuNaissance: "",
    m_sAdressePrivee: "",
    m_sEmailPro: "",
    m_sEmailSecondaire: "",
    m_IBAN: "",
    m_BIC: "",
    m_NumInterne: "",
    m_dDateAvoue: "",
    m_bufPhoto: "",
    m_stelephoneMobile: "",
    m_sObservation: "",
    m_dDateDécès: null,
    m_dDatePassageListe2_Liste4: null,
    m_dDatePassageListe4_Liste1: null,
    m_dDateOmission: null,
    m_dDateDémission: null,
    m_dDateFinSuspension: null,
    m_dDateDébutSuspension: null,
    m_partDom: false,
  });

  useEffect(() => {
    if (mode === "edit" && initialValue) {
      setFormData({
        ...initialValue,
        m_dDateNaissance: formatDateForInput(initialValue.m_dDateNaissance),
        m_dDateAssermentation: formatDateForInput(
          initialValue.m_dDateAssermentation
        ),
        m_dDateAvoue: formatDateForInput(initialValue.m_dDateAvoue),
        m_dDateDébutSuspension: formatDateForInput(
          initialValue.m_dDateDébutSuspension
        ),
        m_dDateFinSuspension: formatDateForInput(
          initialValue.m_dDateFinSuspension
        ),
        m_dDateDémission: formatDateForInput(initialValue.m_dDateDémission),
        m_dDateOmission: formatDateForInput(initialValue.m_dDateOmission),
        m_dDateInscription: formatDateForInput(initialValue.m_dDateInscription),
        m_dDateDécès: formatDateForInput(initialValue.m_dDateDécès),
        m_dDatePassageListe2_Liste4: formatDateForInput(
          initialValue.m_dDatePassageListe2_Liste4
        ),
        m_dDatePassageListe4_Liste1: formatDateForInput(
          initialValue.m_dDatePassageListe4_Liste1
        ),
      });

    }
  }, [mode, initialValue]);

  const handleChange = (field, value) => {
    const isDateField = field.startsWith("m_dDate");

    setFormData((prev) => ({
      ...prev,
      [field]: isDateField ? formatDateForSubmit(value) : value,
      m_sactivitépref: selectedActivities.join(","),
      m_langue: selectedLanguages.join(","),
    }));
  };

  const handleActiviteClick = () => setShowActivPrefPopup(true);
  const closeActivitePopup = () => setShowActivPrefPopup(false);
 
  const handleLangueClick = () => setShowLanguePopup(true);
  const closeLanguePopup = () => setShowLanguePopup(false);
  const handleSubmitLangues = (selected) => {
    setSelectedLanguages(selected);
    setShowLanguePopup(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null });

    if (selectedLanguages.length === 0) {
      setSubmitStatus({
        loading: false,
        error: "Veuillez sélectionner des langues.",
      });
      return;
    }

    try {
      const url =
        mode === "edit"
          ? `http://192.168.10.113/Utilisateur/api/update/ficheAvocat/${initialValue.m_nIDAvocat_PP}`
          : "http://192.168.10.113/Utilisateur/api/add/ficheAvocat";

      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          m_langue: selectedLanguages.join(","),
          m_sactivitépref: selectedActivities.join(","),
          m_stelephone: `${formData.telephonePrefix} ${formData.m_stelephone}`,
          m_stelephoneMobile: `${formData.mobilePrefix} ${formData.m_stelephoneMobile}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      console.log("Succès:", data);
      setSubmitStatus({ loading: false, error: null });
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitStatus({ loading: false, error: error.message });
    }
  };

  const renderDateInput = (label, field) => (
    <div className="unique-flex">
      <label className="unique-label">{label}</label>
      <input
        type="date"
        value={formatDateForInput(formData[field])}
        onChange={(e) => handleChange(field, e.target.value)}
        className="unique-input"
      />
    </div>
  );

  return (
    <div className="unique-container">
      <div className="unique-card">
        <div className="unique-left-section">
          <h1 className="unique-header">
            <User className="unique-icon" />
          </h1>
          <div className="unique-border-box">
            <h1>Informations personnelles</h1>
            <div className="unique-grid">
              <div>
                <label className="unique-label">Nom</label>
                <input
                  type="text"
                  value={formData.m_sNom}
                  onChange={(e) => handleChange("m_sNom", e.target.value)}
                  className="unique-input"
                />
              </div>
              <div>
                <label className="unique-label">Prénom</label>
                <input
                  type="text"
                  value={formData.m_sPrenom}
                  onChange={(e) => handleChange("m_sPrenom", e.target.value)}
                  className="unique-input"
                />
              </div>
              <div>
                <label className="unique-label">Genre M/F</label>
                <select
                  value={formData.m_sSexe}
                  onChange={(e) => handleChange("m_sSexe", e.target.value)}
                  className="unique-input"
                >
                  <option>F</option>
                  <option>M</option>
                </select>
              </div>
              <div>
                <label className="unique-label">Nationalité</label>
                <input
                  type="text"
                  value={formData.m_sNationalite}
                  onChange={(e) =>
                    handleChange("m_sNationalite", e.target.value)
                  }
                  className="unique-input"
                />
              </div>
            </div>
            <div>
              <label className="unique-label">Date de naissance</label>
              <div className="unique-relative">
                <input
                  type="date"
                  value={formatDateForInput(formData.m_dDateNaissance)}
                  onChange={(e) =>
                    handleChange("m_dDateNaissance", e.target.value)
                  }
                  className="unique-input"
                />
                <Calendar className="unique-calendar-icon" />
              </div>
            </div>

            <div>
              <label className="unique-label">Lieu de naissance</label>
              <textarea
                value={formData.m_sLieuNaissance}
                onChange={(e) =>
                  handleChange("m_sLieuNaissance", e.target.value)
                }
                className="unique-textarea"
              />
            </div>
            <div>
              <label className="unique-label">Adresse Privée</label>
              <textarea
                value={formData.m_sAdressePrivee}
                onChange={(e) =>
                  handleChange("m_sAdressePrivee", e.target.value)
                }
                className="unique-textarea"
              />
            </div>

            <div className="unique-grid">
              <div className="unique-grid">
                <div className="telephone-section">
                  <label className="unique-label">Téléphone</label>
                  <div className="unique-flex">
                    <select
                      value={formData.telephonePrefix}
                      onChange={(e) =>
                        handleChange("telephonePrefix", e.target.value)
                      }
                      className="unique-select"
                    >
                      {countryCodes.map((country, index) => (
                        <option
                          key={`${index}-${country.code}`}
                          value={country.code}
                        >
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.m_stelephone}
                      onChange={(e) =>
                        handleChange("m_stelephone", e.target.value)
                      }
                      className="unique-flex-input"
                      placeholder="Enter telephone number"
                    />
                  </div>
                </div>
              </div>
              <div className="mobile-section">
                <label className="unique-label">Mobile</label>
                <div className="unique-flex">
                  <select
                    value={formData.mobilePrefix}
                    onChange={(e) =>
                      handleChange("mobilePrefix", e.target.value)
                    }
                    className="unique-select"
                  >
                    {countryCodes.map((country, index) => (
                      <option
                        key={`${index}-${country.code}`}
                        value={country.code}
                      >
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={formData.m_stelephoneMobile}
                    onChange={(e) =>
                      handleChange("m_stelephoneMobile", e.target.value)
                    }
                    className="unique-flex-input"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="unique-label">E-mail privé</label>
              <input
                type="email"
                value={formData.m_sEmailSecondaire}
                onChange={(e) =>
                  handleChange("m_sEmailSecondaire", e.target.value)
                }
                className="unique-input"
              />
            </div>
            <div>
              <label className="unique-label">Observations</label>
              <textarea
                value={formData.m_sObservation}
                onChange={(e) => handleChange("m_sObservation", e.target.value)}
                className="unique-textarea"
              />
            </div>
            <div>
              <label className="unique-label">IBAN</label>
              <input
                type="text"
                value={formData.m_IBAN}
                onChange={(e) => handleChange("m_IBAN", e.target.value)}
                className="unique-input"
              />
            </div>

            <div>
              <label className="unique-label">BIC</label>
              <input
                type="text"
                value={formData.m_BIC}
                onChange={(e) => handleChange("m_BIC", e.target.value)}
                className="unique-input"
              />
            </div>
          </div>
        </div>

        <div className="unique-right-section">
          <h1 className="unique-header">
            <User className="unique-icon" />
          </h1>
          <div className="unique-border-box">
            <h1>Informations professionnelles</h1>

            <div className="unique-flex">
              <label className="unique-label">Identifiant interne</label>
              <input
                type="text"
                value={formData.m_NumInterne}
                onChange={(e) => handleChange("m_NumInterne", e.target.value)}
                className="unique-input"
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Statut</label>
              <select
                value={formData.m_sStatut}
                onChange={(e) => handleChange("m_sStatut", e.target.value)}
                className="unique-input"
              >
                <option>Inscrit</option>
                <option>Non inscrit</option>
                <option>En cours d'inscription</option>
              </select>
            </div>
            <div className="unique-flex">
              <label className="unique-label">Liste</label>
              <select
                value={formData.m_Liste}
                onChange={(e) => handleChange("m_Liste", e.target.value)}
                className="unique-input"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Dispense AJ</label>
              <input
                type="checkbox"
                checked={formData.m_dispenseaj}
                onChange={(e) => handleChange("m_dispenseaj", e.target.checked)}
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Barreau</label>
              <select
                value={formData.m_barreau}
                onChange={(e) => handleChange("m_barreau", e.target.value)}
                className="unique-input"
              >
                <option>Luxembourg</option>
              </select>
            </div>
            {[
              { label: "E-mail barreau", field: "m_emailbarreau" },
              { label: "E-mail professionnel", field: "m_sEmailPro" },
              {
                label: "Date d'assermentation",
                field: "m_dDateAssermentation",
                type: "date",
              },
              { label: "Date d'avoué", field: "m_dDateAvoue", type: "date" },
              {
                label: "Date de début de suspension",
                field: "m_dDateDébutSuspension",
                type: "date",
              },
              {
                label: "Date de Fin de suspension",
                field: "m_dDateFinSuspension",
                type: "date",
              },
              {
                label: "Date de démission",
                field: "m_dDateDémission",
                type: "date",
              },
              {
                label: "Date d'omission",
                field: "m_dDateOmission",
                type: "date",
              },
              {
                label: "Date de réinscription",
                field: "m_dDateInscription",
                type: "date",
              },
              { label: "Date de décès", field: "m_dDateDécès", type: "date" },
              {
                label: "Passage liste 2-4",
                field: "m_dDatePassageListe2_Liste4",
                type: "date",
              },
              {
                label: "Passage liste 4-1",
                field: "m_dDatePassageListe4_Liste1",
                type: "date",
              },
            ].map(({ label, field, type = "text" }) => (
              <div key={field} className="unique-flex">
                <label className="unique-label">{label}</label>
                {type === "date" ? (
                  <input
                    type="date"
                    value={formatDateForInput(formData[field])}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="unique-input"
                  />
                ) : (
                  <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="unique-input"
                  />
                )}
              </div>
            ))}
              <p style={{ minHeight: "150px" }}>
              Langues parlées:
              <button onClick={handleLangueClick} className="btnadd">
                <BsPlusCircleFill />
              </button>
              
              <span>
                {selectedLanguages.length === 0
                  ? languageCodes.map((code, index) => {
                      const language = languages.find(
                        (lang) => lang.code === code
                      );
                      return (
                        <React.Fragment key={`default-${index}`}>
                          <strong>{language ? language.name : code}</strong>
                          
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
              
              <span>
                {selectedActivities.length === 0
                  ? defaultActivityArray.map((code, index) => {
                      const activites = activity.find(
                        (act) => act.code === code
                      );
                      return (
                        <React.Fragment key={`default-${index}`}>
                          <strong>{activites ? activites.name : code}</strong>
                          
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
          </div>
        </div>

        <div className="unique-third-section">
          <h1 className="unique-header">
            <User className="unique-icon" />
          </h1>
          <div className="unique-border-box">
            <h1>Etude</h1>
            <div className="unique-etude-group">
              {[
                { label: "Dénomination", field: "m_sDénominationEtude" },
                { label: "Adresse", field: "m_sAdresse" },
                { label: "Complément adresse", field: "m_sAdresseSuite" },
                { label: "Code Postal", field: "m_sCodePostale" },
                { label: "Localité", field: "m_sLocalite" },
                { label: "Boite postal", field: "m_sboitepostal" },
                {
                  label: "Localité boite postal",
                  field: "m_sLocaliteboitepostal",
                },
                { label: "Tel Fixe", field: "m_stelephone" },
                { label: "Fax", field: "m_sfax" },
                { label: "Site web", field: "m_ssite", type: "url" },
              ].map(({ label, field, type = "text" }) => (
                <div key={field}>
                  <label className="unique-etude-label">{label}</label>
                  <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="unique-etude-input"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="unique-submit-section">
        <button
          className="unique-submit-button"
          disabled={submitStatus.loading}
          onClick={handleFormSubmit}
        >
          {submitStatus.loading
            ? "Envoi en cours..."
            : mode === "edit"
            ? "Mettre à jour"
            : "Enregistrer"}
        </button>

        {submitStatus.error && (
          <div className="unique-error-message">
            Erreur: {submitStatus.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FicheAvocat;
