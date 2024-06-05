import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Authentification/Validationotp.css";
import { AuthContext } from "../AuthContext";

const ValidationOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, setAuthState } = useContext(AuthContext);

  const { url, email, password } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [codeOTP, setCodeOTP] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formattedOTPURL, setFormattedOTPURL] = useState("");

  useEffect(() => {
    setLoading(false);
    const formatOTPAuthURLForQR = (url) => {
      const originalURL = url;

      const parts = originalURL.split("?");

      if (parts.length !== 2) {
        throw new Error("URL OTP invalide.");
      }
      const [baseURL, queryParams] = parts;
      const params = new URLSearchParams(queryParams);
      const secret = params.get("secret");
      const digits = params.get("digits");
      const issuer = params.get("issuer");
      const emailStartIndex = baseURL.lastIndexOf(":") + 1;
      const emailEndIndex = baseURL.lastIndexOf("@");
      const email = baseURL.substring(emailStartIndex, emailEndIndex);
      const encodedEmail = encodeURIComponent(email);
      const formattedURL = `otpauth://totp/${issuer}:${encodedEmail}?secret=${secret}&digits=${digits}&issuer=${issuer}`;
      return formattedURL;
    };

    if (url) {
      try {
        const formattedURL = formatOTPAuthURLForQR(url);
        setFormattedOTPURL(formattedURL);
      } catch (error) {
        console.error("Erreur lors du formatage de l'URL OTP :", error.message);
      }
    }
  }, [url]);

  const handleSubmit = async () => {
    try {
      const userData = {
        sAdresseEmail: email,
        sMotdePasse: password,
        scodeOTP: codeOTP,
      };
      console.log(userData);

      console.log(userData);
      const response = await fetch("http://192.168.10.5/Utilisateur/Authent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (codeOTP === "") {
        alert("Veuillez remplir le champ");
      }
      if (!response.ok) {
        alert("Code non valide");
        throw new Error("Échec de la requête API.");
      }
      const data = await response.json();
      if (data && data.svalideOTP === "1") {
        console.log(`${data.svalideOTP}, ${data.sRole}`);
        setIsAuthenticated(true);
        const newState = {
          isAuthenticated: true,
          isAdminAuthenticated: data.sRole === "Admin",
        };
        setAuthState(newState);
        navigate(data.sRole === "Admin" ? "/userlist" : "/home", {
          state: newState,
        });
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {}
  };

  return (
    <div className="headerAuthent">
      <h2 className="AppAuthent">Saisir le code OTP à 6 chiffres</h2>
      <div className="container">
        <>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Saisir le code OTP à 6 chiffres"
              value={codeOTP}
              onChange={(e) => setCodeOTP(e.target.value)}
              className="inputtext"
            />
            <button onClick={handleSubmit} className="button">
              Valider
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default ValidationOTP;
