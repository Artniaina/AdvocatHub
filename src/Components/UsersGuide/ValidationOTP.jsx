import React, { useState } from "react";
import { useAuth } from "../../Hooks/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const ValidationOTP = ({ handlePrevious, currentStep }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setIsAdminAuthenticated } = useAuth();
  const [isAlreadyAuthenticated, setIsAlreadyAuthenticated] = useState(false);
  const { email = "", password = "" } = location.state || {};
  const [codeOTP, setCodeOTP] = useState("");

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


  return (
    <div>
      <Card
        size="lg"
        variant="plain"
        sx={{
          textAlign: "left",
          maxWidth: "100%",
          width: 500,
          padding: 2,
        }}
      >
        <Typography level="title-lg" fontWeight="lg" mb={1}>
          3. Entrer le code OTP
        </Typography>
        <Typography fontSize="sm" sx={{ mb: 2 }}>
          Entrez le code de validation à 6 chiffres généré par l'application :
        </Typography>
        <Input
          value={codeOTP}
          onChange={(e) => setCodeOTP(e.target.value)}
          placeholder="Entrez le code à 6 chiffres"
          sx={{ mb: 2 }}
        />
        <Button
          variant="solid"
          color="primary"
          sx={{
            width: "100%",
            borderRadius: 10,
            mb: 2,
          }}
          onClick={handleSubmit}
        >
          Valider
        </Button>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button
          variant="outlined"
          color="neutral"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
      </div>
    </div>
  );
};

export default ValidationOTP;
