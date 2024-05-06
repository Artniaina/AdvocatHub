import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QrScan = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        scodeOTP: codeOTP
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

      if (!response.ok) {
        throw new Error("Échec de la requête API.");
      }
      const data = await response.json();
      if (data && data.svalideOTP === "1") {
        console.log(data.svalideOTP);
        setIsAuthenticated(true);
        navigate("/home", { state: { isAuthenticated: true } });
      } else {
        setIsAuthenticated(false);
        console.error("Échec de l'authentification à deux facteurs.");
      }
    } catch (error) {
    }
  };

  return (
    <div style={styles.container}>
      
        <>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Entrez les 6 chiffres de google authenticator"
              value={codeOTP}
              onChange={(e) => setCodeOTP(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.button}>
              Valider
            </button>
          </div>
          {isAuthenticated && (
            <p style={styles.successMessage}>Authentification réussie!</p>
          )}
        </>
    </div>
  );
};

const styles = {
  container: {
    display:"flex",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "24px",
  },
  inputContainer: {
    marginTop: "30px",
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
    marginRight:"12px"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
};

export default QrScan;
