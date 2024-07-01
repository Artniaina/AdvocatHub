import React from "react";
import "../../Styles/PopUp/Confirmation.css";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ConfirmationValidation = ({ onClose , onSubmit}) => {
  return (
    <div className="overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
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
            <button onClick={onClose}>Non</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationValidation;
