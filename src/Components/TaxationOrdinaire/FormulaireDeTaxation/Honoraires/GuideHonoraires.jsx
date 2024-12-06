import React, { useState, useEffect, useRef } from "react";
import "../../../../Styles/TaxationForm/Guide.css";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { TfiPencilAlt } from "react-icons/tfi";const GuideHonoraires = () => {
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
            top: "554vh",
          }}
        />
      </div>

      {isHovered && (
        <>
          <div
            className="popup-overlay"
            onMouseEnter={() => setIsHovered(true)}
          />
          <div className="popup-guide honoraire" ref={popupRef}>
            <button
              className="popup-closee"
              onClick={() => setIsHovered(false)}
            >
              &times;
            </button>

            <p style={{marginBottom:"0px", fontSize:"24px"}}>
              Cliquer sur l’icône « Crayon » <TfiPencilAlt style={{margin:"-7px 26px", fontSize:"40px"}}/>pour modifier une note d’honoraires
              existante.
            </p>
            <ul>
              <li>
                <strong >
                  Bien penser à cliquer sur « MODIFIER » pour sauvegarder les
                  modifications !
                </strong>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default GuideHonoraires;
