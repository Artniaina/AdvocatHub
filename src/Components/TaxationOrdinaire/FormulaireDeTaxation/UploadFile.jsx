import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import RequiredMessage from "../../PopUp/RequiredMessage";
import NoteHonoraireWarning from "../../PopUp/NoteHonoraireWarning";
import Image from "../../../assets/icons8-fichier-67.png";
import { FaCheck } from "react-icons/fa";
import { IoAddCircle, IoLogOut } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";
import UploadFileGuide from "../UploadFileGuide";
import FormulaireDeTaxationPDF from "../../PDF/FormulaireDeTaxationPDF";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import "../../../Styles/spinner.css";
import SuccessPopup from "../../PopUp/PopUpSuccess";
import { useAuth } from "../../../Hooks/AuthContext";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const apiUrl = process.env.REACT_APP_API_URL;

const UploadFile = () => {
  const user = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formulaire, setFormulaire] = useState(null);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  
  const { jsonToSend, resetAllData } = useGeneraliteContext();
  const { noteHonoraireToCompare, honoraireToCompare } = useGeneraliteContext();
  const {
    formData,
    montantData,
    noteHonoraire,
    honoraireData,
    prestataires,
    avocatsData,
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

  const generateDateSys = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0").slice(0, 2);
    return `${year}${month}${day}-${hours}-${minutes}-${seconds}-${milliseconds}`;
  };

  const dateSys = generateDateSys();
  const fullName = `${avocatsData[0]?.nom} ${avocatsData[0]?.prenom}`;
  const referencePdf = `${dateSys}_${fullName}_Formulaire taxation ordinaire`;

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

    return true;
  };

  const fetchFormulaires = async () => {
    setStatus("loading");
    try {
      const response = await fetch(
        `${apiUrl}/Utilisateur/Formulaire/FormTransmis`
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const text = await response.text();
      if (!text) {
        console.log("Response is empty");
        setFormulaire(null);
        setStatus("succeeded");
        return null;
      }
  
      const data = JSON.parse(text);
      const latestFormulaire = data.length ? data[0] : null;
      setFormulaire(latestFormulaire);
      setStatus("succeeded");
      return latestFormulaire;
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("failed");
      throw error;
    }
  };
  
  const generatePdf = async (formData) => {
    return new Promise((resolve, reject) => {
      try {
        // Forcer un rendu synchrone avec les nouvelles données
        const pdfContent = document.getElementById("taxation-form-content");
        if (!pdfContent) {
          throw new Error("PDF content element not found");
        }
  
        const htmlContent = pdfContent.innerHTML;
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
  
  const sendEmail = async (pdfBase64) => {
    setLoadingEmail(true);
    try {
      const emailData = {
        sEmailRecepteur: user?.email,
        sFullName: fullName,
        sNomAvocat: avocatsData[0]?.nom,
        sDateSys: dateSys,
        sReferencepdf: referencePdf,
        spdfBase64: pdfBase64,
      };

      const response = await fetch(
        `${apiUrl}/Utilisateur/Email/InfoEmail`,
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
        console.log("Email envoyé avec succès :", result);
        setIsEmailSent(true);
      } else {
        throw new Error("Échec de l'envoi de l'email");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      throw error;
    } finally {
      setLoadingEmail(false);
    }
  };

  const submitFormData = async () => {
    // if (!validateFormData()) {
    //   return false;
    // }
 
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/Utilisateur/DossierTaxation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...jsonToSend,
            sStatutFormulaire: "transmis",
            sFichiersJoints: filesName.join(","),
            sTransmis_le : new Date().toLocaleDateString('fr-FR').split('/').reverse().join(''),
            sReferencePDF: referencePdf,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      return true;
    } catch (error) {
      console.error("Error while submitting form:", error);
      return false;
    } finally {
      setLoading(false);
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
      setIsEmailSent(false);
    } catch (error) {
      console.error("Error while viewing PDF:", error);
    }
  };

  const handleOkClick = () => {
    viewPdf();  
    navigate('/home/formTaxation');  
  };

  const handleSubmission = async () => {
    try {
        const isSubmitted = await submitFormData();
        if (!isSubmitted) return;

 
        const updatedFormulaire = await fetchFormulaires();
        if (!updatedFormulaire) {
            console.error("No updated formulaire received");
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        const pdfBase64 = await generatePdf(updatedFormulaire);
        
  
        await sendEmail(pdfBase64);
    } catch (error) {
        console.error("Error in submission process:", error);
    }
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
      {loadingEmail && <div className="loading-spinner1"></div>}
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
              onClick={handleSubmission}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <FaCheck style={{ color: "green", fontSize: "40px" }} />
              Envoyer
            </button>
            {showPopup && (
              <RequiredMessage
                onClose={handleClosePopup}
                nomChamp={fieldName}
              />
            )}
            {isEmailSent && (
              <SuccessPopup
                onGenerateAndSendPDF={handleOkClick}
                content={"Formulaire taxation ordinaire"}
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
        <FormulaireDeTaxationPDF formulaire={formulaire} />
      </div>
    </>
  );
};

export default UploadFile;
