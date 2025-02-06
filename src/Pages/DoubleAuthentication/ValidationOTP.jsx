import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/Authentification/Validationotp.css";
import { useAuth } from "../../Hooks/AuthContext";
import Logo2FA from "../../assets/logo.webp";
import { HiArrowSmallLeft } from "react-icons/hi2";

const ValidationOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setIsAdminAuthenticated } = useAuth();

  const { email = "", password = "" } = location.state || {};
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleInputChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const codeOTP = otp.join("");
    try {
      if (codeOTP.length !== 6) {
        alert("Veuillez remplir les 6 cases avec des chiffres.");
        return;
      }
      if (!email || !password) {
        alert("Données utilisateur manquantes.");
        return;
      }

      const userData = {
        sAdresseEmail: email,
        sMotdePasse: password,
        scodeOTP: codeOTP,
      };

      const response = await fetch("http://192.168.10.113/Utilisateur/Authent", {
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

      if (data && data.svalideOTP === true) {
        const dateSys = new Date().toISOString();
        login(data.SUsername + `${dateSys}`, {
          email: email,
          role: data.sRole,
        });

        if (data.sRole === "Admin") {
          setIsAdminAuthenticated(true);
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert("Code OTP non valide.");
      }
    } catch (error) {
      console.error("Erreur lors de la validation OTP :", error);
      alert("Code OTP non valide.");
    }
  };
  const handleGoBack = () => navigate(-1);

  return (
    <div className="headerAuthent">
      <button onClick={handleGoBack} className="backButton">
        <HiArrowSmallLeft style={{ fontSize: 20 }} />
      </button>
      <div className="container2FA">
        <img src={Logo2FA} />
        <h2 className="AppAuthent">Saisissez votre code OTP</h2>
        <p className="description">
          Entrez le code à 6 chiffres de votre téléphone
        </p>
        <div className="otpContainer">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otpInput"
              style={{ color: "grey", fontSize: "1.5rem" }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={handleSubmit} className="button">
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationOTP;
