import React, { useState, useEffect } from "react";
import { Calendar, User, Briefcase, Building, Import } from "lucide-react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { fetchLangues } from "../../Store/LanguagesSlice";
import { fetchActivities } from "../../Store/ActivtesPreferentiellesSlice";
import PopUpActiPref from "../../Components/PopUp/PopUpActivPref";
import PopUpLangueParlees from "../PopUp/PopUpLangueParlees";
import "../../Styles/AdminDashboard/fiche.css";

const FicheAvocat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLangues());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const languages = useSelector((state) => state.langues.langues);
  const activity = useSelector((state) => state.activities.activities) || [];
  const countryCodes = useSelector((state) => state.countryCodes.countryCodes);

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
    m_partDom: false
 });

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguePopup, setShowLanguePopup] = useState(false);
  const [showActivPrefPopup, setShowActivPrefPopup] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleActiviteClick = () => setShowActivPrefPopup(true);
  const closeActivitePopup = () => setShowActivPrefPopup(false);
  const handleSubmitActivity = (selected) => {
    setSelectedActivities(selected);
    setShowActivPrefPopup(false);
    console.log("Selected Activities:", selected);
  };

  const handleLangueClick = () => setShowLanguePopup(true);
  const closeLanguePopup = () => setShowLanguePopup(false);
  const handleSubmitLangues = (selected) => {
    setSelectedLanguages(selected);
    setShowLanguePopup(false);
    console.log("Selected Languages:", selected);
  };
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
                  value={formData.nom}
                  onChange={(e) => handleChange("nom", e.target.value)}
                  className="unique-input"
                />
              </div>
              <div>
                <label className="unique-label">Prénom</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                  className="unique-input"
                />
              </div>
              <div>
                <label className="unique-label">Genre M/F</label>
                <select
                  value={formData.genre}
                  onChange={(e) => handleChange("genre", e.target.value)}
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
                  value={formData.nationalite}
                  onChange={(e) => handleChange("nationalite", e.target.value)}
                  className="unique-input"
                />
              </div>
            </div>
            <div>
              <label className="unique-label">Date de naissance</label>
              <div className="unique-relative">
                <input
                  type="text"
                  value={formData.dateNaissance}
                  onChange={(e) =>
                    handleChange("dateNaissance", e.target.value)
                  }
                  className="unique-input"
                />
                <Calendar className="unique-calendar-icon" />
              </div>
            </div>

            <div>
              <label className="unique-label">Lieu de naissance</label>
              <textarea
                value={formData.lieuNaissance}
                onChange={(e) => handleChange("lieuNaissance", e.target.value)}
                className="unique-textarea"
              />
            </div>
            <div>
              <label className="unique-label">Adresse Privée</label>
              <textarea
                value={formData.adressePrivee}
                onChange={(e) => handleChange("adressePrivee", e.target.value)}
                className="unique-textarea"
              />
            </div>

            <div className="unique-grid">
              <div>
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
                      <option key={`${index}-${country.code}`}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                    className="unique-flex-input"
                  />
                </div>
              </div>

              <div>
                <label className="unique-label">Mobile</label>
                <div className="unique-flex">
                  <select
                    value={formData.mobilePrefix}
                    onChange={(e) =>
                      handleChange("mobilePrefix", e.target.value)
                    }
                    className="unique-select"
                  >
                    <option>Luxembourg (+352)</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    className="unique-flex-input"
                  />
                </div>
              </div>
            </div>
            <div className="unique-grid">
              <div className="unique-grid">
                <div className="telephone-section">
                  <label className="unique-label">Telephone</label>
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
                      value={formData.telephone}
                      onChange={(e) =>
                        handleChange("telephone", e.target.value)
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
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
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
                value={formData.emailPrive}
                onChange={(e) => handleChange("emailPrive", e.target.value)}
                className="unique-input"
              />
            </div>
            <div>
              <label className="unique-label">Observations</label>
              <textarea
                value={formData.observations}
                onChange={(e) => handleChange("observations", e.target.value)}
                className="unique-textarea"
              />
            </div>
            <div>
              <label className="unique-label">IBAN</label>
              <input
                type="text"
                value={formData.iban}
                onChange={(e) => handleChange("iban", e.target.value)}
                className="unique-input"
              />
            </div>

            <div>
              <label className="unique-label">BIC</label>
              <input
                type="text"
                value={formData.bic}
                onChange={(e) => handleChange("bic", e.target.value)}
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
                value={formData.identifiantInterne}
                onChange={(e) =>
                  handleChange("identifiantInterne", e.target.value)
                }
                className="unique-input"
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Statut</label>
              <select
                value={formData.statut}
                onChange={(e) => handleChange("statut", e.target.value)}
                className="unique-input"
              >
                <option>Inscrit</option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Liste</label>
              <select
                value={formData.liste}
                onChange={(e) => handleChange("liste", e.target.value)}
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
                checked={formData.dispenseAJ}
                onChange={(e) => handleChange("dispenseAJ", e.target.checked)}
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Barreau</label>
              <select
                value={formData.barreau}
                onChange={(e) => handleChange("barreau", e.target.value)}
                className="unique-input"
              >
                <option>Luxembourg</option>
              </select>
            </div>

            {[
              { label: "E-mail barreau", field: "emailBarreau" },
              { label: "E-mail professionnel", field: "emailProfessionnel" },
              {
                label: "Date d'assermentation",
                field: "dateAssermentation",
                type: "date",
              },
              { label: "Date d'avoué", field: "dateAvoue", type: "date" },
              {
                label: "Date de début de suspension",
                field: "dateDebutSuspension",
                type: "date",
              },
              {
                label: "Date de démission",
                field: "dateDemission",
                type: "date",
              },
              { label: "Date d'omission", field: "dateOmission", type: "date" },
              {
                label: "Date de réinscription",
                field: "dateReinscription",
                type: "date",
              },
              { label: "Date de décès", field: "dateDeces", type: "date" },
              {
                label: "Passage liste 2-4",
                field: "passageListe24",
                type: "date",
              },
              {
                label: "Passage liste 4-1",
                field: "passageListe41",
                type: "date",
              },
            ].map(({ label, field, type = "text" }) => (
              <div key={field} className="unique-flex">
                <label className="unique-label">{label}</label>
                <input
                  type={type}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="unique-input"
                />
              </div>
            ))}

            <div>
              Langues parlées:
              <button onClick={handleLangueClick} className="btnadd">
                <BsPlusCircleFill />
              </button>
              <span>
                {selectedLanguages.length === 0 ? (
                  <strong>Aucune langue sélectionnée</strong>
                ) : (
                  selectedLanguages.map((code) => {
                    const language = languages.find(
                      (lang) => lang.code === code
                    );
                    return (
                      <React.Fragment key={language ? language.code : code}>
                        <strong>{language ? language.name : code}</strong>
                      </React.Fragment>
                    );
                  })
                )}
                {showLanguePopup && (
                  <PopUpLangueParlees
                    onClose={closeLanguePopup}
                    onSubmit={handleSubmitLangues}
                    defaultLangue= {[]}
                    value={selectedLanguages}
                    languages={languages}
                  />
                )}
              </span>
            </div>

            <div>
              Activités préférentielles:
              <button onClick={handleActiviteClick} className="btnadd">
                <BsPlusCircleFill />
              </button>
              <span>
                {selectedActivities.map((code) => {
                  const activite = activity.find((act) => act.code === code);
                  return (
                    <React.Fragment key={activite ? activite.code : code}>
                      <strong>{activite ? activite.name : code}</strong>
                    </React.Fragment>
                  );
                })}

                {showActivPrefPopup && (
                  <PopUpActiPref
                    onClose={closeActivitePopup}
                    onSubmit={handleSubmitActivity}
                    value={selectedActivities}
                    activity={activity}
                  />
                )}
              </span>
            </div>
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
                { label: "Dénomination", field: "denomination" },
                { label: "Numéro voie", field: "numeroVoie" },
                { label: "Adresse", field: "adresse" },
                { label: "Complément adresse", field: "complementAdresse" },
                { label: "Code Postal", field: "codePostal" },
                { label: "Localité", field: "localite" },
                { label: "Boite postal", field: "boitePostal" },
                {
                  label: "Localité boite postal",
                  field: "localiteBoitePostal",
                },
                { label: "Tel Fixe", field: "telFixe" },
                { label: "Fax", field: "fax" },
                { label: "Site web", field: "siteWeb", type: "url" },
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
    </div>
  );
};

export default FicheAvocat;
