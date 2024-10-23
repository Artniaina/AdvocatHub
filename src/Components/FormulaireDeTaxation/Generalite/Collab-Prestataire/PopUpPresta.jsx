import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaFileSignature } from "react-icons/fa6";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";

const PopupPrestataires = ({ onClose, onSubmitData }) => {
  const { prestataires } = useGeneraliteContext();

  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [setude, setEtude] = useState("");
  const [titrePro, setTitrePro] = useState("");
  const [formationExp, setFormationExp] = useState("");
  const [autresInfo, setAutresInfo] = useState("");
  const [Prestataires, setPrestataires] = useState(prestataires || []);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); // Track editing index

  const handleChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleUpdateData = (index) => {
    const prestataireToEdit = Prestataires[index];

    if (prestataireToEdit) {
      setName(prestataireToEdit.name);
      setPrenom(prestataireToEdit.prenom);
      setEmail(prestataireToEdit.email);
      setEtude(prestataireToEdit.setude);
      setTitrePro(prestataireToEdit.titrePro);
      setFormationExp(prestataireToEdit.formationExp);
      setAutresInfo(prestataireToEdit.autresInfo);
      setEditingIndex(index); // Set the editing index
    }
  };

  const handleSubmitTable = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedPrestataires = Prestataires.map((prestataire, index) =>
        index === editingIndex
          ? {
              ...prestataire,
              name,
              prenom,
              email,
              setude,
              titrePro,
              formationExp,
              autresInfo,
            }
          : prestataire
      );

      setPrestataires(updatedPrestataires);
      setEditingIndex(null); // Reset editing index
    } else {
      setPrestataires([
        ...Prestataires,
        {
          name,
          prenom,
          email,
          setude,
          titrePro,
          formationExp,
          autresInfo,
          checked: true,
        },
      ]);
    }

    // Reset input fields
    setName("");
    setPrenom("");
    setEmail("");
    setEtude("");
    setTitrePro("");
    setFormationExp("");
    setAutresInfo("");
  };

  const handleCheckboxChange = (index) => {
    const updatedPrestataires = Prestataires.map((Prestataire, i) => {
      if (i === index) {
        return { ...Prestataire, checked: !Prestataire.checked };
      }
      return Prestataire;
    });
    setPrestataires(updatedPrestataires);
  };

  const handleSendData = () => {
    onSubmitData(Prestataires);
    onClose();
  };

  const filteredPrestataires = Prestataires.filter((Prestataire) =>
    Object.keys(filters).every((key) =>
      Prestataire[key]
        ? Prestataire[key].toLowerCase().includes(filters[key].toLowerCase())
        : false
    )
  );

  return (
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
          PRESTATAIRE(S) EXTERIEUR
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmitTable}>
          <div className="avocatForm2">
            {/* Form for adding/updating prestataire */}
            <div className="prestataire">
              <div className="formGroup">
                <label htmlFor="name">Nom*:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="prenom">Prénom* :</label>
                <input
                  type="text"
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="etude">Etude/Société tierce*:</label>
                <input
                  type="text"
                  id="etude"
                  value={setude}
                  onChange={(e) => setEtude(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="email">Email*:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="prestataire">
              <div className="formGroup">
                <label htmlFor="titrePro">Titre Professionnel*:</label>
                <input
                  type="text"
                  id="titrePro"
                  value={titrePro}
                  onChange={(e) => setTitrePro(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="autreInfo">Autre informations:</label>
                <textarea
                  id="autreInfo"
                  value={autresInfo}
                  onChange={(e) => handleChange(e, setAutresInfo)}
                  style={{ height: "50px" }}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="formationExp">Formation et Expérience:</label>
                <textarea
                  id="formationExp"
                  value={formationExp}
                  onChange={(e) => handleChange(e, setFormationExp)}
                  style={{ height: "50px" }}
                />
              </div>
            </div>
          </div>
          <button className="addButton" type="submit">
            {editingIndex !== null ? "Mettre à jour" : "Ajouter"}
          </button>
        </form>

        <div className="tablediv">
          <table className="tavleInfo">
            <thead>
              <tr>
                {[
                  "name",
                  "prenom",
                  "email",
                  "setude",
                  "titrePro",
                  "formationExp",
                  "autresInfo",
                ].map((key) => (
                  <th key={key}>
                    <span className="sort-icon">
                      <PiCaretUpDownFill />
                    </span>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrestataires.map((prestataire, index) => (
                // Conditionally hide the row if it's being edited
                editingIndex === index ? null : (
                  <tr key={index}>
                    <td>{prestataire.name}</td>
                    <td>{prestataire.prenom}</td>
                    <td>{prestataire.email}</td>
                    <td>{prestataire.setude}</td>
                    <td>{prestataire.titrePro}</td>
                    <td>{prestataire.formationExp}</td>
                    <td>{prestataire.autresInfo}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={prestataire.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <FaFileSignature
                        onClick={() => handleUpdateData(index)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={handleSendData}>Envoyer</button>
      </div>
    </div>
  );
};

export default PopupPrestataires;
