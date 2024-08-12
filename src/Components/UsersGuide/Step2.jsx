import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import QRCode from "qrcode.react";

export default function Step2({ handleNext, handlePrevious, url , currentStep}) {
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
          marginBottom: 2,
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
                style={{ width: "100%", height: "100%" }}
                value={url}
              />
        </AspectRatio>

      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Button
          variant="outlined"
          color="neutral"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button> 
        <Button variant="solid" color="primary" onClick={handleNext}>
            Suivant
          </Button>
      </div>
    </div>
  );
}
