import React, { useState } from "react";
import { Building, Info, AlertTriangle } from "lucide-react";
import "../../../Styles/AdminDashboard/fiche.css";
import GestionErreurPopUp from "../../PopUp/GestionErreurPopUp";

const FicheEtude = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [messageErreur, setMessageErreur]=useState("")
  const [formData, setFormData] = useState({
    m_nidetude: "",
    m_dDateInscription: "",
    m_sNom: "",
    m_sPrenom: "",
    m_sStatut: "Inscrite", 
    m_sFormeSociale: "", 
    m_Liste: "1",
    m_sDénominationEtude: "",
    m_sGEDEtude: "",
    m_dDateAssermentation: "",
    m_nNumVoie: "",
    m_sAdresse: "",
    m_sAdresseSuite: "",
    m_sCodePostale: "",
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
    m_sboitepostal: "",
    m_sLocalite: "",
    m_sCodepostalboitepostal: "",
    m_sLocaliteboitepostal: "",
    m_sLibelleliste: "",
    m_sbarreauorigine: "",
    m_stitreprofessionnel: "",
    m_sadressecomplet: "",
    m_sdenominationsansaccent: "",
    m_sdescriptionsansaccent: "",
    m_sformesocialsansaccent: "",
    m_stelephonetri: "",
    m_sNationalite: "",
    m_sSexe: "",
    m_sObservation: "",
    m_sEnseigne: "",
    m_nGenreEtude: "",
    m_dDateNaissance: "",
    m_sLieuNaissance: "",
    m_sAdressePrivee: "",
    m_sEmailSecondaire: "",
    m_IBAN: "",
    m_BIC: "",
    m_NumInterne: "",
    m_dDateAvoue: "",
    m_bufPhoto: "",
    m_stelephoneMobile: "",
    m_partDom: false,
  });
   
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setFormData((prev) => ({
        ...prev,
        m_sType: "Société d'avocats",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        m_sType: "",
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "m_sFormeSociale" && value === "société civile" ? "" : value,
    }));
    
    if (errors[name]) {
      const newErrors = {...errors};
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {


    try {
      const response = await fetch(
        "http://192.168.10.113/Utilisateur/api/add/ficheEtude",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="unique-container">
      <div className="unique-header">
        <Building className="unique-icon" />
        <h1>4500 S.à r.l.</h1>
      </div>

      <div className="unique-card">
        <form className="unique-left-section">
          <div className="unique-border-box">
            <div className="unique-section-header">
              <Info className="unique-icon" />
              <span>Informations générales</span>
            </div>

            <div className="unique-flex">
              <label className="unique-label">ID Étude</label>
              <input
                type="text"
                name="m_nidetude"
                value={formData.m_nidetude}
                onChange={handleChange}
                className="unique-input"
              />
            </div>
            <div className="unique-flex">
              <label className="unique-label">Dénomination Etude</label>
              <input
                type="text"
                name="m_sDénominationEtude"
                value={formData.m_sDénominationEtude}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Statut</label>
              <select
                name="m_sStatut"
                value={formData.m_sStatut}
                onChange={handleChange}
                className="unique-select"
              >
                <option value="Inscrite">Inscrite</option>
                <option value="Non inscrite">Non inscrite</option>
                <option value="En cours d'inscription">
                  En cours d'inscription
                </option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Numéro interne</label>
              <input
                type="text"
                name="m_NumInterne"
                value={formData.m_NumInterne}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Genre</label>
              <input
                type="text"
                name="m_nGenreEtude"
                value={formData.m_nGenreEtude}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Numéro</label>
              <input
                type="text"
                name="m_nNumVoie"
                value={formData.m_nNumVoie}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Adresse</label>
              <input
                type="text"
                name="m_sAdresse"
                value={formData.m_sAdresse}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Complement d'adresse</label>
              <input
                type="text"
                name="m_sAdresseSuite"
                value={formData.m_sAdresseSuite}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Code postal</label>
              <input
                type="text"
                name="m_sCodePostale"
                value={formData.m_sCodePostale}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Localité</label>
              <input
                type="text"
                name="m_sLocalite"
                value={formData.m_sLocalite}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Barreau</label>
              <input
                type="text"
                name="m_barreau"
                value={formData.m_barreau}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Code postal boite postale</label>
              <input
                type="text"
                name="m_sCodepostalboitepostal"
                value={formData.m_sCodepostalboitepostal}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Localité boîte postale</label>
              <input
                type="text"
                name="m_sLocaliteboitepostal"
                value={formData.m_sLocaliteboitepostal}
                onChange={handleChange}
                className="unique-input"
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Téléphone fixe</label>
              <input
                type="tel"
                name="m_stelephone"
                value={formData.m_stelephone}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">N° de téléphone mobile</label>
              <input
                type="tel"
                name="m_stelephoneMobile"
                value={formData.m_stelephoneMobile}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Fax</label>
              <input
                type="text"
                name="m_sfax"
                value={formData.m_sfax}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Email</label>
              <input
                type="email"
                name="m_sEmailSecondaire"
                value={formData.m_sEmailSecondaire}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">URL site web</label>
              <input
                type="text"
                name="m_ssite"
                value={formData.m_ssite}
                onChange={handleChange}
                className="unique-input"
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Observation</label>
              <textarea
                name="m_sObservation"
                value={formData.m_sObservation}
                onChange={handleChange}
                className="unique-textarea"
                required
              />
            </div>
          </div>

          <div className={`unique-border-box ${!isChecked ? "disabled" : ""}`}>
            <div className="unique-flex">
              <label className="unique-label">
                <div className="unique-section-header">
                  <span>Société d'avocats</span>
                </div>
              </label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Forme sociale</label>
              <select
                name="m_sFormeSociale"
                value={formData.m_sFormeSociale}
                onChange={handleChange}
                className="unique-select"
                disabled={!isChecked}
              >
                <option value="société civile">société civile</option>
                <option value="société en commandite simple">
                  société en commandite simple
                </option>
                <option value="société à responsabilité limitée">
                  société à responsabilité limitée
                </option>
                <option value="société anonyme">société anonyme</option>
                <option value="société de droit étranger">
                  société de droit étranger
                </option>
                <option value="Société coopérative organisée comme une société anonyme">
                  Société coopérative organisée comme une société anonyme
                </option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Numéro RCS</label>
              <input
                type="text"
                name="m_numrcs"
                value={formData.m_numrcs}
                onChange={handleChange}
                className="unique-input"
                disabled={!isChecked}
                required
              />
            </div>

            <div className="unique-flex">
              <label className="unique-label">Liste</label>
              <select
                name="m_Liste"
                value={formData.m_Liste}
                onChange={handleChange}
                className="unique-select"
                disabled={!isChecked}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="unique-flex">
              <label className="unique-label">Email barreau</label>
              <input
                type="email"
                name="m_emailbarreau"
                value={formData.m_emailbarreau}
                onChange={handleChange}
                className="unique-input"
                disabled={!isChecked}
                required
              />
            </div>
          </div>
        </form>

        <div className="unique-right-section">

          <h1>
            Avocat associé avec l'Etude
          </h1>
          <table className="unique-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email barreau</th>
                <th>Date sermentation</th>
                <th>Liste</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CARRASCOSA GIL</td>
                <td>Maria</td>
                <td>maria.carrascosagil@barreau.lu</td>
                <td>17-02-2022</td>
                <td>1</td>
                <td>811</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <GestionErreurPopUp messageErreur= {messageErreur} closePopup={closePopup} />
)}

      <div className="unique-button-group">
        <button className="unique-button primary" onClick={handleSubmit} >
          Enregistrer
        </button>
        <button className="unique-button primary">Consulter le dossier</button>
        <button className="unique-button secondary">Fermer</button>
      </div>
    </div>
  );
};
export default FicheEtude;
