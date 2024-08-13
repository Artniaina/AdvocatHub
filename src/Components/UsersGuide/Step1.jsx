import React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Image from "../../assets/TOTP.png";

const Step1 = ({ handleNext }) => {
  return (
    <>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          {" "}
          <Card
            size="lg"
            variant="plain"
            orientation="vertical"
            sx={{
              textAlign: "left",
              maxWidth: "100%",
              width: 500,
              height: 600,
              padding: 3,
              boxShadow: 1,
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography fontSize="xl2" fontWeight="xl" mb={3}>
              Renforcement de securité de votre compte avec une double authentification
            </Typography>

            <Typography level="title-lg" fontWeight="lg" mb={2}>
              1. Telecharger votre application d' authentification
            </Typography>
            <Typography fontSize="sm" sx={{ mb: 2 }}>
              Installer une application de double authentification comme{" "}
              <strong>Google Authenticator</strong>, <strong>Authy</strong>,{" "}
              <strong>Duo Mobile</strong>, ou <strong>1Password</strong>
            </Typography>

            <Typography level="title-lg" fontWeight="lg" mb={2}>
              2. Scannez le code-barres
            </Typography>

            <Typography level="title-lg" fontWeight="lg" mb={2}>
              3. Entrez votre code d'authentification{" "}
            </Typography>
            <Typography fontSize="sm" sx={{ mb: 2 }}>
              Entrez le code à 6 chiffres généré par votre application
              d'authentification. Ensuite valider votre code
            </Typography>
          </Card>
        </div>
        <div>
          <Card
            size="lg"
            variant="plain"
            orientation="vertical"
            sx={{
              textAlign: "left",
              maxWidth: "100%",
              width: 500,
              height: 600,
              padding: 3,
              boxShadow: 1,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Image}
              alt="TOTP image"
              style={{
                width: 500,
                height: 500,
              }}
            />
          </Card>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", width:750, marginTop: 20 }}>
        <Button
          onClick={handleNext}
          variant="solid"
          color="primary"
        >
          Commencer
        </Button>
      </div>
    </>
  );
};

export default Step1;
