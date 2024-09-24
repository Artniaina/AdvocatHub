import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/PopUp/AllPopUp.css";
import "../../Styles/spinner.css";
import { IoIosCloseCircle } from "react-icons/io";
import { useAuth } from "../../Hooks/AuthContext";
import { pdf } from "@react-pdf/renderer";
import { fetchAvocatInfo } from "../../Store/AvocatSlice";
import CertificatInscription from "../PDF/CertificatInscription";
import SuccessPopup from "../PopUp/PopUpSuccess";

const PopUpCertificatdInscri = ({ onClose }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo) || {};
  const [currentBlobUrl, setCurrentBlobUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(`'${user.email}'`));
    } else {
      console.log("User or User Email is not available.");
    }
  }, [dispatch, user]);

  const fullName = `${avocatInfo.m_sPrenom || ""} ${avocatInfo.m_sNom || ""}`;
  const formatDateFromString = (dateString) => {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;
    const day = parseInt(dateString.substring(6, 8), 10);
    const date = new Date(year, month, day);
    return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(date);
  };

  const prenomNom = fullName;
  const nom = avocatInfo.m_sNom;
  const adresse = `${avocatInfo.m_nNumVoie || ""}, ${avocatInfo.m_sAdresse || ""}, ${avocatInfo.m_sCodePostale || ""} ${avocatInfo.m_sLocalite || ""}`;
  const dateAssermentation = formatDateFromString(avocatInfo.m_dDateAssermentation);
  const gedFonction = avocatInfo.m_sGedFonction || "";

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(today);
  const date = formattedDate;

  const generateAndViewPdf = async (doc) => {
    try {
      const blob = await pdf(doc).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      setCurrentBlobUrl(blobUrl);

      window.open(blobUrl, "_blank");

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 30000);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    }
  };

  const handleViewPdf = async () => {
    const doc = (
      <CertificatInscription
        prenomNom={prenomNom}
        adresse={adresse}
        dateAssermentation={dateAssermentation}
        gedFonction={gedFonction}
        date={date}
      />
    );

    await generateAndViewPdf(doc);
    setLoading(false);
    onClose(); 
  };

  const handleGenerateAndSendPDF = async () => {
    setLoading(true);
    try {
      const doc = (
        <CertificatInscription
          prenomNom={prenomNom}
          adresse={adresse}
          dateAssermentation={dateAssermentation}
          gedFonction={gedFonction}
          date={date}
        />
      );

      const blob = await pdf(doc).toBlob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

        try {
          const response = await fetch("http://192.168.10.10/Utilisateur/Send_email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sEmailRecepteur: "kanto.andriahariniaina@gmail.com",
              sDateSys: date,
              sNomAvocat: nom,
              sFullName: fullName,
              spdfBase64: base64data,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log("Notification envoyée avec succès pour l'envoi de l'email !");
            console.log("Réponse du serveur:", data.smessage);
            setContentLoaded(true);
          } else {
            console.error("Échec de la notification de l'envoi de l'email:", data.smessage);
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi de l'email:", error);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : contentLoaded ? (
        <SuccessPopup
          onGenerateAndSendPDF={handleViewPdf}
        />
      ) : (
        <>
          <div className="popupNav">
            <button className="close-button" onClick={onClose}>
              <IoIosCloseCircle />
            </button>
            <div className="popup-contentNav">
              <p className="certiftxt">TYPE DE CERTIFICAT D'INSCRIPTION</p>
              <div className="radio">
                <label>
                  <input type="radio" name="certificateType" value="standard" defaultChecked />
                  Standard
                </label>
                <label>
                  <input type="radio" name="certificateType" value="assurance" />
                  Assurance
                </label>
                <label>
                  <input type="radio" name="certificateType" value="ce" />
                  CE
                </label>
              </div>
              <div className="divNavi">
                <button className="btnNavi" onClick={handleGenerateAndSendPDF}>
                  Valider
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PopUpCertificatdInscri;
