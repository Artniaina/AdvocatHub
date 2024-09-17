import React, { useState } from "react";
import "../../Styles/TaxationForm/CardInfo.css";
import Image from "../../assets/icons8-fichier-67.png";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../Hooks/GeneraliteContext";
import UploadFileGuide from "./UploadFileGuide";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UploadFile = () => {
  const { prepareDataToSend } = useGeneraliteContext();
  const { fileInfos, setFileInfos } = useGeneraliteContext();
  const [currentBlobUrl, setCurrentBlobUrl] = useState(null);
  const generateAndViewPdf = () => {
    const htmlContent = `
      <div style="padding: 30px; width: 1500px;">
        <div style="margin-bottom: 10px;">
          <h1 style="font-size: 16px; margin-bottom: 10px;">DEMANDE D'INFORMATIONS POUR TAXATION</h1>
          <p style="font-size: 12px; margin-bottom: 5px;">
            LA TAXATION NE POURRA ÊTRE TRAITÉE SI LE FORMULAIRE EST INCOMPLET ET/OU SI LES DOCUMENTS LISTÉS NE SONT PAS JOINTS !
          </p>
        </div>

        <div style="margin: 10px 0; border-bottom: 1px solid #000;"></div>

        <div style="margin-bottom: 10px;">
          <p style="font-size: 12px; font-weight: bold;">1. GENERALITE</p>
          <p style="font-size: 12px; font-weight: bold;">a) AVOCAT (titulaire du dossier)</p>

          <p style="font-size: 12px; font-weight: bold;">Nom:</p>
          <p style="font-size: 12px; margin-bottom: 5px;">ABBOUD Mathieu</p>

          <p style="font-size: 12px; font-weight: bold;">Prénom:</p>
          <p style="font-size: 12px; margin-bottom: 5px;">Mathieu</p>

          <p style="font-size: 12px; font-weight: bold;">Adresse professionnelle:</p>
          <p style="font-size: 12px; margin-bottom: 5px;">35 Allée Scheffer, L-2520 Luxembourg</p>

          <p style="font-size: 12px; font-weight: bold;">Date d'assermentation:</p>
          <p style="font-size: 12px; margin-bottom: 5px;">09/07/1998</p>

          <p style="font-size: 12px; font-weight: bold;">Téléphone:</p>
          <p style="font-size: 12px; margin-bottom: 5px;">+352 27935308</p>

          <p style="font-size: 12px; font-weight: bold;">Émail:</p>
          <p style="font-size: 12px; margin-bottom: 5px;">jmc.test@barreau.lu</p>
        </div>

        <div style="margin: 10px 0; border-bottom: 1px solid #000;"></div>

        <div style="margin-bottom: 10px;">
          <p style="font-size: 12px; font-weight: bold;">Les collaborateurs ayant participé à la réalisation des prestations:</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 5px; background-color: #f2f2f2; text-align: center;">Nom</th>
                <th style="border: 1px solid #000; padding: 5px; background-color: #f2f2f2; text-align: center;">Date d'assermentation</th>
                <th style="border: 1px solid #000; padding: 5px; background-color: #f2f2f2; text-align: center;">Adresse professionnelle</th>
                <th style="border: 1px solid #000; padding: 5px; background-color: #f2f2f2; text-align: center;">Téléphone</th>
                <th style="border: 1px solid #000; padding: 5px; background-color: #f2f2f2; text-align: center;">E-mail</th>
                <th style="border: 1px solid #000; padding: 5px; background-color: #f2f2f2; text-align: center;">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">AATTI Ghizlane</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">13/07/2006</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">12 rue Jean l'Aveugle, L-1148 Luxembourg</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">0956321</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">sabrine.abaab@barreau.lu</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">Non inscrit</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">ABAAB Sabrine</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">01/06/2017</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">16 rue Notre Dame, L-2240 Luxembourg</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">7896523</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">sabrine.abaab@barreau.lu</td>
                <td style="border: 1px solid #000; padding: 5px; text-align: center;">Inscrit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin: 10px 0; border-bottom: 1px solid #000;"></div>

        <div>
          <p style="font-size: 12px;">REMARQUE: blbla</p>
        </div>
      </div>
    `;

    try {
      // Convert HTML to pdfmake document definition
      const pdfDoc = htmlToPdfmake(htmlContent);
      const docDefinition = { content: pdfDoc };

      // Generate and open the PDF
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    }
  };
  

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFileInfos = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2),
    }));
    setFileInfos((prevFileInfos) => [...prevFileInfos, ...newFileInfos]);
  };

  const handleRemoveFile = (index) => {
    setFileInfos((prevFileInfos) =>
      prevFileInfos.filter((_, i) => i !== index)
    );
  };


  const triggerFileUpload = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <>
      {" "}
      <div>
        <UploadFileGuide />
      </div>
      <div
        className="cardGeneralité"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="CardFichiers">
          <p>
            <img src={Image} alt="" style={{ width: "40px", height: "40px" }} />{" "}
            Déposer des fichiers ici *
          </p>
          {fileInfos.length > 0 ? (
            <div>
              {fileInfos.map((file, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ padding: "15px" }}>
                    <div>
                      <strong>Nom du fichier:</strong> {file.name}
                    </div>
                    <div>
                      <strong>Taille du fichier:</strong> {file.size} KB
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    style={{
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <TiDelete
                      style={{ color: "#e73737b2", fontSize: "40px" }}
                    />{" "}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div
          className="buttonDiv"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button onClick={triggerFileUpload}>
            <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
            Parcourir
          </button>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
          <button onClick={prepareDataToSend}>
            <FaCheck style={{ color: "green", fontSize: "30px" }} />
            Envoyer
          </button>
          <button onClick={generateAndViewPdf}>
            <FaCheck style={{ color: "blue", fontSize: "30px" }} />
            Visualiser PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
