import React from "react";
import "../../Styles/Homepage/Acceuil/Acceuil.css";

const ContenuAcceuil = () => {
  return (
    <div className="mainContainer">
      <div className="container">
        <h1>
          Informations personnelles
          <hr />
        </h1>
        <div className="containerInfo">
          <p>
            Nom: <br /> John Doe
          </p>
          <p>Prénom: <br /> Mathieu</p>
          <p>Genre M/F: <br /> M</p>
          <p>Nationalité <br /> France</p>
          <p>Date de naissance: <br />121212</p>
          <p>Lieu de naissance: <br />121212</p>
          <p>Adresse privée: <br />121212</p>
          <p>Telephone mobile: <br />121212</p>
          <p>E-mail privé: <br />121212</p>
          <p>IBAN: <br />121212</p>
          <p>Code BIC: <br />121212</p>
        </div>
      </div>
      <div className="container">
        <h1>
          Informations professionnelles <hr />
        </h1>

        <div className="containerInfo">
          <p>
            Nom: <br /> John Doe
          </p>
          <p>Âge: 30 ans</p>
          <p>Adresse: 1234 Rue Exemple, Ville, Pays</p>
          <p>Email: johndoe@example.com</p>
        </div>
      </div>
      <div className="container">
        <h1>
          Etude
          <hr />
        </h1>
        <div className="containerInfo">
          <p>
            Nom: <br /> John Doe
          </p>
          <p>Âge: 30 ans</p>
          <p>Adresse: 1234 Rue Exemple, Ville, Pays</p>
          <p>Email: johndoe@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContenuAcceuil;
