import React, { useState, useEffect, useRef } from "react";
import "../../../../Styles/TaxationForm/Guide.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Guide = () => {
  const [isHovered, setIsHovered] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (isHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered]);

  return (
    <>
      <div className="popup-trigger" onMouseEnter={() => setIsHovered(true)}>
        <BsFillQuestionCircleFill
          style={{
            color: "blueviolet",
            fontSize: "45px",
            position: "absolute",
            left: "10px",
            top: "154vh",
          }}
        />
      </div>

      {isHovered && (
        <>
          <div
            className="popup-overlay"
            onMouseEnter={() => setIsHovered(true)}
          />
          <div className="popup-guide" ref={popupRef}>
            <button
              className="popup-closee"
              onClick={() => setIsHovered(false)}
            >
            
              &times;
            </button>
            <h2>AVOCAT (titulaire du dossier) :</h2>
            <p>
              <strong>ATTENTION :</strong> si le mandat est confié à une société
              d’avocat, ne pas oublier de cocher la case correspondante, à
              défaut la taxation sera rendue contre l’avocat nominativement.
            </p>

            <h4>CLIENT(S) :</h4>
            <ul>
              <li>
                Cliquez sur le plus +{" "}
                <IoAddCircle className="addcirdle" />
                pour ajouter/créer un client.
              </li>
              <li>
                Ne pas omettre de cliquer sur « AJOUTER » <span>Ajouter</span> pour pouvoir valider
                le client SINON il ne sera pas enregistré.
              </li>
              <li>
                Pour modifier une fiche client existante, cliquez sur l’icône «
                crayon ».
              </li>
              <li>Cliquez sur le bouton « Enregistrer ».<span>Enregistrer</span></li>
            </ul>

            <h4>COLLABORATEUR(S) INSCRIT(S) OU NON INSCRIT(S) :</h4>
            <ul>
              <li>
                Cliquez sur le plus +{" "}
                <IoAddCircle  className="addcirdle" />
                pour ajouter/créer un collaborateur.
              </li>
              <li>
                L’avocat collaborateur ne doit pas omettre de se mentionner.
              </li>
              <li>Choisir le nom de l’avocat concerné.</li>
              <li>Cliquez sur le bouton « Enregistrer ». <span>Enregistrer</span></li>
            </ul>

            <h4>PRESTATAIRE(S) EXTERIEUR :</h4>
            <ul>
              <li>
                Cliquez sur le plus +{" "}
                <IoAddCircle  className="addcirdle" />
                pour ajouter/créer un/plusieurs prestataire(s) extérieur(s).
              </li>
              <li>
                Ne pas omettre de cliquer sur « AJOUTER » <span>Ajouter</span>pour pouvoir valider
                SINON il ne sera pas enregistré.
              </li>
              <li>Cliquez sur le bouton « Enregistrer ». <span>Enregistrer</span></li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Guide;
