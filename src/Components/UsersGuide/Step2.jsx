import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import QRCode from "qrcode.react";

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
          width: 500,
          padding: 6,
          paddingBottom: 2,
        }}
      >
        <Typography level="title-lg" fontWeight="lg" mb={1}>
          2. Scannez le QR Code avec votre application
        </Typography>
        <AspectRatio
          ratio="1"
          objectFit="contain"
          variant="plain"
          sx={{ mt: 1, mb: 2 }}
        >
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
          Précédent
        </Button>
        <Button
          style={{ marginLeft: "22vw" }}
          variant="solid"
          sx={{
            backgroundColor: "#5E1675",
            ":hover": {
              backgroundColor: "#7f1da0",
            },
          }}
          onClick={handleNext}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
