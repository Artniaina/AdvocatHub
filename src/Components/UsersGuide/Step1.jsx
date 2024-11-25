import React from "react";
import { ShieldCheck, Lock, Smartphone, QrCode, Key } from "lucide-react";
import "../../Styles/Authentification/UsersGuide/usersGuide.css";
import Button from "@mui/joy/Button";
import { GrLinkNext } from "react-icons/gr";

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

const Step1 = ({ handleNext }) => {
  const steps = [
    {
      icon: <QrCode className="step-icon" size={32} />,
      title: "1. Scanner le QR Code",
      description:
        "Utilisez une application d'authentification (comme Google Authenticator) pour scanner le QR code unique fourni.",
    },
    {
      icon: <Smartphone className="step-icon" size={32} />,
      title: "2. Générer des codes",
      description:
        "L'application génère automatiquement des codes TOTP (Time-based One-Time Password) qui changent toutes les 30 secondes.",
    },
    {
      icon: <Key className="step-icon" size={32} />,
      title: "3. Validation",
      description:
        "Entrez le code à 6 chiffres lors de chaque connexion pour prouver votre identité.",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="feature-icon" size={48} />,
      title: "Protection renforcée",
      description:
        "Le 2FA sécurise votre compte en combinant un mot de passe et un code généré sur votre téléphone..",
    },
    {
      icon: <Lock className="feature-icon" size={48} />,
      title: "Authentification unique",
      description:
"Les codes TOTP, basés sur une clé secrète et l'heure, sont sécurisés et uniques à chaque utilisation."    },
  ];

  return (

   <>
       <div className="center-container">
      <div>
        <Card className="main-card">
          <CardHeader>
            <h1 className="main-title">
              Sécurisez votre compte avec l'authentification à deux facteurs
              (2FA)
            </h1>
          </CardHeader>
          <CardContent>
            <div className="flex-layout">
             
      
              <div className="steps-section">
                <h2 className="steps-title">Comment ça marche ?</h2>
                <div className="steps-container">
                  {steps.map((step, index) => (
                    <div key={index} className="step-item">
                      <div className="step-icon-container">{step.icon}</div>
                      <div className="step-content">
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-description">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="features-column">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-header">
                      {feature.icon}
                      <h2 className="feature-title">{feature.title}</h2>
                    </div>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
     
    </div>
     <div className="button-containerStep">
     <Button
          style={{ marginLeft: "19vw" }}
          variant="solid"
          sx={{
            backgroundColor: "#5E1675",
            ":hover": {
              backgroundColor: "#7f1da0",
            },
          }}
          onClick={handleNext}
        >
           Commencer <GrLinkNext />
        </Button>
   </div>
   </>
  );
};

export default Step1;
