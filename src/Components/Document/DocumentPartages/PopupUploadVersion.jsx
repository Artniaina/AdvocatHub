import React, { useState, useRef } from 'react';
import '../../../Styles/Document/PopupUploadVersion.css';

const PopupUploadVersion = ({ onClose, currentVersion }) => {
  const [file, setFile] = useState(null);
  const [versionName, setVersionName] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert('Veuillez sélectionner un fichier à télécharger');
      return;
    }

    const uploadData = {
      file,
      versionName: versionName || `Version ${currentVersion + 1}`,
      description
    };

    console.log('Téléchargement de la nouvelle version du document:', uploadData);
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="document-version-overlay">
      <div className="document-version-container">
        <div className="document-version-header">
          <h2>Télécharger une nouvelle version du document</h2>
          <button 
            className="document-version-close" 
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="document-version-form">
          <div 
            className="document-version-dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="document-version-file-input"
              hidden 
            />
            {file ? (
              <div className="document-version-file-preview">
                <p>Fichier sélectionné : {file.name}</p>
                <p>Taille : {(file.size / 1024).toFixed(2)} Ko</p>
              </div>
            ) : (
              <div className="document-version-dropzone-content">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="50" 
                  height="50" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#5E1675" 
                  strokeWidth="1.5"
                >
                  <path d="M21.2 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"/>
                  <path d="M17 9l-5-5-5 5"/>
                  <path d="M12 4v12"/>
                </svg>
                <p>Glissez-déposez ou cliquez pour télécharger</p>
                <span>Formats supportés : PDF, DOCX, TXT</span>
              </div>
            )}
          </div>

          <div className="document-version-input-group">
            <label htmlFor="document-version-name">Nom de la version</label>
            <input
              type="text"
              id="document-version-name"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              className="document-version-input"
              placeholder={`Version ${currentVersion + 1}`}
            />
          </div>

          <div className="document-version-input-group">
            <label htmlFor="document-version-description">Description (optionnelle)</label>
            <textarea
              id="document-version-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="document-version-textarea"
              placeholder="Ajoutez des notes sur cette mise à jour de version"
            />
          </div>

          <div className="document-version-actions">
            <button 
              type="submit" 
              className="document-version-submit-btn"
            >
              Télécharger la nouvelle version
            </button>
            <button 
              type="button" 
              className="document-version-cancel-btn" 
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default PopupUploadVersion;