import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import QRCode from "qrcode.react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import "../../Styles/Authentification/UsersGuide/usersGuide.css";
import Logo2FA from "../../assets/logo.webp";

export default function Step2({
  handleNext,
  handlePrevious,
  url,
  currentStep,
}) {
  return (
    <div>
      <Card
        size="lg"
        variant="plain"
        sx={{
          textAlign: "left",
          maxWidth: "100%",
          width: 600,
          padding: 7,
          paddingBottom: 2,
        }}
      >
        <img
          src={Logo2FA}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            position: "absolute",
            left: "45%",
            top:"5px"
          }}
        />
        <Typography
          level="title-lg"
          fontWeight="lg"
          mb={1}
          style={{ color: "#5e1675", fontSize: "20px", textAlign: "center" }}
        >
          Scannez le QR Code avec votre application
        </Typography>
        <AspectRatio
          ratio="1"
          objectFit="contain"
          variant="plain"
          sx={{ mt: 1, mb: 2 }}
        >
          <div className="boxQr" style={{ borderRadius: "0px" }}>
            <QRCode
              style={{
                height: "79%",
                width: "75%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto auto",
                position: "absolute",
                top: "29px",
                left: "50px",
              }}
              value={url}
            />
          </div>
        </AspectRatio>
      </Card>
      <div
        style={{
          display: "flex",
          marginTop: 20,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "#5E1675",
            borderColor: "#5E1675",
            ":hover": {
              borderColor: "#7f1da0",
              backgroundColor: "rgba(94, 22, 117, 0.1)",
            },
          }}
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <GrLinkPrevious /> Précedent
        </Button>
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
          Suivant <GrLinkNext />
        </Button>
      </div>
    </div>
  );
}
