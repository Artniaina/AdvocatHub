import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
    },
    label: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 12,
      marginBottom: 5,
    },
    divider: {
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
    }
  });
  
 

const Page1 = () => (
  <Document>
       <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>DEMANDE D'INFORMATIONS POUR TAXATION</Text>
        <Text style={styles.value}>
          LA TAXATION NE POURRA ÊTRE TRAITÉE SI LE FORMULAIRE EST INCOMPLET ET/OU SI LES DOCUMENTS LISTÉS NE SONT PAS JOINTS !
        </Text>
      </View>
  
      <View style={styles.divider} />
  
      <View style={styles.section}>
        <Text style={styles.label}>1. GENERALITE</Text>
        <Text style={styles.label}>a) AVOCAT (titulaire du dossier)</Text>
        
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>ABBOUD Mathieu</Text>
        
        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.value}>Mathieu</Text>
        
        <Text style={styles.label}>Adresse professionnelle:</Text>
        <Text style={styles.value}>35 Allée Scheffer, L-2520 Luxembourg</Text>
        
        <Text style={styles.label}>Date d'assermentation:</Text>
        <Text style={styles.value}>09/07/1998</Text>
        
        <Text style={styles.label}>Téléphone:</Text>
        <Text style={styles.value}>+352 27935308</Text>
        
        <Text style={styles.label}>Émail:</Text>
        <Text style={styles.value}>jmc.test@barreau.lu</Text>
      </View>
  
  
      <View style={styles.section}>
        <Text style={styles.label}>Les collaborateurs ayant participé à la réalisation des prestations:</Text>
        
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>AATTI Ghizlane</Text>
        
        <Text style={styles.label}>Date d'assermentation:</Text>
        <Text style={styles.value}>13/07/2006</Text>
        
        <Text style={styles.label}>Adresse professionnelle:</Text>
        <Text style={styles.value}>12 rue Jean l'Aveugle, L-1148 Luxembourg</Text>
        
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>ABAAB Sabrine</Text>
        
        <Text style={styles.label}>Émail:</Text>
        <Text style={styles.value}>sabrine.abaab@barreau.lu</Text>
        
        <Text style={styles.label}>Date d'inscription:</Text>
        <Text style={styles.value}>01/06/2017</Text>
        
        <Text style={styles.label}>Adresse professionnelle:</Text>
        <Text style={styles.value}>16 rue Notre Dame, L-2240 Luxembourg</Text>
      </View>
  
      <View style={styles.divider} />
  
    
      <View style={styles.section}>
        <Text style={styles.value}>
          REMARQUE: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
        </Text>
      </View>
    </Page>
  </Document>
);

export default Page1;
