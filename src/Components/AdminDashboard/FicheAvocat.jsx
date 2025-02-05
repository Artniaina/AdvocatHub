import React, { useState } from "react";
import { Calendar, User, Briefcase, Building } from "lucide-react";
import '../../Styles/AdminDashboard/fiche.css';

const FicheAvocat = () => {
  const [activeTab, setActiveTab] = useState("personal");

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
                  <input
                    type="tel"
                    className="unique-flex-input"
                  />
                </div>
              </div>

              <div>
                <label className="unique-label">Mobile</label>
                <div className="unique-flex">
                  <select className="unique-select">
                    <option>Luxembourg (+352)</option>
                  </select>
                  <input
                    type="tel"
                    className="unique-flex-input"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="unique-label">E-mail privé</label>
              <input
                type="email"
                className="unique-input"
              />
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
              <input
                type="text"
                defaultValue="1"
                className="unique-input"
              />
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
  "Langues parlées",
  "Activités préférentielles",
  "Titre professionnel d'origine",
].map((label) => (
  <div key={label} className="unique-flex">
    <label className="unique-label">{label}</label>
    <input
      type={label.includes("Date") || label.includes("Passage") ? "date" : "text"}
      className="unique-input"
    />
  </div>
))}

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
                { label: "Dénomination", name: "denomination", defaultValue: "Allen & Overy GP" },
                { label: "Numéro voie", name: "numero_voie", defaultValue: "5" },
                { label: "Adresse", name: "adresse", defaultValue: "avenue J.-F. Kennedy" },
                { label: "Complément adresse", name: "complement_adresse", defaultValue: "avenue J.-F. Kennedy" },
                { label: "Code Postal", name: "code_postal", defaultValue: "L-1855" },
                { label: "Localité", name: "localite", defaultValue: "Luxembourg" },
                { label: "Boite postal", name: "boite_postal", defaultValue: "Luxembourg" },
                { label: "Localité boite postal", name: "localite_boite_postal", defaultValue: "Luxembourg" },
                { label: "Tel Fixe", name: "tel_fixe", defaultValue: "Luxembourg" },
                { label: "Fax", name: "fax", defaultValue: "Luxembourg" },
                { label: "Site web", name: "site_web", defaultValue: "www.allenovery.com", type: "url" },
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
