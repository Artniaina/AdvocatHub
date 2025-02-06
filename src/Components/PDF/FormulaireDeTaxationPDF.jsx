import React, { useEffect, useState } from "react";
import "../../../node_modules/quill/dist/quill.snow.css";

const styles = {
  container: {
    padding: "50px",
    width: "1500px",
  },

  header: {
    fontSize: "25px",
    marginBottom: "10px",
    marginLeft: "50px",
    marginTop: "100px",
    textAlign: "center",
    borderWidth: "2px",
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#fff",
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
    marginTop: "30px",
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
    backgroundColor: " 	#C0C0C0",
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
  editorTitle: {
    fontStyle: "italic",
    marginLeft: "50px",
    fontSize: "17px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  editorHeader: {
    fontStyle: "italic",
    textDecoration: "underline",
    marginLeft: "90px",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "10px",
  },
  miniText: {
    fontStyle: "italic",
    fontSize: "12px",
    marginLeft: "80px",
  },
};

const FormulaireDeTaxationPDF = () => {
  const [formulaire, setFormulaire] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchFormulaires = async () => {
      setStatus("loading");
      try {
        const response = await fetch(
          "http://192.168.10.113/Utilisateur/Formulaire/FormTransmis"
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
        const text = await response.text();
        if (!text) {
          console.log("Response is empty");
          setFormulaire(null);
          setStatus("succeeded");
          return;
        }

        try {
          const data = JSON.parse(text);
          setFormulaire(data.length ? data[0] : null);
          setStatus("succeeded");
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError.message);
          throw new Error("Failed to parse response as JSON.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setStatus("failed");
      }
    };

    if (status === "idle") {
      fetchFormulaires();
    }
  }, [status]);

  const avocat = formulaire?.sAvocatsData?.[0] || {};
  const collaborateurs = formulaire?.sCollaboratorsData || [];
  const clients = formulaire?.sClientsData || [];
  const noteHonoraire = formulaire?.sNoteHonoraire || [];

  const emailAvocat = avocat.email;
  const emailClient = clients.email;
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${day}/${month}/${year}`;
  };
  function decouperEmail(email) {
    if (email.length >= 14) {
      return [email.substring(0, 14) + " ", email.substring(14)];
    }
    return [email, ""];
  }

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "10px" }}>
        <table style={styles.header}>
          <thead>
            <tr>
              <th style={{ margin: "25px", backgroundColor: "#fff" }}>
                DEMANDE D'INFORMATIONS POUR TAXATION
              </th>
            </tr>
          </thead>
        </table>

        <div style={styles.remarkText}>
          <span style={styles.remark}>REMARQUE:</span> LA TAXATION NE POURRA
          ÊTRE TRAITÉE SI LE FORMULAIRE EST INCOMPLET ET/OU SI LES DOCUMENTS
          LISTÉS NE SONT PAS JOINTS !
        </div>
      </div>
      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <div style={styles.sectionTitle}>1. GENERALITE</div>
        <div style={styles.subSectionTitle}>a) AVOCAT (Titulaire du dossier)</div>

        <table style={styles.table}>
          <tbody>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Nom:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat.nom || ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Prénom:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat.prenom || ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                {" "}
                Adresse professionnelle:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat.adressePro || ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Date d'assermentation:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {formatDate(avocat?.dateAssermentation) || ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Téléphone:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat.telephone || ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Email:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {decouperEmail(emailAvocat || "")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <div style={styles.subSectionTitle2}>
          Les collaborateurs ayant participé à la réalisation des prestations:
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th colSpan="8" style={styles.tableHeader}>
                Nom
              </th>
              <th style={styles.tableHeader}>Adresse professionnelle</th>
              <th style={styles.tableHeader}>Date d'assermentation</th>
              <th style={styles.tableHeader}>Téléphone</th>
              <th style={styles.tableHeader}>E-mail</th>
              <th colSpan="8" style={styles.tableHeader}>
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {collaborateurs.map((collaborateur, index) => (
              <tr key={index}>
                <td colSpan="8" style={styles.tableCellCenter}>
                  {`${collaborateur.nom} ${collaborateur.prenom}`}
                </td>
                <td style={styles.tableCellCenter}>
                  {collaborateur.adresseEtude || ""}
                </td>
                <td style={styles.tableCellCenter}>
                  {formatDate(collaborateur.dateAssermentation)}
                </td>
                <td style={styles.tableCellCenter}>
                  {collaborateur.telephone || ""}
                </td>
                <td style={styles.tableCellCenter}>
                  {collaborateur.email || ""}
                </td>
                <td colSpan="8" style={styles.tableCellCenter}>
                  {collaborateur.isInscrit ? "Inscrit" : "Non inscrit"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>
      <div style={{ marginBottom: "10px" }}>
        <div style={styles.subSectionTitle}>
          b) Société d'avocats (à remplir uniquement si le mandat lui a été
          attribué)
        </div>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Dénomination étude:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat?.isSocieteChecked ? avocat?.denomination || "" : ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Date d'inscription:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat?.isSocieteChecked
                  ? formatDate(avocat?.dateInscription) || ""
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Adresse professionnelle:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat?.isSocieteChecked ? avocat?.adressePro || "" : ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Téléphone:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat?.isSocieteChecked ? avocat?.telephone || "" : ""}
              </td>
            </tr>
            <tr>
              <td colSpan="28" style={styles.tableCellBold}>
                Email barreau:
              </td>
              <td colSpan="29" style={styles.tableCell}>
                {avocat?.isSocieteChecked ? avocat?.email || "" : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <div style={styles.subSectionTitle}>c) CLIENT(S)</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>
                Dénomination Sociale / Organe représentatif
              </th>
              <th style={styles.tableHeader}>Nom et Prénom</th>
              <th style={styles.tableHeader} colSpan="15">
                Adresse
              </th>
              <th style={styles.tableHeader}>Téléphone</th>
              <th style={styles.tableHeader}>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td style={styles.tableCellCenter}>{client.selectedOption}</td>
                <td style={styles.tableCellCenter}>
                  {client.denomination || ""}
                </td>
                <td
                  style={styles.tableCellCenter}
                >{`${client.name} ${client.prenom}`}</td>
                <td colSpan="15" style={styles.tableCellCenter}>
                  {`Numéro voie :${client.numVoie || ""}; Rue: ${
                    client.rue || ""
                  }; Code postal: ${client.cp || ""}; Localité: ${
                    client.localite || ""
                  }; Localité BP:${client.localitebp || ""}; BP:${
                    client.bp || ""
                  }. Pays:${client.pays || ""}`}
                </td>
                <td style={styles.tableCellCenter}>
                  {client.contactInfo || ""}
                </td>
                <td style={styles.tableCellCenter}>
                  {decouperEmail(emailAvocat || "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.sectionDivider}></div>

      <div style={{ marginBottom: "10px" }}>
        <div style={styles.subSectionTitle}>d)AFFAIRE</div>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCellBold}>Domaine(s) juridique(s)</td>
              <td style={styles.tableCell}>
                {formulaire?.sDomaineJuridique || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Nom de l'affaire :</td>
              <td style={styles.tableCell}>{formulaire?.sNomAffaire || ""}</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}> Date de début du mandat :</td>
              <td style={styles.tableCell}>
                {formulaire?.sDateDebutMandat || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Date de fin du mandat:</td>
              <td style={styles.tableCell}>
                {formulaire?.sDateFinMandat || ""}{" "}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Une convention d'honoraires/lettre d'engagement a-t'elle été
                signée ? Si oui, quels en étaient les termes ? (merci de joindre
                la convention díhonoraires au dossier de taxation).
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sTermesHonoraires || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                En l'absence de convention d'honoraires/lettre d'engagement en
                bonne et due forme, un budget ou un taux horaire a-t'il été
                annoncé au client ?
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sAbsenceTermes || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Affaire(s) en cours ? (si oui, préciser l'état d'avancement)
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sEtatAvancement || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Date de la contestation d'honoraires :
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sDateContestation || ""}
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                Date, référence et montant TTC de la/des note(s) d'honoraires
                contestée(s) :{" "}
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sTermesHonoraires || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Date, référence et montant TTC de la/des note(s) de provision{" "}
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sTermesHonoraires || ""}
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                D'autres notes dans le cadre de la même affaire ont-elles été
                payées ? Si oui, merci de bien vouloir indiquer les montants TTC
                :{" "}
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sTermesHonoraires || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Proposition de conciliation concernant les honoraires :{" "}
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sConciliation || ""}
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                Une procédure relative au recouvrement des honoraires a-t'elle
                été introduite ?{" "}
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sProcedureRelative || ""}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>
                Des mesures conservatoires ont-elles été introduites ?
              </td>
              <td style={styles.tableCell}>
                {formulaire?.sMesureConservatoire || ""}
              </td>
            </tr>

            <tr>
              <td style={styles.tableCellBold}>
                Une médiation est-elle en cours ?
              </td>
              <td style={styles.tableCell}>{formulaire?.sMediation || ""}</td>
            </tr>
            <tr>
              <td style={styles.tableCellBold}>Si non, est-elle souhaitée ?</td>
              <td style={styles.tableCell}>
                {formulaire?.sMediationChoix || ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.sectionDivider}></div>
      <div>
        <div style={{ ...styles.sectionTitle, marginTop: "0px" }}>
          2. DESCRIPTION DE L'AFFAIRE ET DES PRESTATIONS
        </div>
        <div style={styles.editorTitle}>a) Description de l'affaire</div>
        <div>
          <div style={styles.editorHeader}>1) Mentionner les faits</div>
          <div
            dangerouslySetInnerHTML={{ __html: formulaire?.sContenu1 || "" }}
          />{" "}
        </div>

        <div>
          <div style={styles.editorHeader}>
            Enjeu de l'affaire
            <div style={styles.miniText}>
              (par exemple : l'enjeu financier de l'affaire, l'importance et le
              degré de difficulté de l'affaire, reprise de mandat en cours de
              procédure, etc.)
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: formulaire?.sContenu2 || "" }}
          />
        </div>

        <div>
          <div style={styles.editorHeader}>
            Le(s) résultat(s) obtenu(s){" "}
            <div style={styles.miniText}>
              (par exemple : revirement jurisprudentiel ou jurisprudence
              constante, résultat exceptionnel, autorisations ou agréments
              obtenus...)
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: formulaire?.sContenu3 || "" }}
          />
        </div>
        <div>
          <div style={styles.editorHeader}>
            L'expérience et la notoriété de l'avocat{" "}
            <div style={styles.miniText}>
              (par exemple : spécialisation en lien avec la matiËre traitée,
              expérience professionnelle, autre(s) activité(s) en lien avec la
              profession, publications/ouvrages...)
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: formulaire?.sContenu4 || "" }}
          />
        </div>
        <div>
          <div style={styles.editorHeader}>
            La situation de fortune du client
            <div style={styles.miniText}>
              (assistance judiciaire abordée et/ou sollicitée, estimation des
              revenus moyens du mandant, risque de faillite...)
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: formulaire?.sContenu5 || "" }}
          />
        </div>
        <div>
          <div style={styles.editorTitle}>b)Le travail effectué</div>

          <div style={{ ...styles.miniText, marginLeft: "50px" }}>
            (prière de regrouper par types de prestations : par exemple
            correspondances, procédures, rédaction de documents, recherches,
            audiences, etc. et indiquer le temps mis en compte par catégories
            ainsi que le total des honoraires)
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: formulaire?.sContenu6 || "" }}
          />
        </div>
      </div>

      <div>
        <div style={{ ...styles.sectionTitle, marginTop: "0px" }}>
          3. HONORAIRES
        </div>{" "}
        {noteHonoraire.map((note, index) => (
          <div>
            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                Date
              </span>
              : {note.date || ""}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                Référence:
              </span>{" "}
              {note.reference || ""}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                Montant TTC
              </span>{" "}
              {note.totalHonoraireTTC || ""}
            </div>
            <table key={note.id} style={styles.table}>
              <tbody>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Nombre d'heures facturées:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.hours}h{note.minutes}mn
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Taux horaires HTVA facturés:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.tauxHorairesfacturés}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total des honoraires HTVA facturés:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.totalHonoraireHTVA}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total des frais de constitution de dossier et des frais de
                    bureau HTVA facturés:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.fraisConstitutionDossier}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total des honoraires et frais de dossiers HTVA:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.totalHonoraireFraisDossier}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Taux TVA:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.tauxTVA}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Montant de la TVA (honoraires et frais compris):
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.montantTVA}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total des honoraires TTC:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.noteTTC}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Frais huissiers, d'expertise, de traduction, de RCS...
                    (TTC):
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.totalHonoraireFraisDossier}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total des provisions TTC payées:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.provisionTTC}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Remise / note de crédit:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.remise}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total de la note d'honoraires TTC:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.noteTTC}
                  </td>
                </tr>
                <tr>
                  <td colSpan="28" style={styles.tableCellBold}>
                    Total du montant restant dû TTC:
                  </td>
                  <td colSpan="15" style={styles.tableCell}>
                    {note.restantDu}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        <div style={{ fontSize: "13px", marginLeft: "10px" }}>
          <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
            Observation particulières:
          </span>
          (prise en charge totale ou partielle par un tiers/assurance protection
          juridique du client,...)
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: formulaire?.sObservations || "" }}
        />
      </div>
      <div
        style={{
          marginTop: "100px",
          marginBottom: "0px",
        }}
      >
        <div
          style={{
            ...styles.sectionTitle,
            marginTop: "10px",
            marginBottom: "0px",
          }}
        >
          4. PRISE DE POSITION DE L'AVOCAT
        </div>
        <div
          style={{
            ...styles.miniText,
            fontSize: "16px",
            color: "#463d3d",
            marginLeft: "10px",
            marginTop: "5px",
          }}
        >
          (au regard des contestations du client, de la facturation réalisée, du
          taux horaire appliqué, l'implication du client dans le traitement du
          dossier. Merci de mentionner ici tout ce qui peut aider le taxateur
          dans son appréciation du dossier et ce qu'il vous parait important à
          souligner) prise en charge totale ou partielle par un tiers/assurance
          protection juridique du client,…)
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: formulaire?.sPositionAvocat || "",
          }}
        />
      </div>

      <div>
        <div
          style={{
            textDecoration: "underline",
            fontStyle: "italic",
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          {" "}
          Fichier(s) importé(s)
        </div>
        <ul>
          <li>{formulaire?.sFichiersJoints || ""}</li>
        </ul>
      </div>

      <div style={{ textAlign: "end" }}>{formulaire?.sSubmited_at || ""}</div>
    </div>
  );
};

export default FormulaireDeTaxationPDF;
