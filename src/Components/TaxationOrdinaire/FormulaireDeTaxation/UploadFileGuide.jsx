import React, { useState, useEffect, useRef } from "react";
import "../../../Styles/TaxationForm/Guide.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const UploadFileGuide = () => {
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
            top: "900vh",
          }}
        />
      </div>

      {isHovered && (
        <>
          <div
            className="popup-overlay"
            onMouseEnter={() => setIsHovered(true)}
          />
          <div className="upload" style={{top:"853vh"}} ref={popupRef}>
            <button
              className="popup-closee"
              onClick={() => setIsHovered(false)}
            >
              &times;
            </button>
            <h4>
              Prière de verser les documents suivants en 1 ou plusieurs fichiers
              :
            </h4>
            <ul>
              <li>Mémoire(s) de frais et honoraires,</li>
              <li>
                {" "}
                Convention d’honoraires / lettre d’engagement (si existant),
              </li>
              <li> Listing détaillé et durée des prestations,</li>
              <li> Demande(s) de provision(s) payées ou non, (si existant)</li>
              <li>
                Courrier(s) de contestations du client concernant vos
                honoraires, (si existant)
              </li>
              <li>
                {" "}
                Justificatif(s) des frais de justice, d’expertise, de
                traduction… (si existant)
              </li>
              <li>
                L’intégralité du dossier permettant d’évaluer les prestations de
                l’avocat soumises à taxation (Optionnel)
              </li>

              <li>
                Cliquer sur <IoAddCircle style={{ color: "green", fontSize: "40px", marginBottom:"-13px" }} />
                Parcourir pour insérer des
                fichiers
              </li>

              <li>
                Cliquer sur  <FaCheck style={{ color: "green", fontSize: "30px", marginBottom:"-13px"  }}/>
                Envoyer pour valider définitivement la Demande
                d’information pour taxation. Une fois envoyé, le formulaire ne
                pourra plus être modifié.
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default UploadFileGuide;
