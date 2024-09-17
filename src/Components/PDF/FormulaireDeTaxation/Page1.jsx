import React from "react";

const Page1 = () => {
  return (
    <div style={{ padding: "30px", width: "1500px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h1
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            textAlign: "center",
            padding: "10px",
            border: "2px solid black",
          }}
        >
          DEMANDE D'INFORMATIONS POUR TAXATION
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "5px" }}>
          <span style={{ color: "purple", textDecoration: "underline" }}>
            REMARQUE:
          </span>
          LA TAXATION NE POURRA ÊTRE TRAITÉE SI LE FORMULAIRE EST INCOMPLET
          ET/OU SI LES DOCUMENTS LISTÉS NE SONT PAS JOINTS !
        </p>
      </div>

      <div style={{ margin: "10px 0", borderBottom: "1px solid #000" }}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "purple" }}>
          1. GENERALITE
        </p>
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>
          a)AVOCAT (Ttitulaire du dossier)
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "10px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  marginleft:"526px",       
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Nom:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",width:"500px"
                }}
              >
                AATTI
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",width:"500px"
                }}
              >
                Prénom:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",width:"500px"
                }}
              >
                Ghizlane
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",width:"500px"
                }}
              >
                Adresse professionnelle:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",width:"500px"
                }}
              >
                12 rue Jean l'Aveugle, L-1148 Luxembourg
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",width:"500px"
                }}
              >
                Date d'assermentation:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",width:"500px"
                }}
              >
                0956321
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",width:"500px"
                }}
              >
                Téléphone:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",width:"500px"
                }}
              >
                +352 2659844{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",width:"500px"
                }}
              >
                Email:
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",width:"500px"
                }}
              >
                sabrine.abaab@barreau.lu
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ margin: "10px 0", borderBottom: "1px solid #000" }}></div>

      <div style={{ marginBottom: "10px" }}>
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>
          Les collaborateurs ayant participé à la réalisation des prestations:
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "10px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                Nom
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                Date d'assermentation
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                Adresse professionnelle
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                Téléphone
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                E-mail
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                AATTI Ghizlane
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                13/07/2006
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                12 rue Jean l'Aveugle, L-1148 Luxembourg
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                0956321
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                sabrine.abaab@barreau.lu
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                Non inscrit
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                ABAAB Sabrine
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                01/06/2017
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                16 rue Notre Dame, L-2240 Luxembourg
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                7896523
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                sabrine.abaab@barreau.lu
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                Inscrit
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ margin: "10px 0", borderBottom: "1px solid #000" }}></div>

      <div>
        <p style={{ fontSize: "12px" }}>REMARQUE: blabla</p>
      </div>
    </div>
  );
};

export default Page1;
