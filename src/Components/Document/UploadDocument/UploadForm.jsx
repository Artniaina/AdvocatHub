import React, { useState } from 'react';
import '../../../Styles/Document/UploadForm.css';
 
const UploadForm = () => {
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const metadata = {
      documentName,
      documentDescription,
      tags,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
    };

    console.log('Document Metadata:', metadata);
    console.log('Uploaded File:', file);
  };

  return (
    <div className="upload-form-container">
      <h2 className="upload-form-title">Upload Document</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="documentName">Document Name: </label>
          <input
            type="text"
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="documentDescription">Document Description:</label>
          <textarea
            id="documentDescription"
            value={documentDescription}
            onChange={(e) => setDocumentDescription(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (optional):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf, .docx, .xlsx"
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn">Upload Document</button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
