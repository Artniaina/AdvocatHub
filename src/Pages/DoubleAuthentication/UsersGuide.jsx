import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Step1 from '../../Components/UsersGuide/Step1';
import Step2 from '../../Components/UsersGuide/Step2';
import ValidationOTP from '../../Components/UsersGuide/ValidationOTP';
import '../../Styles/Authentification/UsersGuide/Card.css'; 

const UsersGuide = () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const location = useLocation();
    const { url } = location.state || {};
    const [setLoading] = useState(true);
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
                <ValidationOTP currentStep={currentStep === 3} handleNext={handleNext} handlePrevious={handlePrevious} />
            </div>
        </div>
    );
}

export default UsersGuide
