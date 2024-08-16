import React, { useState } from "react";
import "../../Styles/TaxationForm/CardInfo.css";
import Image from "../../assets/icons8-fichier-67.png";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const UploadFile = () => {
  const [fileInfos, setFileInfos] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFileInfos = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2),
    }));
    setFileInfos((prevFileInfos) => [...prevFileInfos, ...newFileInfos]);
  };

  const handleRemoveFile = (index) => {
    setFileInfos((prevFileInfos) =>
      prevFileInfos.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    if (fileInfos.length > 0) {
      console.log("Fichiers envoyés:", fileInfos.map((file) => file.name));
    } else {
      console.log("Aucun fichier sélectionné");
    }
  };

  return (
    <>
      <div
        className="cardGeneralité"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="CardFichiers">
          <p>
            <img
              src={Image}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />{" "}
            Déposer des fichiers ici *
          </p>
          {fileInfos.length > 0 ? (
            <div>
              {fileInfos.map((file, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div>
                    <strong>Nom du fichier:</strong> {file.name}
                  </div>
                  <div>
                    <strong>Taille du fichier:</strong> {file.size} KB
                  </div>
                  <button onClick={() => handleRemoveFile(index)}>
                    <FaTrashAlt style={{ color: "red", fontSize: "20px" }} />{" "}
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>Aucun fichier sélectionné</div>
          )}
        </div>
        <div
          className="buttonDiv"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <label htmlFor="file-upload" className="custom-file-upload">
            <IoAddCircle style={{ color: "green", fontSize: "40px" }} />
            Parcourir
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple 
          />
          <button onClick={handleSubmit}>
            <FaCheck style={{ color: "green", fontSize: "30px" }} />
            Envoyer
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
