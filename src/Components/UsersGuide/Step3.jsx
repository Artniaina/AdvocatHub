import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
export default function Step3({handleNext, handlePrevious, gettingStarted, currentStep}) {
  return (
   <div>
    <Card
      size="lg"
      variant="plain"
      sx={{
        textAlign: 'left',
        maxWidth: '100%',
        width: 500,
        padding: 2,
      }}
    >
      <Typography level="title-lg" fontWeight="lg" mb={1}>
        3. Entrer le code OTP
      </Typography>
      <Typography fontSize="sm" sx={{ mb: 2 }}>
      Entrez le code de validation à 6 chiffres generer par l'application:
      </Typography>
      <Input
        placeholder="Enter 6-digit code"
        sx={{ mb: 2 }}
      />
      <Button
        variant="solid"
        color="primary"
        sx={{
          width: '100%',
          borderRadius: 10,
          mb: 2,
        }}
      >
        Verifiez puis continuer
      </Button>
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
  );
}
