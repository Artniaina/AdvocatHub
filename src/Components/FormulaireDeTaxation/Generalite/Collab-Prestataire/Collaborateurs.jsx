import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import { IoAddCircle } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import PopupCollaborateurs from "./PopUpCollab";

const Collaborateurs = () => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [etude, setEtude] = useState("");
  const [adresseEtude, setAdresseEtude] = useState("");
  const [dateAssermentation, setDateAssermentation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [selectedAvocats, setSelectedAvocats] = useState([]);

  const handleShowPopup = () => setShowPopup(true);

  const handleClosePopup = () => setShowPopup(false);

  const handleSelectCollaborators = (collaborators, avocatsData) => {
    setSelectedCollaborators(collaborators);
    setSelectedAvocats(avocatsData);
  };

  const handleSelectCollaborator = (e) => {
    const selectedID = parseInt(e.target.value, 10);

    const selectedAvocat = (selectedAvocats || []).find(
      (collaborator) => collaborator.m_nIDAvocat_PP === selectedID
    );

    const formatDate = (dateString) => {
      if (!dateString) return "";
    
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
    
      return `${day}/${month}/${year}`;
    };
    
    if (selectedAvocats && selectedAvocats.length > 0) {
      const selectedAvocat = selectedAvocats[0];
      setName(selectedAvocat.m_sNom || "");
      setPrenom(selectedAvocat.m_sPrenom || "");
      setEtude(selectedAvocat.m_nidetude || "");
      setAdresseEtude(selectedAvocat.m_sadressecomplet || "");
      setDateAssermentation(formatDate(selectedAvocat.m_dDateAssermentation));
      setTelephone(selectedAvocat.m_stelephone || "");
      setEmail(selectedAvocat.m_emailbarreau || "");
    } else if (selectedAvocat) {
      setName(selectedAvocat.m_sNom || "");
      setPrenom(selectedAvocat.m_sPrenom || "");
      setEtude(selectedAvocat.m_nidetude || "");
      setAdresseEtude(selectedAvocat.m_sadressecomplet || "");
      setDateAssermentation(formatDate(selectedAvocat.m_dDateAssermentation));
      setTelephone(selectedAvocat.m_stelephone || "");
      setEmail(selectedAvocat.m_emailbarreau || "");
    } else {
      setName("");
      setPrenom("");
      setEtude("");
      setAdresseEtude("");
      setDateAssermentation("");
      setTelephone("");
      setEmail("");
    }
    }
    

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Collaborator IDs:", selectedCollaborators);
  };

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
            style={{ width: "24vw"}}
            onChange={handleSelectCollaborator}
            aria-label="Select Collaborator"
          >
            <option value="">Selectionner un Collaborateur</option>
            {(selectedAvocats || []).map((collaborator) => (
              <option
                key={collaborator.m_nIDAvocat_PP}
                value={collaborator.m_nIDAvocat_PP}
              >
                {`${collaborator.m_sNom || ""} ${collaborator.m_sPrenom || ""}`}
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
      </form>

      {showPopup && (
        <PopupCollaborateurs
          onClose={handleClosePopup}
          selectedCollaborators={selectedCollaborators}
          onSelectCollaborators={handleSelectCollaborators}
        />
      )}
    </div>
  );
};

export default Collaborateurs;
