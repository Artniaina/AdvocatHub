import React, { useState, useEffect, useMemo, useRef } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import "../../../Styles/TaxationForm/CardInfo.css";
import RequiredMessage from "../../PopUp/RequiredMessage";
import NoteHonoraireWarning from "../../PopUp/NoteHonoraireWarning";
import Image from "../../../assets/icons8-fichier-67.png";
import { FaCheck } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useUpdateDataContext } from "../../../Hooks/UpdatedDataContext";
import UploadFileGuide from "../UploadFileGuide";
import SuccessPopup from "../../PopUp/PopUpSuccess"
import FormulaireDeTaxationPDF from "../../PDF/FormulaireDeTaxationPDF";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { useAuth } from "../../../Hooks/AuthContext";
import { useNavigation } from "../../../Hooks/NavigationListenerContext";
import "../../../Styles/spinner.css";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";
import { fetchFormulaireById } from "../../../Store/TaxationFormSlice";
import { useDispatch, useSelector } from "react-redux";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UploadFile = () => {
  const location = useLocation();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formulaire, setFormulaire] = useState(null);
  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(0);
  const formulaireId = location.state?.id;
  const [loading, setLoading] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const { user } = useAuth();
  const { updateJsonData } = useNavigation();
  const { formulaireData } = useUpdateDataContext();
  const { jsonToUpdate } = useUpdateDataContext();
  const { resetAllData } = useUpdateDataContext();
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
  } = useUpdateDataContext();

  const { fileInfos, setFileInfos } = useUpdateDataContext();
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

    return true;
  };
  const currentDate = new Date().toISOString();

  const fetchFormulaires = async () => {
    const url = `http://192.168.10.105/Utilisateur/FormulaireDeTaxation/${formulaireId}`;

    try {
        const response = await fetch(url, {
            method: 'GET', 
  
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json(); 
        console.log('Données reçues:', data);
        setFormulaire(data[0]);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération du formulaire:', error);
        throw error;
    }
};
    
  const generatePdf = async (formData) => {
    return new Promise((resolve, reject) => {
      try {
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
        sEmailRecepteur: "kanto.andriahariniaina@gmail.com",
        sFullName: fullName,
        sNomAvocat: avocatsData[0]?.nom,
        sDateSys: dateSys,
        sReferencepdf: referencePdf,
        spdfBase64: pdfBase64,
      };

      const response = await fetch(
        "http://192.168.10.105/Utilisateur/Email/InfoEmail",
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

    const idFormulaire = formulaireData?.sIDFormulaire;
  
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.10.105/Utilisateur/ModifForm/${idFormulaire}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...jsonToUpdate,
            sStatutFormulaire: "transmis",
            sFichiersJoints: filesName.join(","),
            sTransmis_le: new Date().toLocaleDateString('fr-FR').replace(/\//g, ''),
            sReferencePDF: `${dateSys}_${fullName}_Formulaire taxation ordinaire`
          }),
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        return result; 
      } else {
        console.error("Failed to submit form:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
      return null; 
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




  const dateSys = generateDateSys();
  const fullName = `${avocatsData[0]?.nom} ${avocatsData[0]?.prenom}`;
  const referencePdf = `${dateSys}_${fullName}_Formulaire taxation ordinaire`;

  return (
    <>
      {loading && <div className="loading-spinner1"></div>}
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
            <button onClick={handleSubmission}>
              <FaCheck style={{ color: "green", fontSize: "30px" }} />
              Envoyer
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
          {isEmailSent && (
              <SuccessPopup
                onGenerateAndSendPDF={viewPdf}
                content={"Formulaire taxation ordinaire"}
              />
            )}
        </div>
      </div>
      <div id="taxation-form-content" style={{ display: "none" }}>
      <FormulaireDeTaxationPDF formulaire={formulaire} />
      </div>
    </>
  );
};

export default UploadFile;
