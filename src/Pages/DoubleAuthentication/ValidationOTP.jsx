import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/Authentification/Validationotp.css";

const ValidationOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { url, email, password } = location.state || {};
  const [codeOTP, setCodeOTP] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async () => {
    try {
      const userData = {
        sAdresseEmail: email,
        sMotdePasse: password,
        scodeOTP: codeOTP,
      };

      const response = await fetch("http://192.168.10.5/Utilisateur/Authent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //Ampiana Access-Control-Allow-Credentials: true
        // credentials: 'include',
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
        setIsAuthenticated(true);
        if (data.sRole === "Admin") {
          navigate("/userlist", {
            state: {
              isAuthenticated: true,
              isAdminAuthenticated: true
            }
          });
        } else {
          navigate("/home", {
            state: {
              isAuthenticated: true,
              isAdminAuthenticated: false
            }
          });
        }
        
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
