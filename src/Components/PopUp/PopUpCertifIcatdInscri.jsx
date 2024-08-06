import React from 'react';
import "../../Styles/PopUp/AllPopUp.css";
import { IoIosCloseCircle } from "react-icons/io";
import { pdf } from '@react-pdf/renderer';
import CertificatInscription from '../PDFCertificatInscription/CertificatInscription';

const PopUpCertifIcatdInscri = ({ message, onClose }) => {
  const prenomNom = 'Jean Dupont';
  const adresse = '123 Rue de l’Avocat';
  const dateAssermentation = '01/01/2020';
  const gedFonction = 'Avocat';
  const date = '01/08/2024';

  const handleGeneratePDF = () => {
    const doc = <CertificatInscription prenomNom={prenomNom} adresse={adresse} dateAssermentation={dateAssermentation} gedFonction={gedFonction} date={date} />;
    pdf(doc).toBlob().then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificat.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
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
