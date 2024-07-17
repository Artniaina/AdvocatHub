import React from "react";
import "../../Styles/PopUp/AllPopUp.css";
import { IoIosCloseCircle } from "react-icons/io";

const PopUpCertifIcatdInscri = ({ message, onClose }) => {
  return (
    <div className="overlay">
      <div className="popupNav">
        <button className="close-button" onClick={onClose}>
          <IoIosCloseCircle />
        </button>
        <div className="popup-contentNav">
          <p className="certiftxt">TYPE DE CERTIFICAT D'INSCRIPTION</p>
          <div className="radio">
            <label >
              <input type="radio" name="certificateType" value="standard" defaultChecked  />
              Standard
            </label>
            <label>
              <input type="radio" name="certificateType" value="assurance" />
              Assurance
            </label >
            <label>
              <input type="radio" name="certificateType" value="ce" />
              CE
            </label>
          </div>
          <div className="divNavi">
          <button className="btnNavi">valider</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpCertifIcatdInscri;
