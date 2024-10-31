import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/TaxationForm/CardInfo.css";
import RequiredMessage from "../PopUp/RequiredMessage";
import NoteHonoraireWarning from "../PopUp/NoteHonoraireWarning";
import Image from "../../assets/icons8-fichier-67.png";
import { FaCheck } from "react-icons/fa";
import { IoAddCircle, IoLogOut } from "react-icons/io5";
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
  const [base64String, setBase64String] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { updateJsonData } = useNavigation();
  const { jsonToSend } = useGeneraliteContext();
  const { resetAllData } = useGeneraliteContext();
  const { noteHonoraireToCompare, setNoteHonoraireToCompare } =
    useGeneraliteContext();
  const { honoraireToCompare, setHonoraireToCompare } = useGeneraliteContext();

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
  const [showPopupDifference, setShowPopupDifference] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const filesMap = fileInfos.map((file) => ({
    name: file.name,
    size: (file.size / 1024).toFixed(2),
  }));
  const filesName = filesMap.map((file) => file.name);

  const validateFormData = () => {
    const requiredFields = [
      { value: montantData, name: "montant" },
      { value: noteHonoraire, name: "note honoraire" },
      { value: honoraireData, name: "honoraire" },
      { value: provisionData, name: "provision" },
      { value: prestataires, name: "prestataire" },
      { value: clientData, name: "client" },
      { value: formData.domaine, name: "domaine juridique" },
      { value: formData.nomAffaire, name: "nom affaire" },
      { value: formData.datecontest, name: "date de contestation" },
      { value: formData.dateDebut, name: "date de début de mandat" },
      { value: formData.dateFin, name: "date de fin de mandat" },
    ];

    for (const field of requiredFields) {
      if (!field.value || field.value.length === 0) {
        setFieldName(field.name);
        setShowPopup(true);
        return false;
      }
    }

    if (honoraireToCompare !== noteHonoraireToCompare) {
      setShowPopupDifference(true);
      return false;
    }
    console.log(honoraireToCompare);
    console.log(noteHonoraireToCompare);

    return true;
  };

  const currentDate = new Date().toISOString();

  const refreshPage = () => {
    setLoading(true);
    resetAllData();
    localStorage.setItem("generatePdfAfterReload", "true");
    window.location.reload();
  };

  const submitFormData = async () => {
    // if (!validateFormData()) {
    //   return;
    // }

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
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    } finally {
      setLoading(false);
    }
  };



  const generatePdf = () => {
    const htmlContent = document.getElementById(
      "taxation-form-content"
    ).innerHTML;

    return new Promise((resolve, reject) => {
      try {
        const pdfDoc = htmlToPdfmake(htmlContent);
        const docDefinition = { content: pdfDoc };
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getBase64((data) => {
          resolve(data);          
        });
      } catch (error) {
        reject(error);
        console.error("Error while generating PDF:", error);
      }
    });
  };
  setTimeout(() => {
    if (localStorage.getItem("generatePdfAfterReload") == "true") {
      viewPdf();
      localStorage.removeItem("generatePdfAfterReload");
    }
  }, 1000);

  const handleRemoveFile = (index) => {
    setFileInfos((prevFileInfos) =>
      prevFileInfos.filter((_, i) => i !== index)
    );
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowPopupDifference(false);
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

  const generateDateSys = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds())
      .padStart(3, "0")
      .slice(0, 2);

    return `${year}${month}${day}-${hours}-${minutes}-${seconds}-${milliseconds}`;
  };

  const DateSys = generateDateSys();
  const fullName = `${avocatsData[0].nom} ${avocatsData[0].prenom}`;
  const referencepdf = `${DateSys}_${fullName}_Formulaire taxation ordinaire`;
  const name = avocatsData[0].nom;


  const sendEmail = async () => {
    try {
      const pdfBase64 = await generatePdf();

      const emailData = {
        sEmailRecepteur: "kanto.andriahariniaina@gmail.com",
        sFullName: fullName,
        sNomAvocat: name,
        sDateSys: DateSys,
        sReferencepdf: referencepdf,
        spdfBase64: pdfBase64,
      };

      const response = await fetch(
        "http://192.168.10.10/Utilisateur/Email/InfoEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Email sent successfully:", result);
      } else {
        console.error("Failed to send email:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending email:", error);
    }
  };

  const generateAndViewPdf = () => {
    const htmlContent = document.getElementById(
      "taxation-form-content"
    ).innerHTML;
  
    try {
      const pdfDoc = htmlToPdfmake(htmlContent);
      const docDefinition = { content: pdfDoc };
  
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      
      pdfDocGenerator.getBase64((data) => {
        const base64String = data;
      });
      
      pdfDocGenerator.open();
    } catch (error) {
      console.error("Error while generating PDF:", error);
    }
  };
  
  const viewPdf = () => {
    const htmlContent = document.getElementById(
      "taxation-form-content"
    ).innerHTML;

    try {
      const pdfDoc = htmlToPdfmake(htmlContent);
      const docDefinition = { content: pdfDoc };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();
    } catch (error) {
      console.error("Error while viewing PDF:", error);
    }
  };



  const allInOne = async () => {
    try {
      await submitFormData();
      
      localStorage.setItem("shouldGeneratePdfAndSendEmail", "true");
      
      window.location.reload();
    } catch (error) {
      console.error("Une erreur est survenue:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handlePostReload = async () => {
      const shouldProcess = localStorage.getItem("shouldGeneratePdfAndSendEmail");
      
      if (shouldProcess === "true") {
        try {
          const pdfBase64 = await generatePdf();
          await sendEmail();

          localStorage.removeItem("shouldGeneratePdfAndSendEmail");
        } catch (error) {
          console.error("Error in post-reload processing:", error);
        }
      }
    };

    setTimeout(() => {
      handlePostReload();
    }, 1000);
  }, []);

  

  return (
    <>
      {loading && <div className="loading-spinner1"></div>}
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
          <div>
            <button
              type="button"
              onClick={triggerFileUpload}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "blue",
                color: "white",
                cursor: "pointer",
              }}
            >
              <IoAddCircle style={{ marginRight: "5px" }} />
              Ajouter un fichier
            </button>
            <button
              onClick={submitFormData}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              Envoyer le formulaire
            </button>
            <button
              onClick={generatePdf}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "orange",
                color: "white",
                cursor: "pointer",
              }}
            >
              Générer le PDF
            </button>
            <button
              onClick={viewPdf}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "orange",
                color: "white",
                cursor: "pointer",
              }}
            >
              view le PDF
            </button>
            <button
              onClick={allInOne}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "purple",
                color: "white",
                cursor: "pointer",
              }}
            >
              Envoyer email
            </button>
            {showPopup && (
              <RequiredMessage
                onClose={handleClosePopup}
                nomChamp={fieldName}
              />
            )}
            {honoraireToCompare.map((data, index) => {
              const date = data.date;
              const amount = data.amount;
              const reference = data.reference;

              return (
                <div key={index}>
                  {showPopupDifference && (
                    <NoteHonoraireWarning
                      onClose={handleClosePopup}
                      date={date}
                      amount={amount}
                      reference={reference}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="taxation-form-content" style={{ display: "none" }}>
        <FormulaireDeTaxationPDF />
      </div>
    </>
  );
};

export default UploadFile;
