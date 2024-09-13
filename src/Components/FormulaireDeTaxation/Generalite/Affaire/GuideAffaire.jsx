import React, { useState, useEffect, useRef } from "react";
import "../../../../Styles/TaxationForm/Guide.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";

const GuideAffaire = () => {
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
            top: "300vh",
          }}
        />
      </div>

      {isHovered && (
        <>
          <div
            className="popup-overlay"
            onMouseEnter={() => setIsHovered(true)}
          />
          <div className="popup-guide affaire" ref={popupRef}>
            <button
              className="popup-closee"
              onClick={() => setIsHovered(false)}
            >
              &times;
            </button>
            <h4>Nom de l'affaire * :</h4>
            <ul>
              <li>
                Insérer le nom du dossier dans votre étude (« Monsieur X c/
                Madame Y » ou « Société X SA – avis IP »), pas « Monsieur X c/
                Maître ZZZ ».
              </li>
            </ul>
            <h4>
              Une convention d’honoraires/lettre d’engagement a-t-elle été
              signée ?
            </h4>
            <li>
              Cliquer sur oui ou non &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="span">Non</span> Oui&nbsp;&nbsp;&nbsp;&nbsp; (le
              terme coloré est le terme sélectionné)
            </li>
            <strong>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Si oui, insérer texte de la
                convention (quels en étaient les termes ?) <br />
                Joindre la convention d’honoraires au dossier de taxation dans
                la case « DEPOSER DES FICHIERS ici » à la fin du formulaire.
              </p>
            </strong>

            <h4>
              Date, référence et montant TTC de la/des note(s) d'honoraires
              contestée(s) * :
            </h4>
            <ul>
              <ul>
                <li>
                  Cliquer sur le plus + <IoAddCircle className="addcirdle" />
                  pour accéder au tableau{" "}
                </li>
                <li>Insérer date, référence et montant déjà ou pas payée</li>
                <li>
                  Cliquer sur le bouton « Enregistrer » <span>Enregistrer</span>
                </li>
              </ul>

              <h4>
                &nbsp;&nbsp;&nbsp;&nbsp; Date, référence et montant TTC de
                la/des note(s) de provision :{" "}
              </h4>
              <ul>
                <li>
                  Cliquer sur le plus + <IoAddCircle className="addcirdle" />
                  pour accéder au tableau
                </li>
                <li>Insérer date, référence et montant déjà ou pas payée</li>
                <li>
                  Cliquer sur le bouton « Enregistrer » <span>Enregistrer</span>
                </li>
              </ul>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default GuideAffaire;
