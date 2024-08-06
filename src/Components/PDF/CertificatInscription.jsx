import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
});

const CertificatInscription = ({ prenomNom, adresse, dateAssermentation, gedFonction, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>CERTIFICAT</Text>
        <Text>Par la présente je certifie que Maître {prenomNom}:</Text>
        <Text>réside professionnellement au {adresse};</Text>
        <Text>a prêté serment d’avocat le {dateAssermentation};</Text>
        <Text>est actuellement inscrit à l’Ordre des avocats du Barreau d’Antananarivo en tant qu'{gedFonction}.</Text>
        <Text>Antananarivo le {date}</Text>
      </View>
    </Page>
  </Document>
);

export default CertificatInscription;
