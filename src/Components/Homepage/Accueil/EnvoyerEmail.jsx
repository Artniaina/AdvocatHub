import React from 'react';

const EnvoyerEmail = () => {
  const envoyerEmail = async () => {
    try {
      const response = await fetch('http://192.168.10.5/Utilisateur/Send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ajoutez les données si nécessaire dans le corps de la requête
        // body: JSON.stringify({ /* Données à envoyer */ }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Email envoyé avec succès !');
        console.log('Réponse du serveur:', data.smessage);
      } else {
        console.error('Échec de l\'envoi de l\'email:', data.smessage);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <button onClick={envoyerEmail}>Envoyer un Email</button>
    </div>
  );
};

export default EnvoyerEmail;
