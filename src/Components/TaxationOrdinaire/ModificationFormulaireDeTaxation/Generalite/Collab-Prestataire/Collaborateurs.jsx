import React, { useState, useEffect } from "react";
import "../../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import PopupCollaborateurs from "./PopUpCollab";
import { useUpdateDataContext } from "../../../../../Hooks/UpdatedDataContext";

const Collaborateurs = () => {
  const { selectedAvocats, setSelectedAvocats } = useUpdateDataContext();
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [etude, setEtude] = useState("");
  const [adresseEtude, setAdresseEtude] = useState("");
  const [dateAssermentation, setDateAssermentation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [isInscrit, setIsInscrit] = useState(false);

  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => {
    resetFields();
    setShowPopup(false);
  };

  const handleSelectCollaborators = (collaborators, avocatsData) => {
    setSelectedCollaborators(collaborators);
    setSelectedAvocats(avocatsData);
  };

  const handleSelectCollaborator = (e) => {
    const selectedID = parseInt(e.target.value, 10);
    populateFields(selectedID);
  };

  const populateFields = (selectedID) => {
    const selectedAvocat = selectedAvocats.find((collaborator) => collaborator.id === selectedID);
  
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    };
  
    if (selectedAvocat) {
      setName(selectedAvocat.nom || "");
      setPrenom(selectedAvocat.prenom || "");
      setEtude(selectedAvocat.etude || "");
      setAdresseEtude(selectedAvocat.adresse || "");
      setDateAssermentation(formatDate(selectedAvocat.dateAssermentation || ""));
      setTelephone(selectedAvocat.telephone || "");
      setEmail(selectedAvocat.email || "");
      setIsInscrit(selectedAvocat.isInscrit === "Inscrit");

      
    } else {
      console.warn("Selected Avocat not found for ID:", selectedID);
      resetFields(); 
    }
  };


  const resetFields = () => {
    setName("");
    setPrenom("");
    setEtude("");
    setAdresseEtude("");
    setDateAssermentation("");
    setTelephone("");
    setEmail("");
    setIsInscrit(false);
  };

  useEffect(() => {
    if (selectedCollaborators.length > 0) {
      populateFields(selectedCollaborators[0]);
    } else if (selectedAvocats.length > 0) {
      populateFields(selectedAvocats[0].id);
    } else {
      resetFields();
    }
  }, [selectedCollaborators, selectedAvocats]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let collaboratorIds;
  if (selectedCollaborators.length === 0) {
    collaboratorIds = selectedAvocats.map((collaborator) => collaborator.id);
  } else {
    collaboratorIds = selectedCollaborators;
  }

  return (
    <div>
      <div className="titleCard">
        <FaUsers style={{ fontSize: "30px", marginRight: "7px" }} />
        COLLABORATEUR(S) INSCRIT(S) OU NON INSCRIT(S)
      </div>
      <form onSubmit={handleSubmit} className="avocatForm">
        <div className="clientsForm">
          <label style={{ display: "inline" }} htmlFor="client">
            Liste Collaborateur(s):*{" "}
          </label>
          <select
            id="client"
            style={{ width: "24vw" }}
            onChange={handleSelectCollaborator}
            aria-label="Select Collaborator"
          >
            {(selectedAvocats || []).map((collaborator) => (
              <option
                key={collaborator.id}
                value={collaborator.id}
              >
                {`${collaborator.nom || ""} ${collaborator.prenom || ""}`}
              </option>
            ))}
          </select>

          <div className="btnAdd" onClick={handleShowPopup}>
            <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="etude">Etude:</label>
          <input
            type="text"
            id="etude"
            value={etude}
            onChange={(e) => setEtude(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="adresseEtude">Adresse Etude:</label>
          <input
            type="text"
            id="adresseEtude"
            value={adresseEtude}
            onChange={(e) => setAdresseEtude(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="dateAssermentation">Date Assermentation:</label>
          <input
            type="text"
            id="dateAssermentation"
            value={dateAssermentation}
            onChange={(e) => setDateAssermentation(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="telephone">Téléphone:</label>
          <input
            type="text"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>
        <div className="formGroup">
          <label htmlFor="isInscrit">Inscrit:</label>
          <input
            type="checkbox"
            id="isInscrit"
            checked={isInscrit}
            readOnly
          />
        </div>
      </form>

      {showPopup && (
        <PopupCollaborateurs
          onClose={handleClosePopup}
          selectedCollaborator={collaboratorIds}
          onSelectCollaborators={handleSelectCollaborators}
        />
      )}
    </div>
  );
};

export default Collaborateurs;
