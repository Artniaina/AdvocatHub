import React, { useState } from "react";
import "../../../Styles/TaxationForm/CardInfo.css"
import Image from '../../../assets/icons8-user-menu-male-40.png'

const Avocat = () => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [etude, setEtude] = useState("");
  const [adresseEtude, setAdresseEtude] = useState("");
  const [dateAssermentation, setDateAssermentation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [societe, setSociete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <div>          
      <div className="titleCard"><img src={Image} alt="" style={{width:"40px", height:"40px", position:"relative", top:"5px"}} /> AVOCAT (titulaire du dossier)</div>

      <form onSubmit={handleSubmit} className="avocatForm">
        <div className="formGroup">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="etude">Etude:</label>
          <input
            type="text"
            id="etude"
            value={etude}
            onChange={(e) => setEtude(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="adresseEtude">Adresse de l'étude:</label>
          <input
            type="text"
            id="adresseEtude"
            value={adresseEtude}
            onChange={(e) => setAdresseEtude(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="dateAssermentation">Date d'assermentation:</label>
          <input
            type="text"
            id="dateAssermentation"
            value={dateAssermentation}
            onChange={(e) => setDateAssermentation(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="telephone">Téléphone:</label>
          <input
            type="text"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            readOnly
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>

        <div style={{margin:"10px"}}>
        <input type="checkbox" id="societe" name="societe" value="societe"/>
        <label for="societe" > <strong style={{color:"#595b69", fontSize:"18px"}}>Société d'avocats</strong></label>
        </div>
      </form>
    </div>
  );
};

export default Avocat;
