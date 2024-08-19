import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/Popup.css"
import { add } from "lodash";
const PopupClients = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const add = () => {
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
          CLIENT(S)
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="avocatForm">
           <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Particulier"
                checked={selectedOption === "Particulier"}
                onChange={handleOptionChange}
              />
              Particulier
            </label>

            <label>
              <input
                type="radio"
                value="Société/Entité"
                checked={selectedOption === "Société/Entité"}
                onChange={handleOptionChange}
              />
              Société/Entité
            </label>
          </div>

          <div className="formGroup">
            <label htmlFor="denomination">
              Denomination Sociale / Organe reprêsentatif:
            </label>
            <input type="text" id="denomination"  />
          </div>

          <div className="formGroup">
            <label htmlFor="name">Nom:</label>
            <input type="text" id="name"  />
          </div>

          <div className="formGroup">
            <label htmlFor="prenom">Prénom:</label>
            <input type="text" id="prenom"  />
          </div>

          <div className="three">
            <div className="formGroup">
              <label htmlFor="numVoie"> Numéro voie:</label>
              <input type="text" id="numVoie"  />
            </div>

            <div className="formGroup">
              <label htmlFor="rue"> Rue:</label>
              <input className="two" type="text" id="rue"  />
            </div>

            <div className="formGroup">
              <label htmlFor="cp"> CP:</label>
              <input type="text" id="cp"  />
            </div>
          </div>

          <div className="two">
            <div className="formGroup ">
              <label htmlFor="localite">Localité:</label>
              <input type="text" id="localite"  />
            </div>

            <div className="formGroup">
              <label htmlFor="bp">BP:</label>
              <input type="text" id="bp"  />
            </div>
          </div>

          <div className="two">
            <div className="formGroup ">
              <label htmlFor="localitebp">Localité BP:</label>
              <input type="text" id="localitebp"  />
            </div>

            <div className="formGroup">
              <label htmlFor="pays">Pays:</label>
              <input type="text" id="pays"  />
            </div>
          </div>

          <div className="two">
            <div className="formGroup ">
              <label htmlFor="telephone">Téléphone:</label>
              <input type="text" id="telephone"  />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email"  />
            </div>
          </div>
          <button onClick={add}>Ajouter</button>
        </form>
        <table className="tavleInfo">
          
        </table>
      </div>
    </div>
  );
};

export default PopupClients;
