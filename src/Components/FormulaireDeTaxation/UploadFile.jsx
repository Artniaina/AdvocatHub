import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/TaxationForm/CardInfo.css";
import RequiredMessage from "../PopUp/RequiredMessage";
import Image from "../../assets/icons8-fichier-67.png";
import { FaCheck } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../Hooks/GeneraliteContext";
import UploadFileGuide from "./UploadFileGuide";
import FormulaireDeTaxationPDF from "../PDF/FormulaireDeTaxationPDF";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { useAuth } from "../../Hooks/AuthContext";
import { useNavigation } from "../../Hooks/NavigationListenerContext";
import "../../Styles/spinner.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UploadFile = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { updateJsonData } = useNavigation();
  const { resetAllData } = useGeneraliteContext();

  const {
    formData,
    editorContents,
    montantData,
    noteHonoraire,
    honoraireData,
    prestataires,
    selectedAvocats,
    avocatsData,
    showOptions,
    provisionData,
    clientData,
  } = useGeneraliteContext();

  const { fileInfos, setFileInfos } = useGeneraliteContext();
  const [showPopup, setShowPopup] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const filesMap = fileInfos.map((file) => ({
    name: file.name,
    size: (file.size / 1024).toFixed(2),
  }));
  const filesName = filesMap.map((file) => file.name);

  const validateFormData = () => {
    const requiredFields = [
      // { value: montantData, name: "montant" },
      // { value: noteHonoraire, name: "note honoraire" },
      // { value: honoraireData, name: "honoraire" },
      // { value: provisionData, name: "provision" },
      // { value: prestataires, name: "prestataire" },
      // { value: clientData, name: "client" },
      // { value: formData.domaine, name: "domaine juridique" },
      // { value: formData.nomAffaire, name: "nom affaire" },
      // { value: formData.datecontest, name: "date de contestation" },
      // { value: formData.dateDebut, name: "date de début de mandat" },
      // { value: formData.dateFin, name: "date de fin de mandat" },
      // { value: editorContentObservation, name: "observations" },
      // { value: editorContentPosition, name: "position avocat" },
    ];

    for (const field of requiredFields) {
      if (!field.value || field.value.length === 0) {
        setFieldName(field.name);
        setShowPopup(true);
        return false;
      }
    }
    return true;
  };

  const currentDate = new Date().toISOString();
  const jsonToSend = useMemo(
    () => ({
      sStatutFormulaire: "non transmis",
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
      sMediationChoix: showOptions.mediationChoix,
      sConciliation: formData.conciliation,
      sProcedureRelative: formData.relative,
      sObservations: editorContents.observation,
      sPositionAvocat: editorContents.position,
      sContenu1: editorContents.c1,
      sContenu2: editorContents.c2,
      sContenu3: editorContents.c3,
      sContenu4: editorContents.c4,
      sContenu5: editorContents.c5,
      sContenu6: editorContents.c6,
      sMontant: montantData,
      sNoteHonoraire: noteHonoraire,
      sHonoraireData: honoraireData,
      sProvision: provisionData,
      sPrestataireData: prestataires,
      sCollaboratorsData: selectedAvocats,
      sAvocatsData: avocatsData,
      sClientsData: clientData,
      sSubmited_at: currentDate,
    }),
    [
      user.email,
      formData,
      editorContents,
      montantData,
      noteHonoraire,
      honoraireData,
      provisionData,
      prestataires,
      selectedAvocats,
      avocatsData,
      clientData,
      currentDate,
    ]
  );
  const jsonDataRef = useRef(jsonToSend);

  useEffect(() => {
    updateJsonData(jsonDataRef.current);
  }, [updateJsonData]);
  const refreshPage = () => {
    setLoading(true);
    resetAllData();
  
    localStorage.setItem("generatePdfAfterReload", "true");
  
    window.location.reload();
  };
  
  const submitFormData = async () => {
    if (!validateFormData()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.10.10/Utilisateur/DossierTaxation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...jsonToSend,
            sStatutFormulaire: "transmis",
            sFichiersJoints: filesName.join(","),
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        refreshPage(); 
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateAndViewPdf = () => {
    const htmlContent = document.getElementById("taxation-form-content").innerHTML;
  
    try {
      const pdfDoc = htmlToPdfmake(htmlContent);
      const docDefinition = { content: pdfDoc };
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.error("Error while generating PDF:", error);
    }
  };
  
setTimeout(() => {
  if (localStorage.getItem("generatePdfAfterReload") == "true") {
    generateAndViewPdf(); 
    localStorage.removeItem("generatePdfAfterReload"); 
  }
}, 3000);

  
 
  

  const handleRemoveFile = (index) => {
    setFileInfos((prevFileInfos) =>
      prevFileInfos.filter((_, i) => i !== index)
    );
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFileInfos = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2),
    }));
    setFileInfos((prevFileInfos) => [...prevFileInfos, ...newFileInfos]);
  };

  const triggerFileUpload = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <>
     {loading &&  <div className="loading-spinner1"></div>}
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
          <div>
            <button onClick={submitFormData}>
              <FaCheck style={{ color: "green", fontSize: "30px" }} />
              Envoyer
            </button>
            {showPopup && (
              <RequiredMessage
                onClose={handleClosePopup}
                nomChamp={fieldName}
              />
            )}
          </div>
          <button onClick={resetAllData}>
            <FaCheck style={{ color: "blue", fontSize: "30px" }} />
            Reset{" "}
          </button>

          <button onClick={generateAndViewPdf}>
            <FaCheck style={{ color: "blue", fontSize: "30px" }} />
            Visualiser PDF
          </button>
        </div>
      </div>
      <div id="taxation-form-content" style={{ display: "none" }}>
        <FormulaireDeTaxationPDF />
      </div>
    </>
  );
};

export default UploadFile;
