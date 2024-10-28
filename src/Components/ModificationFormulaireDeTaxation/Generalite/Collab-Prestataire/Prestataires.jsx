import React, { useState , useEffect} from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import PopupPrestataires from "./PopUpPresta";
import { useUpdateDataContext } from "../../../../Hooks/UpdatedDataContext";

const Prestataires = () => {
  const {prestataires, setPrestataires} = useUpdateDataContext();
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [setude, setEtude] = useState("");
  const [email, setEmail] = useState("");
  const [formationExp, setFormationExp] = useState("");
  const [autresInfo, setAutresInfo] = useState("");
  const [titrePro, setTitrePro] = useState("");
  const [selectedPrestataire, setSelectedPrestataire] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const resetData = () => {
    setName("");
    setPrenom("");
    setEtude("");
    setEmail("");
    setTitrePro("");
    setAutresInfo("");
    setFormationExp("");
    setSelectedPrestataire(null);
  };

  const handleDataFromPopup = (prestataireData) => {
    if (prestataireData.length === 0) {
      resetData();
    }
    if (prestataireData.length > 0) {
      setPrestataires(prestataireData);
      const firstChecked = prestataireData.find((p) => p.checked);
      if (firstChecked) {
        setSelectedPrestataire(prestataireData.indexOf(firstChecked));
        setName(firstChecked.name);
        setPrenom(firstChecked.prenom);
        setEtude(firstChecked.setude);
        setEmail(firstChecked.email);
        setTitrePro(firstChecked.titrePro);
        setAutresInfo(firstChecked.autresInfo);
        setFormationExp(firstChecked.formationExp);
      } else {
        resetData();
      }
    }
    setShowPopup(false);
  };

  const handlePrestataireChange = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex !== "") {
      const selected = prestataires[selectedIndex];
      setName(selected.name);
      setPrenom(selected.prenom);
      setEtude(selected.setude);
      setEmail(selected.email);
      setTitrePro(selected.titrePro);
      setAutresInfo(selected.autresInfo);
      setFormationExp(selected.formationExp);
      setSelectedPrestataire(selectedIndex);
    } else {
      resetData();
    }
  };

  const checkedPrestataires = prestataires.filter((p) => p.checked);
  useEffect(() => {
    if (checkedPrestataires.length > 0) {
      const firstChecked = checkedPrestataires[0];
      setSelectedPrestataire(0); 
      setName(firstChecked.name);
      setPrenom(firstChecked.prenom);
      setEtude(firstChecked.setude);
      setEmail(firstChecked.email);
      setTitrePro(firstChecked.titrePro);
      setAutresInfo(firstChecked.autresInfo);
      setFormationExp(firstChecked.formationExp);
    }
  }, [prestataires]);
  return (
    <div>
      <div className="titleCard">
        <HiUsers style={{ fontSize: "30px", marginRight: "7px" }} />
        PRESTATAIRE(S) EXTERIEUR(S)
      </div>
      <form onSubmit={handleSubmit} className="avocatForm">
        <div className="clientsForm">
          <label htmlFor="client" style={{ display: "inline" }}>
            Prestataire(s) extérieur(s):*
          </label>
          <select
            id="client"
            style={{ width: "23vw" }}
            onChange={handlePrestataireChange}
            value={selectedPrestataire || ""}
          >
            
            {checkedPrestataires.map((prestataire, index) => (
              <option key={index} value={index}>
                {prestataire.name} {prestataire.prenom}
              </option>
            ))}
          </select>

          <div className="btnAdd" onClick={handleShowPopup}>
            <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" value={name} readOnly />
        </div>
        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" value={prenom} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="etude">Etude/Société tierce:</label>
          <input type="text" id="etude" value={setude} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="formation">Formation et expérience professionnelle:</label>
          <textarea id="formation" value={formationExp} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="titrePro">Titre Professionnel:</label>
          <input type="text" id="titrePro" value={titrePro} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="autreInfo">Autres informations:</label>
          <textarea id="autreInfo" value={autresInfo} readOnly />
        </div>
      </form>

      {showPopup && (
        <PopupPrestataires
          onClose={handleClosePopup}
          onSubmitData={handleDataFromPopup}
          prestataires={prestataires}
        />
      )}
    </div>
  );
};

export default Prestataires;
