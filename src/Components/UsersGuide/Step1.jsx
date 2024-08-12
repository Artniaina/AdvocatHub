import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";

export default function Step1() {
  return (
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
            Set Up Your Authenticator
          </Typography>

          <Typography level="title-lg" fontWeight="lg" mb={2}>
            1. Telecharger votre application d' authentification
          </Typography>
          <Typography fontSize="sm" sx={{ mb: 2 }}>
            Installer une application de double authentification comme{" "}
            <strong>Google Authenticator</strong>, <strong>Authy</strong>,{" "}
            <strong>Duo Mobile</strong>, or <strong>1Password</strong>
          </Typography>

          <Typography level="title-lg" fontWeight="lg" mb={2}>
            2. Scannez le code-barres
          </Typography>

          <Typography level="title-lg" fontWeight="lg" mb={2}>
            3. Entrez votre code d'authentification{" "}
          </Typography>
          <Typography fontSize="sm" sx={{ mb: 2 }}>
            Entrez le code à 6 chiffres généré par votre application
            d'authentification.
            Ensuite valider votre code
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
          Image
        </Card>
      </div>
    </div>
  );
}
