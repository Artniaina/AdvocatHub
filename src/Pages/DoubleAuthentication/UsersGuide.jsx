import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthContext";
import QRCode from "qrcode.react";
import Step1 from '../../Components/UsersGuide/Step1';
import Step2 from '../../Components/UsersGuide/Step2';
import Step3 from '../../Components/UsersGuide/Step3';
import '../../Styles/Authentification/UsersGuide/Card.css'; 

export default function UsersGuide() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = React.useState(1);
    const location = useLocation();
    const { login } = useAuth();
    const { url, email, password } = location.state || {};
    const { setIsAdminAuthenticated } = useAuth();
    const [isAlreadyAuthenticated, setIsAlreadyAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [codeOTP, setCodeOTP] = useState("");
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
          const response = await fetch("http://192.168.10.5/Utilisateur/Authent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
    
            credentials: "include",
            body: JSON.stringify(userData),
          });
    
          if (!response.ok) {
            alert("Code non valide, réessayer");
            throw new Error("Échec de la requête API.");
          }
          const data = await response.json();
          if (data && data.svalideOTP === "1") {
            const role = data.sRole;
            const dateSys = new Date().toISOString();
            login(data.SUsername + `${dateSys}`, {
              email: email,
              role: data.sRole,
            });
            setIsAlreadyAuthenticated(true);
            localStorage.setItem(`user:${email}:isAlreadyAuthenticated`, "true");
            if (role === "Admin") {
              setIsAdminAuthenticated(true);
              navigate("/userlist");
            } else {
              navigate("/home");
            }
          } else {
            alert("Code OTP non valide.");
          }
        } catch (error) {
          console.error("Échec de l'authentification à deux facteurs.");
          alert("Code OTP non valide");
        }
      };

    const handleNext = () => {
        setCurrentStep(prevStep => (prevStep < 3 ? prevStep + 1 : 3));
    };

    const handlePrevious = () => {
        setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1));
    };


    return (
        <div className="users-guide-container">
            <div className={`step ${currentStep === 1 ? 'active' : 'inactive'}`}>
                <Step1 currentStep={currentStep === 1} handleNext={handleNext} handlePrevious={handlePrevious}/>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : 'inactive'}`}>
                <Step2 currentStep={currentStep === 2} handleNext={handleNext} handlePrevious={handlePrevious} url={formattedOTPURL}/>
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : 'inactive'}`}>
                <Step3 currentStep={currentStep === 3} handleNext={handleNext} handlePrevious={handlePrevious} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}
