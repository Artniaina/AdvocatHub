import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModifMdp from "./ModifMdp";
import { HiArrowSmallLeft } from "react-icons/hi2";
import GestionErreurPopUp from "../../Components/PopUp/GestionErreurPopUp";

const VerifEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGoBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setMessageErreur("Veuillez entrer votre email.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://192.168.10.105/Utilisateur/Modif", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ SAdresseEmail: formData.email }),
      });
      if (!response.ok) throw new Error("Email inexistante");
      navigate(`/modifmdp?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      setShowPopup(true);
      setMessageErreur("Email non trouvé.");
    }
  };

  return (
    <div style={styles.wrapper}>
      {!successMessage && (
        <div style={styles.formContainer}>
          <button onClick={handleGoBack} style={styles.backButton}>
            <HiArrowSmallLeft style={{ fontSize: 20 }} />
          </button>
          <h2 style={styles.title}>Mot de passe oublié ?</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={styles.label}>
              Vérification de votre email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>
              Vérifier
            </button>
          </form>
        </div>
      )}
      {showPopup && (
        <GestionErreurPopUp
          messageErreur={messageErreur}
          closePopup={() => setShowPopup(false)}
        />
      )}
      {successMessage && <ModifMdp email={formData.email} />}
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "22px",
    color: "#5E1675",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "10px",
    color: "#333",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "20px",
    outline: "none",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#5E1675",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "background-color 0.3s",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#E1E1E1",
    color: "#5E1675",
    border: "1px solid #5E1675",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#5E1675",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "20px",
  },
};

export default VerifEmail;
