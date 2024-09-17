import React from "react";

const styles = {
  container: {
    padding: "30px",
    width: "1500px",
  },
  header: {
    fontSize: "25px",
    marginBottom: "10px",
    textAlign: "center",
    padding: "10px",
    border: "2px solid black",
  },
  remark: {
    fontSize: "20px",
    marginBottom: "5px",
    color: "purple",
    textDecoration: "underline",
  },
  sectionDivider: {
    margin: "10px 0",
    borderBottom: "1px solid #000",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "purple",
  },
  subSectionTitle: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "10px",
  },
  tableHeader: {
    border: "1px solid #000",
    padding: "5px",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  },
  tableCell: {
    border: "1px solid #000",
    padding: "5px",
    textAlign: "left",
    width: "500px",
  },
  tableCellCenter: {
    border: "1px solid #000",
    padding: "5px",
    textAlign: "center",
  },
  tableCellBold: {
    border: "1px solid #000",
    padding: "5px",
    fontWeight: "bold",
    textAlign: "left",
    width: "500px",
  },
};

const Page1 = () => {
  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "10px" }}>
        <h1 style={styles.header}>DEMANDE D'INFORMATIONS POUR TAXATION</h1>
        <p style={styles.remark}>
          REMARQUE: LA TAXATION NE POURRA ÊTRE TRAITÉE SI LE FORMULAIRE EST
          INCOMPLET ET/OU SI LES DOCUMENTS LISTÉS NE SONT PAS JOINTS !
        </p>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.sectionTitle}>1. GENERALITE</p>
        <p style={styles.subSectionTitle}>a) AVOCAT (Titulaire du dossier)</p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellBold}>Nom:</td>
              <td style={styles.tableCell}>AATTI</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Prénom:</td>
              <td style={styles.tableCell}>Ghizlane</td>
            </tr>
            <tr>
            <td style={styles.tableCellBold}>
                {" "}
                Adresse professionnelle:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "0px" }}>e</span>
              </td>
              <td style={styles.tableCell}>
                Valeur Adresse
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "0px" }}>e</span>
              </td>
              </tr>
            <tr>
              <td style={styles.tableCellBold}>Date d'assermentation:</td>
              <td style={styles.tableCell}>0956321</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Téléphone:</td>
              <td style={styles.tableCell}>+352 2659844</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Email:</td>
              <td style={styles.tableCell}>sabrine.abaab@barreau.lu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.subSectionTitle}>
          Les collaborateurs ayant participé à la réalisation des prestations:
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nom</th>
              <th style={styles.tableHeader}>Date d'assermentation</th>
              <th style={styles.tableHeader}>Adresse professionnelle</th>
              <th style={styles.tableHeader}>Téléphone</th>
              <th style={styles.tableHeader}>E-mail</th>
              <th style={styles.tableHeader}>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCellCenter}>AATTI Ghizlane</td>
              <td style={styles.tableCellCenter}>13/07/2006</td>
              <td style={styles.tableCellCenter}>
                12 rue Jean l'Aveugle, L-1148 Luxembourg
              </td>
              <td style={styles.tableCellCenter}>0956321</td>
              <td style={styles.tableCellCenter}>sabrine.abaab@barreau.lu</td>
              <td style={styles.tableCellCenter}>Non inscrit</td>
            </tr>
            <tr>
              <td style={styles.tableCellCenter}>ABAAB Sabrine</td>
              <td style={styles.tableCellCenter}>01/06/2017</td>
              <td style={styles.tableCellCenter}>
                16 rue Notre Dame, L-2240 Luxembourg
              </td>
              <td style={styles.tableCellCenter}>7896523</td>
              <td style={styles.tableCellCenter}>sabrine.abaab@barreau.lu</td>
              <td style={styles.tableCellCenter}>Inscrit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.subSectionTitle}>
          b) Société díavocats (à remplir uniquement si le mandat lui a été
          attribué)
        </p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellBold}>Dénomination étude:</td>
              <td style={styles.tableCell}>Valeur denomination etude</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Date d'inscription:</td>
              <td style={styles.tableCell}>Valeur date dinscri</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                {" "}
                Adresse professionnelle:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "0px" }}>e</span>
              </td>
              <td style={styles.tableCell}>
                Valeur Adresse
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "0px" }}>e</span>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Téléphone:</td>
              <td style={styles.tableCell}>+352 2659844</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Email barreau:</td>
              <td style={styles.tableCell}>sabrine.abaab@barreau.lu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.subSectionTitle}>c) CLIENT(S)</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>
                Dénomination Sociale / Organe représentatif
              </th>
              <th style={styles.tableHeader}>Nom et Prénom</th>
              <th style={styles.tableHeader}>Adresse</th>
              <th style={styles.tableHeader}>Téléphone</th>
              <th style={styles.tableHeader}>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCellCenter}>valeur</td>
              <td style={styles.tableCellCenter}>valeur</td>
              <td style={styles.tableCellCenter}>valeur</td>
              <td style={styles.tableCellCenter}>valeur</td>
              <td style={styles.tableCellCenter}>valeur</td>
              <td style={styles.tableCellCenter}>valeur</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page1;
