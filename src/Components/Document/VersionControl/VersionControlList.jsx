import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "../../../Styles/Document/DocumentTable.css";
import PopupShare from "../DocumentPartages/PopupShare";
import PopupUploadVersion from "../DocumentPartages/PopupUploadVersion";

const VersionControlList = () => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [isPopupVersionShown, setIsPopupVersionShown] = useState(false);

  const showPopup = () => {
    setIsPopupShown(true);
  };
  const showVersionPopup = () => {
    setIsPopupVersionShown(true);
  };

  const documents = [
    {
      name: "Document 1",
      description: "This is a description for Document 1.",
      lastModified: "2024-12-01",
      version: "1.0",
    },
    {
      name: "Document 2",
      description: "This is a description for Document 2.",
      lastModified: "2024-12-02",
      version: "2.0",
    },
    {
      name: "Document 3",
      description: "This is a description for Document 3.",
      lastModified: "2024-12-03",
      version: "1.2",
    },
  ];

  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  return (
    <div>
      <SearchBar
        documents={documents}
        setFilteredDocuments={setFilteredDocuments}
      />

      <h1 className="table-title">Document Version Control</h1>
      <div className="table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Last Modified</th>
              <th>Version</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.name}</td>
                <td>{doc.description}</td>
                <td>{doc.lastModified}</td>
                <td>{doc.version}</td>
                <td className="actions-column">
                  <button className="action-button" onClick={showPopup}>
                    Share
                  </button>
                  <button className="action-button">Download</button>
                  <button className="action-button" onClick={showVersionPopup}>
                    Upload New Version
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopupShown && <PopupShare onClose={() => setIsPopupShown(false)} />}
      {isPopupVersionShown && (
        <PopupUploadVersion onClose={() => setIsPopupVersionShown(false)} />
      )}
    </div>
  );
};

export default VersionControlList;
