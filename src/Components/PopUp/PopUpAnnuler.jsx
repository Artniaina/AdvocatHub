import React from "react";
import "../../Styles/PopUp/Confirmation.css";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

const PopUpAnnuler = ({ onClose, onReset }) => {
  return (
    <div className="overlay">
      <div className="popupModif">
        <button className="closeConf" onClick={onClose}>
          <IoMdCloseCircleOutline />
        </button>
        <div className="popup-content">
          <div>
            <p>
              <BsQuestionCircleFill
                style={{ fontSize: "35px", color: "#5959bd" }}
              />
              <br />
              Souhaitez-vous annuler la modification de votre fiche avocat ?
            </p>
          </div>
          <div className="confbtn">
            <button onClick={onReset}>Oui</button>
            <button onClick={onClose}>Non</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopUpAnnuler;
