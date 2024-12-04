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
      alert('Please select a file to upload');
      return;
    }

    const uploadData = {
      file,
      versionName: versionName || `Version ${currentVersion + 1}`,
      description
    };

    console.log('Upload Document Version:', uploadData);
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="document-version-overlay">
      <div className="document-version-container">
        <div className="document-version-header">
          <h2>Upload New Document Version</h2>
          <button 
            className="document-version-close" 
            onClick={onClose}
            aria-label="Close"
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
                <p>Selected File: {file.name}</p>
                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
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
                <p>Drag and drop or click to upload</p>
                <span>Supported formats: PDF, DOCX, TXT</span>
              </div>
            )}
          </div>

          <div className="document-version-input-group">
            <label htmlFor="document-version-name">Version Name</label>
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
            <label htmlFor="document-version-description">Description (optional)</label>
            <textarea
              id="document-version-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="document-version-textarea"
              placeholder="Add notes about this version update"
            />
          </div>

          <div className="document-version-actions">
            <button 
              type="submit" 
              className="document-version-submit-btn"
            >
              Upload New Version
            </button>
            <button 
              type="button" 
              className="document-version-cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupUploadVersion;