import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModifMdp from "./ModifMdp";
import { HiArrowSmallLeft } from "react-icons/hi2";

const Modifie = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
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
    <div>
      {!successMessage && (
        <>
          <button onClick={handleGoBack}>
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
          <form onSubmit={handleSubmit} className="loginForm">
            <p style={{ textAlign: "center" }}>Vérification de votre email</p>
            <div>
              <label htmlFor="email" className="label">
                Veuillez entrer votre adresse email:
              </label>
              <br />
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="button" type="submit">
              Vérifier
            </button>
          </form>
        </>
      )}
      {successMessage && <ModifMdp email={formData.email} />}
    </div>
  );
};

export default Modifie;
