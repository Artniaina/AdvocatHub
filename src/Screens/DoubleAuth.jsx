import React, { useState, useEffect , useContext} from "react";
import QRCode from "qrcode.react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Authentification/DoubleAuthent.css"


const DoubleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { url, email, password } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [codeOTP, setCodeOTP] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAlreadyAuthenticated, setIsAlreadyAuthenticated] = useState(false);
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
      const response = await fetch("http://192.168.10.5/Utilisateur/Authent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        alert("Code non valide")
        throw new Error("Échec de la requête API.");
      }
      const data = await response.json();
      if (data && data.svalideOTP === "1") {
        const role= data.sRole
        setIsAuthenticated(true);
        setIsAlreadyAuthenticated(true);
        localStorage.setItem(`user:${email}:isAlreadyAuthenticated`, "true");
        console.log(role);
        if (role==="Admin") {
          navigate("/userlist", { state: { isAdminAuthenticated: true , isAuthenticated: true  } });
        }else{
          navigate("/home", { state: { isAuthenticated: true }});

        }
      } else {
        setIsAuthenticated(false);
        console.error("Échec de l'authentification à deux facteurs.");
      }

    } catch (error) {}
  };

  return (
    <div  className= "headerAuthent">
    <div className="container1">
      <h2 className="heading">Configurer Google Authenticator</h2>
      {loading ? (
        <p className="text">Chargement de la clé TOTP...</p>
      ) : (
        <>
          <p className="text">
            Scannez le QR Code avec Google Authenticator:
          </p>
          <div className="qrCode">
            <QRCode
              style={{ width: "100%", height: "100%" }}
              value={formattedOTPURL}
            />
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Entrez les 6 chiffres dans google authenticator"
              value={codeOTP}
              onChange={(e) => setCodeOTP(e.target.value)}
              className="inputqr"
            />
            <button onClick={handleSubmit} className="button">
              Valider
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default DoubleAuth;
