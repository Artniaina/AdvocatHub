import React from "react";

const styles = {
  container: {
    padding: "50px",
    width: "1500px",
  },
  header: {
    fontSize: "25px",
    marginBottom: "10px",
    marginTop: "100px",
    textAlign: "center",
    padding: "10px",
    borderWidth: "2px",
    borderColor: "black",
    borderStyle: "solid",
  },
  remarkText: {
    marginTop: "30px",
    fontSize: "20px",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  remark: {
    fontSize: "20px",
    marginBottom: "5px",
    color: "purple",
    textDecoration: "underline",
    fontWeight: "bold",
  },
  sectionDivider: {
    margin: "30px 0",
    borderBottom: "1px solid #000",
  },
  sectionTitle: {
    marginLeft: "16px",
    marginTop: "50px",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "purple",
  },
  subSectionTitle: {
    fontSize: "18px",
    marginLeft: "50px",
    fontStyle: "Italic",
  },
  subSectionTitle2: {
    fontSize: "18px",
    marginBottom: "15px",
    marginTop: "15px",
    fontStyle: "Italic",
    textDecoration: "underline",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "10px",
    tableLayout: "fixed",
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
  },
  tableCellCenter: {
    padding: "5px",
    textAlign: "left",
  },
  tableCellBold: {
    border: "1px solid #000",
    padding: "5px",
    fontWeight: "bold",
    textAlign: "left",
  },
};

const Page1 = () => {
  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "10px" }}>
        <h1 style={styles.header}>DEMANDE D'INFORMATIONS POUR TAXATION</h1>
        <p style={styles.remarkText}>
          <span style={styles.remark}>REMARQUE:</span> LA TAXATION NE POURRA
          ÊTRE TRAITÉE SI LE FORMULAIRE EST INCOMPLET ET/OU SI LES DOCUMENTS
          LISTÉS NE SONT PAS JOINTS !
        </p>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.sectionTitle}>1. GENERALITE</p>
        <p style={styles.subSectionTitle}>a) AVOCAT (Titulaire du dossier)</p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Nom:
              </td>
              <td colspan="29" style={styles.tableCell}>
                AATTI
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Prénom:
              </td>
              <td colspan="29" style={styles.tableCell}>
                Ghizlane
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                {" "}
                Adresse professionnelle:
              </td>
              <td colspan="29" style={styles.tableCell}>
                Valeur Adresse
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Date d'assermentation:
              </td>
              <td colspan="29" style={styles.tableCell}>
                0956321
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Téléphone:
              </td>
              <td colspan="29" style={styles.tableCell}>
                +352 2659844
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Email:
              </td>
              <td colspan="29" style={styles.tableCell}>
                sabrine.aba
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.subSectionTitle2}>
          Les collaborateurs ayant participé à la réalisation des prestations:
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th colspan="8" style={styles.tableHeader}>
                Nom
              </th>
              <th style={styles.tableHeader}>Adresse professionnelle</th>
              <th style={styles.tableHeader}>Date d'assermentation</th>
              <th style={styles.tableHeader}>Téléphone</th>
              <th style={styles.tableHeader}>E-mail</th>
              <th colspan="8" style={styles.tableHeader}>
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="8" style={styles.tableCellCenter}>
                AATTI Ghizlane
              </td>
              <td style={styles.tableCellCenter}>
                12 rue Jean l'Aveugle, L-1148 Luxembourg
              </td>
              <td style={styles.tableCellCenter}>13/07/2006</td>
              <td style={styles.tableCellCenter}>0956321</td>
              <td style={styles.tableCellCenter}>sabrine.abaa heloooo</td>
              <td colspan="8" style={styles.tableCellCenter}>
                Non inscrit
              </td>
            </tr>
            <tr>
              <td colspan="8" style={styles.tableCellCenter}>
                ABAAB Sabrine
              </td>
              <td style={styles.tableCellCenter}>
                16 rue Notre Dame, L-2240 Luxembourg
              </td>
              <td style={styles.tableCellCenter}>01/06/2017</td>
              <td style={styles.tableCellCenter}>7896523</td>
              <td style={styles.tableCellCenter}>sabrine.abaaa aaaaaaaaaa</td>
              <td colspan="8" style={styles.tableCellCenter}>
                Inscrit
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.subSectionTitle}>
          b) Société d'avocats (à remplir uniquement si le mandat lui a été
          attribué)
        </p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Dénomination étude:
              </td>
              <td colspan="29" style={styles.tableCell}>
                Valeur denomination etude
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Date d'inscription:
              </td>
              <td colspan="29" style={styles.tableCell}>
                Valeur date dinscri
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                {" "}
                Adresse professionnelle:
              </td>
              <td colspan="29" style={styles.tableCell}>
                Valeur Adresse
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Téléphone:
              </td>
              <td colspan="29" style={styles.tableCell}>
                +352 2659844
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Email barreau:
              </td>
              <td colspan="29" style={styles.tableCell}>
                sabrine.abaab@barreau.lu
              </td>
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
      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={styles.subSectionTitle}>d)AFFAIRE</p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellBold}>Domaine(s) juridique(s)</td>
              <td style={styles.tableCell}>Valeur DJ</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Nom de l'affaire :</td>
              <td style={styles.tableCell}>Valeur NA</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}> Date de début du mandat :</td>
              <td style={styles.tableCell}>Valeur date debut mandat</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Date de fin du mandat:</td>
              <td style={styles.tableCell}>date fin </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Une convention díhonoraires/lettre d'engagement a-t'elle été
                signée ? Si oui, quels en étaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                En l'absence de convention d'honoraires/lettre d'engagement en
                bonne et due forme, un budget ou un taux horaire a-t'il été
                annoncé au client ?
              </td>
              <td style={styles.tableCell}>
                En líabsence de convention díhonoraires/lettre díengagement en
                bonne et due forme, un budget ou un taux horaire a-t'il ÈtÈ
                annoncÈ au client ?
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Affaire(s) en cours ? (si oui, préciser l'état d'avancement)
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Date de la contestation d'honoraires :
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                Date, référence et montant TTC de la/des note(s) d'honoraires
                contestée(s) :{" "}
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Date, référence et montant TTC de la/des note(s) de provision{" "}
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                D'autres notes dans le cadre de la même affaire ont-elles été
                payées ? Si oui, merci de bien vouloir indiquer les montants TTC
                :{" "}
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Proposition de conciliation concernant les honoraires :{" "}
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                Une procédure relative au recouvrement des honoraires a-t'elle
                été introduite ?{" "}
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Des mesures conservatoires ont-elles été introduites ?
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                Une médiation est-elle en cours ?
              </td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Si non, est-elle souhaitée ?</td>
              <td style={styles.tableCell}>
                Une convention díhonoraires/lettre díengagement a-t'elle ÈtÈ
                signÈe ? Si oui, quels en Ètaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>
      <div>
        <p style={{ ...styles.sectionTitle, marginTop: "0px" }}>
          2. DESCRIPTION DE L'AFFAIRE ET DES PRESTATIONS
        </p>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "17px",
            fontWeight: "bold",
            marginLeft: "50px",
            marginBottom: "10px",
            marginTop: "0px",
          }}
        >
          a) Description de l'affaire
        </p>
        <div>
          <p
            style={{
              fontStyle: "italic",
              textDecoration: "underline",
              marginLeft: "100px",
              fontSize: "17px",
              fontWeight: "bold",
              marginBottom: "0px",
              marginTop: "0px",
            }}
          >
            1) Mentionner les faits
          </p>
          <div>Editor html Content</div>
        </div>

        <div>
          <p
            style={{
              fontStyle: "italic",
              textDecoration: "underline",
              marginLeft: "100px",
              fontSize: "17px",
              fontWeight: "bold",
              marginBottom: "0px",
              marginTop: "0px",
            }}
          >
            Le(s) résultat(s) obtenu(s){" "}
            <p>
              (par exemple : revirement jurisprudentiel ou jurisprudence
              constante, rÈsultat exceptionnel, autorisations ou agrÈments
              obtenus...)
            </p>
          </p>

          <div>Editor html Content</div>
        </div>
        <div>
          <p
            style={{
              fontStyle: "italic",
              textDecoration: "underline",
              marginLeft: "100px",
              fontSize: "17px",
              fontWeight: "bold",
              marginBottom: "0px",
              marginTop: "0px",
            }}
          >
            L'expérience et la notoriété de l'avocat{" "}
            <p>
              (par exemple : spÈcialisation en lien avec la matiËre traitÈe,
              expÈrience professionnelle, autre(s) activitÈ(s) en lien avec la
              profession, publications/ouvrages...)
            </p>
          </p>

          <div>Editor html Content</div>
        </div>
        <div>
          <p
            style={{
              fontStyle: "italic",
              textDecoration: "underline",
              marginLeft: "100px",
              fontSize: "17px",
              fontWeight: "bold",
              marginBottom: "0px",
              marginTop: "0px",
            }}
          >
            La situation de fortune du client
            <p>
              (assistance judiciaire abordÈe et/ou sollicitÈe, estimation des
              revenus moyens du mandant, risque de faillite...)
            </p>
          </p>

          <div>Editor html Content</div>
        </div>
        <div>
          <p
            style={{
              fontStyle: "italic",
              fontSize: "17px",
              fontWeight: "bold",
              marginLeft: "50px",
              marginBottom: "10px",
              marginTop: "0px",
            }}
          >
            b)Le travail effectué
          </p>
          <p>
            <p>
              (prière de regrouper par types de prestations : par exemple
              correspondances, procédures, rédaction de documents, recherches,
              audiences, etc. et indiquer le temps mis en compte par catégories
              ainsi que le total des honoraires)
            </p>
          </p>

          <div>Editor html Content</div>
        </div>
      </div>

      <div>
        <p style={{ ...styles.sectionTitle, marginTop: "0px" }}>
          3. HONORAIRES
        </p>
        <p style={{ marginLeft: "0px" }}>
          <span style={{ fontWeight: "bold", paddingRight: "10px" }}>
            Date:
          </span>{" "}
          Today
        </p>
        <p style={{ marginLeft: "15px" }}>
          <span style={{ fontWeight: "bold", paddingRight: "10px" }}>
            Référence:
          </span>{" "}
          ref
        </p>
        <p style={{ marginLeft: "80px" }}>
          <span style={{ fontWeight: "bold", paddingRight: "10px" }}>
            MontantTTC:
          </span>{" "}
          12.00E
        </p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Nombre d'heures facturées:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12h00mn
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Taux horaires HTVA facturés:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12.00
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                {" "}
                Total des honoriares HTVA facturés:
              </td>
              <td colspan="29" style={styles.tableCell}>
                Valeur
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Total des frais de constitution de dossier et des frais de
                bureau HTVA facturés:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Total des honoraires et frais de dossiers HTVA:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Taux TVA:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Montant de la TVA (honoraires et frais compris):
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Total des honoraires TTC:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Frais huissiers, d'expertise, de traduction, de RCS... (TTC):
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Total des provisions TTC payées:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Remise / note de crédit:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Total de la note d'honoraires TTC:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
            <tr>
              <td colspan="28" style={styles.tableCellBold}>
                Total du montant restant dû TTC:
              </td>
              <td colspan="29" style={styles.tableCell}>
                12
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Observation particulières: (prise en charge totale ou partielle par un
          tiers/assurance protection juridique du client,...)
        </p>
        <div>Valeur de html editor observation</div>
      </div>
      <div>
        <p style={{ ...styles.sectionTitle, marginTop: "0px" }}>
          4. PRISE DE POSITION DE L'AVOCAT
        </p>
        <p>
          (au regard des contestations du client, de la facturation réalisée, du
          taux horaire appliqué, l'implication du client dans le traitement du
          dossier. Merci de mentionner ici tout ce qui peut aider le taxateur
          dans son appréciation du dossier et ce qu'il vous parait important à
          souligner) prise en charge totale ou partielle par un tiers/assurance
          protection juridique du client,…)
        </p>

        <div>
          Valeur du contenu de l'editeur de texte HTML sur la prise de position
          de l'avocat
        </div>
      </div>

      <div>
        <p>Fichier(s) importé(s)</p>
        <div>Nom du fichier importés</div>
      </div>

      <div style={{ textAlign: "end" }}>Date aujourd'hui</div>
    </div>
  );
};

export default Page1;
