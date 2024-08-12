import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';

export default function Step2() {
  return (
    <Card
      size="lg"
      variant="plain"
      sx={{
        textAlign: 'left',
        maxWidth: '100%',
        width: 500,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Typography level="title-lg" fontWeight="lg" mb={1}>
        2. Scan this Barcode
      </Typography>
      <AspectRatio ratio="1" objectFit="contain" variant="plain" sx={{ mt: 1, mb: 2 }}>
        <img
          alt="QR Code"
          src="/mnt/data/2FA.jpeg" // Remplacez avec le chemin correct de l'image
        />
      </AspectRatio>
      <Typography fontSize="sm" sx={{ mb: 1 }}>
        If you are unable to scan this barcode, manually enter the following code:
      </Typography>
      <Typography fontSize="md" fontWeight="md">
        <code>1234 ABCD 4567 DEFG</code>
      </Typography>
    </Card>
  );
}
