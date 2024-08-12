import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export default function Step1({
  handleNext,
  handlePrevious,
  gettingStarted,
  currentStep,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Card
          size="lg"
          variant="plain"
          sx={{
            textAlign: "left",
            maxWidth: "100%",
            width: 500,
            padding: 2,
            marginBottom: 2,
          }}
        >
          <div style={{"display":"flex"}}>

          <div >
            <Typography level="title-lg" fontWeight="lg" mb={1}>
              1. Téléchargez une application d'authentification
            </Typography>
            <Typography fontSize="sm">
              Installez une application d'authentification à 2 facteurs comme{" "}
              <strong>Google Authenticator</strong> (conseillé),{" "}
              <strong>Authy</strong>, <strong>Duo Mobile</strong>, ou{" "}
              <strong>1Password</strong>.
            </Typography>
          </div>
          <div>
          image
          </div>
          </div>
        </Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <GrFormPrevious />
          </Button>
          {currentStep < 3 ? (
            <Button variant="solid" color="primary" onClick={handleNext}>
              <MdNavigateNext />
            </Button>
          ) : (
            <Button variant="solid" color="primary" onClick={gettingStarted}>
              Commencer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
