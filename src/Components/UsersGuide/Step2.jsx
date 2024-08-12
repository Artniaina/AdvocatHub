import React from 'react'
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";

const Step2 = ({ handleNext, handlePrevious, gettingStarted , currentStep}) => {
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
          2. Scannez le qr code 
        </Typography>
        <AspectRatio
          ratio="1"
          objectFit="contain"
          variant="plain"
          sx={{ mt: 1, mb: 2 }}
        >
          <img
            alt="QR Code"
            src="/mnt/data/2FA.jpeg"
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
          Precedent
        </Button>
        {currentStep < 3 ? (
          <Button variant="solid" color="primary" onClick={handleNext}>
            Suivant
          </Button>
        ) : (
          <Button variant="solid" color="primary" onClick={gettingStarted}>
            Get started
          </Button>
        )}
      </div>
    </div>
  );
}

export default Step2
