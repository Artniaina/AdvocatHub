import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font
} from "@react-pdf/renderer";
import LogoLaw from "../../assets/logolaw.jpg";
import Signature from "../../assets/signature.PNG"
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
    fontSize: 11,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "right",

  },
  logo2: {
    width: 70,
    height: 70,
    marginBottom: 20,
    alignSelf: "right",
  },
  section: {
    margin: 10,
    padding: 10,
    textAlign: "justify",
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    margin: 15,
    textAlign: "center",
    textDecoration: "underline",
  },
  intro: {
    margin: 20,
    marginLeft: 0,
  },
  dev: {
    margin: 5,
    marginLeft: 10,
  },
  bold: {
    fontFamily: 'Open Sans',
    fontWeight: 600,
  },
  signature: {
    marginTop: 60,
    textAlign: "right",
    marginRight: 20,
  },
  signatureText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    marginTop: 10,
    textAlign: "right",
  },
  borderContainer: {
    flex: 1,
    border: "1px solid grey",
    margin: 10,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const CertificatInscription = ({
  prenomNom,
  adresse,
  dateAssermentation,
  gedFonction,
  date,
  
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.borderContainer}>
        <Image style={styles.logo} src={LogoLaw} />
        <View style={styles.section}>
          <Text style={styles.title}> CERTIFICAT </Text>
          <Text style={styles.intro}>
            Par la présente, je certifie que{" "}
            <Text style={styles.bold}>Maître {prenomNom}</Text> :
          </Text>
          <View style={styles.container}>
            <Text>- </Text>
            <Text style={styles.dev}>
              réside professionnellement au{" "}
              <Text>{adresse}</Text> ;
            </Text>
          </View>
          <View style={styles.container}>
            <Text>- </Text>
            <Text style={styles.dev}>
              a prêté serment d'avocat le{" "}
              <Text>{dateAssermentation}</Text> ;
            </Text>
          </View>
          <View style={styles.container}>
            <Text>- </Text>
            <Text style={styles.dev}>F
              est actuellement inscrit à l'Ordre des avocats du Barreau
              de Luxembourg en tant qu'
              <Text>{gedFonction}</Text>.
            </Text>
          </View>
          <View style={styles.signature}>
            <Text>Fait le {date}</Text>
           
            <Text style={styles.signatureText}>   <Image style={styles.logo2} src={Signature} /></Text>
            <Text style={styles.signatureText}>  Bâtonnier</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificatInscription;