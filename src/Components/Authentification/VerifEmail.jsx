import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModifMdp from "./ModifMdp";
import { HiArrowSmallLeft } from "react-icons/hi2";

const VerifEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const formattedData = {
        SAdresseEmail: formData.email,
      };

      const response = await fetch("http://192.168.10.5/Utilisateur/Modif", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Email inexistante");
      }

      setSuccessMessage("Compte modifié avec succès !");
      console.log(`Succès, données: email: ${formData.email}`);
    } catch (error) {
      setError("Email non trouvé");
      console.log("Email non trouvé :", error);
    }
  };

  return (
    <div className="headerAuthent">
      {!successMessage && (
        <>
          <button onClick={handleGoBack} style={styles.buttongoback}>
            <HiArrowSmallLeft style={{ fontSize: 20 }} />
          </button>
          <h2 className="App"> Mot de passe oublié?</h2>
          {error && (
            <p
              style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            >
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} style={styles.container}>
            <div>
              <label htmlFor="email" className="label">
                Vérification de votre email
              </label>
              <br />
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button style={styles.button} type="submit">
              Vérifier
            </button>
          </form>
        </>
      )}
      {successMessage && <ModifMdp email={formData.email} />}
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  input: {
    width: "450px",
    padding: "20px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
    marginBottom: "12px",
    height: "50px",
    marginRight: "12px",
  },
  button: {
    backgroundColor: "#73A9AD",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    marginTop: 44,
    height: 50,
  },
  buttongoback: {
    backgroundColor: "#73A9AD",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    marginTop: -20,
    position: "absolute",
    top: 290,
    left:80,
    height: 50,
  },
};
export default VerifEmail;
