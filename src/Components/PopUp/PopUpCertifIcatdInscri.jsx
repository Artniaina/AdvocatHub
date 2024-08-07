import React, {useEffect, useState}from 'react';
import { useDispatch,useSelector } from 'react-redux';
import "../../Styles/PopUp/AllPopUp.css";
import { IoIosCloseCircle } from "react-icons/io";
import { useAuth } from "../../Hooks/AuthContext";
import { pdf } from '@react-pdf/renderer';
import { fetchAvocatInfo } from "../../Store/AvocatSlice";
import CertificatInscription from '../PDF/CertificatInscription';

const PopUpCertifIcatdInscri = ({ onClose }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const avocatInfo = useSelector((state) => state.avocat.avocatInfo) || {};
  const [pdfUrl, setPdfUrl] = useState('');
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchAvocatInfo(`'${user.email}'`));
    } else {
      console.log('User or User Email is not available.');
    }
  }, [dispatch, user]);

  const fullName = `${avocatInfo.m_sPrenom || ""} ${avocatInfo.m_sNom || ""}`;
  function formatDateFromString(dateString) {
   
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; 
    const day = parseInt(dateString.substring(6, 8), 10);
  
    const date = new Date(year, month, day);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }
  
  const prenomNom = fullName;
  const adresse = `${avocatInfo.m_nNumVoie || ""}, ${avocatInfo.m_sAdresse || ""}, ${avocatInfo.m_sCodePostale || ""} ${avocatInfo.m_sLocalite || ""}`;
  const dateAssermentation = formatDateFromString(avocatInfo.m_dDateAssermentation);
  const gedFonction = `${avocatInfo.m_sGedFonction || ""}`;
  
  const today = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(today);
  const date = formattedDate;
    
  const handleGeneratePDF = () => {
    const doc = <CertificatInscription prenomNom={prenomNom} adresse={adresse} dateAssermentation={dateAssermentation} gedFonction={gedFonction} date={date} />;
    
    pdf(doc).toBlob().then(blob => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url); 
      console.log('PDF URL:', url); 
      
      window.open(url, '_blank');
    
      setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log('PDF URL revoked');
      }, 30000); 
    });
  };
  

  return (
    <div className="overlay">
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
            <button className="btnNavi" onClick={handleGeneratePDF}>Valider</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpCertifIcatdInscri;
