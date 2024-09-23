import React from "react";
import "../../Styles/TaxationForm/CardInfo.css";
import Image from "../../assets/icons8-fichier-67.png";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../Hooks/GeneraliteContext";
import UploadFileGuide from "./UploadFileGuide";
import TaxationFormContent from "../PDF/FormulaireDeTaxationPDF";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { useAuth } from "../../Hooks/AuthContext";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UploadFile = () => {
  const { user } = useAuth();
  const {
    formData,
    editorContentObservation,
    editorContentPosition,
    editorContents,
    montantData,
    noteHonoraire,
    honoraireData,
    prestataires,
    provisionData,
    clientData,
  } = useGeneraliteContext();
  const { fileInfos, setFileInfos } = useGeneraliteContext();

  const submitFormData = async () => {
    const currentDate = new Date().toISOString();
    const jsonToSend = {
      sEmailUtilisateur: user.email,
      sDomaineJuridique: formData.domaine.join(","),
      sNomAffaire: formData.nomAffaire,
      sTermesHonoraires: formData.termesHonoraires,
      sAbsenceTermes: formData.absenceTerm,
      sDateContestation: formData.datecontest,
      sDateDebutMandat: formData.dateDebut,
      sDateFinMandat: formData.dateFin,
      sEtatAvancement: formData.etatAvancement,
      sMesureConservatoire: formData.conserv,
      sMediation: formData.mediation,
      sMediationChox: formData.mediationChoix,
      sConciliation: formData.conciliation,
      sProcedureRelative: formData.relative,
      sObservations: editorContentObservation,
      sPositionAvocat: editorContentPosition,
      sContenu1: editorContents.c1,
      sContenu2: editorContents.c2,
      sContenu3: editorContents.c3,
      sContenu4: editorContents.c4,
      sContenu5: editorContents.c5,
      sContenu6: editorContents.c6,
      sMontant: montantData,
      sNoteHonoraire: noteHonoraire,
      sHonoraire: honoraireData,
      sProvision: provisionData,
      sPrestataireData: prestataires,
      sClientsData: clientData,
      sSubmited_at: currentDate,
    };

    console.log(jsonToSend);

    try {
      const response = await fetch(
        "http://192.168.10.5/Utilisateur/DossierTaxation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonToSend),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  const generateAndViewPdf = () => {
    const htmlContent = document.getElementById(
      "taxation-form-content"
    ).innerHTML;

    try {
      const pdfDoc = htmlToPdfmake(htmlContent);
      const docDefinition = { content: pdfDoc };
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
                    />
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
          <button onClick={submitFormData}>
            <FaCheck style={{ color: "green", fontSize: "30px" }} />
            Envoyer
          </button>
          <button onClick={generateAndViewPdf}>
            <FaCheck style={{ color: "blue", fontSize: "30px" }} />
            Visualiser PDF
          </button>
        </div>
      </div>
      <div id="taxation-form-content" style={{ display: "none" }}>
        <TaxationFormContent />
      </div>
    </>
  );
};

export default UploadFile;
