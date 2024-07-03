import React from "react";
import "../../Styles/PopUp/Confirmation.css";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ConfirmationValidation = ({ onClose , onSubmit, onNoSubmit}) => {
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
            Voulez-vous enregistrer les modifications ?
          </p>
            </div>
          
          <div className="confbtn">
            <button onClick={onSubmit} >Oui</button>
            <button onClick={onNoSubmit}>Non</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationValidation;
