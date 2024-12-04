import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "../../../Styles/Document/DocumentTable.css";
import DocViewer from "react-doc-viewer";

const DocumentList = () => {
  const documents = [
    {
      name: "Document 1",
      description: "This is a description for Document 1.",
      lastModified: "2024-12-01",
      version: "1.0",
      pdfUrl:
        "https://ag.umass.edu/sites/ag.umass.edu/files/pdf-doc-ppt/ma_snake_guide.pdf",
    },
    {
      name: "Document 2",
      description: "This is a description for Document 2.",
      lastModified: "2024-12-02",
      version: "2.0",
      wordUrl: "C:/Users/Kanto/Downloads/Memoire jo 5(2).docx",
    },
    {
      name: "Document 3",
      description: "This is a description for Document 3.",
      lastModified: "2024-12-03",
      version: "1.2",
      pdfUrl: "",
    },
  ];

  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocumentUrl, setCurrentDocumentUrl] = useState(null);

  const openModal = (url) => {
    setCurrentDocumentUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDocumentUrl(null);
  };

  return (
    <div>
      <SearchBar
        documents={documents}
        setFilteredDocuments={setFilteredDocuments}
      />

      <h1 className="table-title">Document List</h1>
      <div className="table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Last Modified</th>
              <th>Version</th>
              <th>View Document</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.name}</td>
                <td>{doc.description}</td>
                <td>{doc.lastModified}</td>
                <td>{doc.version}</td>
                <td>
                  {doc.pdfUrl ? (
                    <button
                      onClick={() => openModal(doc.pdfUrl)}
                      className="view-pdf-btn"
                    >
                      View PDF
                    </button>
                  ) : doc.wordUrl ? (
                    <button
                      onClick={() => openModal(doc.wordUrl)}
                      className="view-doc-btn"
                    >
                      View Word Document
                    </button>
                  ) : (
                    <span>No document available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentDocumentUrl && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeModal}>
              X
            </button>
            {currentDocumentUrl.includes(".pdf") ? (
              <object
                data={currentDocumentUrl}
                type="application/pdf"
                width="100%"
                style={{ height: "90vh" }}
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href={currentDocumentUrl}>to the PDF!</a>
                </p>
              </object>
            ) : (
              <DocViewer
                documents={[{ uri: currentDocumentUrl }]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
