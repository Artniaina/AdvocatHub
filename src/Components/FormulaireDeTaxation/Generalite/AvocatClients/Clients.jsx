import React, { useState } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import Image from "../../../../assets/icons8-avocat-24.png";
import { IoAddCircle } from "react-icons/io5";

const Clients = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <div>
      <div className="titleCard">
        <img
          src={Image}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            position: "relative",
            top: "5px",
          }}
        />
        CLIENT(S)
      </div>

      <form onSubmit={handleSubmit} className="avocatForm">
      <div className="clientsForm">
      <label style={{ display: "inline" }} htmlFor="client">
        Client(s):*{" "}
      </label>
      <select id="client">
        <option value=""></option>
      </select>
      <div className="btnAdd">
        <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
      </div>
    </div>

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
          <input type="text" id="denomination" readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" readOnly />
        </div>

        <div className="three">
          <div className="formGroup">
            <label htmlFor="numVoie"> Numéro voie:</label>
            <input type="text" id="numVoie" readOnly />
          </div>

          <div className="formGroup">
            <label htmlFor="rue"> Rue:</label>
            <input className="two" type="text" id="rue" readOnly />
          </div>

          <div className="formGroup">
            <label htmlFor="cp"> CP:</label>
            <input type="text" id="cp" readOnly />
          </div>
        </div>

        <div className="two">
          <div className="formGroup ">
            <label htmlFor="localite">Localité:</label>
            <input type="text" id="localite" readOnly />
          </div>

          <div className="formGroup">
            <label htmlFor="bp">BP:</label>
            <input type="text" id="bp" readOnly />
          </div>
        </div>

        <div className="two">
          <div className="formGroup ">
            <label htmlFor="localitebp">Localité BP:</label>
            <input type="text" id="localitebp" readOnly />
          </div>

          <div className="formGroup">
            <label htmlFor="pays">Pays:</label>
            <input type="text" id="pays" readOnly />
          </div>
        </div>


        <div className="two">
          <div className="formGroup ">
            <label htmlFor="telephone">Téléphone:</label>
            <input type="text" id="telephone" readOnly />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" readOnly />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Clients;
