import React, { useState, useEffect } from "react";
import { Calendar, User, Briefcase, Building, Import } from "lucide-react";
import "../../Styles/AdminDashboard/fiche.css";
import PopUpActiPref from "../../Components/PopUp/PopUpActivPref";
import PopUpLangueParlees from "../PopUp/PopUpLangueParlees";
import { BsPlusCircleFill } from "react-icons/bs";
import { useSelector , useDispatch} from "react-redux";
import { fetchLangues } from "../../Store/LanguagesSlice";

const FicheAvocat = () => {
    const languages = useSelector((state) => state.langues.langues);
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(fetchLangues());
      }, [dispatch]);
    
    const activity = useSelector((state) => state.activities.activities) || [];
console.log(
    languages
);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguePopup, setShowLanguePopup] = useState(false);
  const [showActivPrefPopup, setShowActivPrefPopup] = useState(false);

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
                  defaultValue="AATTI"
                  className="unique-input"
                />
              </div>
              <div>
                <label className="unique-label">Prénom</label>
                <input
                  type="text"
                  defaultValue="Ghizlane"
                  className="unique-input"
                />
              </div>
              <div>
                <label className="unique-label">Genre M/F</label>
                <select className="unique-input">
                  <option>F</option>
                  <option>M</option>
                </select>
              </div>
              <div>
                <label className="unique-label">Nationalité</label>
                <input
                  type="text"
                  defaultValue="France"
                  className="unique-input"
                />
              </div>
            </div>
            <div>
              <label className="unique-label">Date de naissance</label>
              <div className="unique-relative">
                <input
                  type="text"
                  defaultValue="01-01-1990"
                  className="unique-input"
                />
                <Calendar className="unique-calendar-icon" />
              </div>
            </div>

            <div>
              <label className="unique-label">Lieu de naissance</label>
              <textarea className="unique-textarea" />
            </div>
            <div>
              <label className="unique-label">Adresse Privée</label>
              <textarea className="unique-textarea" />
            </div>

            <div className="unique-grid">
              <div>
                <label className="unique-label">Téléphone</label>
                <div className="unique-flex">
                  <select className="unique-select">
                    <option>Luxembourg (+352)</option>
                  </select>
                  <input type="tel" className="unique-flex-input" />
                </div>
              </div>

              <div>
                <label className="unique-label">Mobile</label>
                <div className="unique-flex">
                  <select className="unique-select">
                    <option>Luxembourg (+352)</option>
                  </select>
                  <input type="tel" className="unique-flex-input" />
                </div>
              </div>
            </div>

            <div>
              <label className="unique-label">E-mail privé</label>
              <input type="email" className="unique-input" />
            </div>
            <div>
              <label className="unique-label">Observations</label>
              <textarea className="unique-textarea" />
            </div>
            <div>
              <label className="unique-label">IBAN</label>
              <input
                type="text"
                defaultValue="FR76 1131 5000 0112 3"
                className="unique-input"
              />
            </div>

            <div>
              <label className="unique-label">BIC</label>
              <input
                type="text"
                defaultValue="CMCIFRPP"
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
              <input type="text" className="unique-input" />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Statut</label>
              <select className="unique-input">
                <option>Inscrit</option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Liste</label>
              <select className="unique-input">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Dispense AJ</label>
              <input type="checkbox" />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Barreau</label>
              <select className="unique-input">
                <option>Luxembourg</option>
              </select>
            </div>
            {[
              "E-mail barreau",
              "E-mail professionnel",
              "Date d'assermentation",
              "Date d'avoué",
              "Date de début de suspension",
              "Date de démission",
              "Date d'omission",
              "Date de réinscription",
              "Date de décès",
              "Passage liste 2-4",
              "Passage liste 4-1",
            ].map((label) => (
              <div key={label} className="unique-flex">
                <label className="unique-label">{label}</label>
                <input
                  type={
                    label.includes("Date") || label.includes("Passage")
                      ? "date"
                      : "text"
                  }
                  className="unique-input"
                />{" "}
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
                  selectedLanguages.map((code, index) => {
                    const language = languages.find(
                      (lang) => lang.code === code
                    );
                    return (
                      <React.Fragment key={index}>
                        <strong>{language ? language.name : code}</strong>
                      </React.Fragment>
                    );
                  })
                )}
                {showLanguePopup && (
                  <PopUpLangueParlees
                    onClose={closeLanguePopup}
                    onSubmit={handleSubmitLangues}
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
                {selectedActivities.length === 0 ? (
                  <strong>Aucune activité sélectionnée</strong>
                ) : (
                  selectedActivities.map((code, index) => {
                    const activite = activity.find((act) => act.code === code);
                    return (
                      <React.Fragment key={index}>
                        <strong>{activite ? activite.name : code}</strong>
                      </React.Fragment>
                    );
                  })
                )}
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
                {
                  label: "Dénomination",
                  name: "denomination",
                  defaultValue: "Allen & Overy GP",
                },
                {
                  label: "Numéro voie",
                  name: "numero_voie",
                  defaultValue: "5",
                },
                {
                  label: "Adresse",
                  name: "adresse",
                  defaultValue: "avenue J.-F. Kennedy",
                },
                {
                  label: "Complément adresse",
                  name: "complement_adresse",
                  defaultValue: "avenue J.-F. Kennedy",
                },
                {
                  label: "Code Postal",
                  name: "code_postal",
                  defaultValue: "L-1855",
                },
                {
                  label: "Localité",
                  name: "localite",
                  defaultValue: "Luxembourg",
                },
                {
                  label: "Boite postal",
                  name: "boite_postal",
                  defaultValue: "Luxembourg",
                },
                {
                  label: "Localité boite postal",
                  name: "localite_boite_postal",
                  defaultValue: "Luxembourg",
                },
                {
                  label: "Tel Fixe",
                  name: "tel_fixe",
                  defaultValue: "Luxembourg",
                },
                { label: "Fax", name: "fax", defaultValue: "Luxembourg" },
                {
                  label: "Site web",
                  name: "site_web",
                  defaultValue: "www.allenovery.com",
                  type: "url",
                },
              ].map(({ label, name, defaultValue, type = "text" }) => (
                <div key={name}>
                  <label className="unique-etude-label">{label}</label>
                  <input
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
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
