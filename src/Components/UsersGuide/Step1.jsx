import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

export default function Step1() {
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
        1. Download an Authenticator App
      </Typography>
      <Typography fontSize="sm">
        Install an authenticator app like <strong>Google Authenticator</strong>, <strong>Authy</strong>, <strong>Duo Mobile</strong>, or <strong>1Password</strong>. 
        If you'd rather not use an app, you can authenticate via SMS instead.
      </Typography>
    </Card>
  );
}
