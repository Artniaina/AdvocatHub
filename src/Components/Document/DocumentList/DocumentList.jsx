import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "../../../Styles/Document/DocumentTable.css";
import  { DocViewerRenderers } from "react-doc-viewer";
import DocViewer from "./doc.js";

const DocumentList = () => {
  const DocIframe = ({ source }) => {
    if (!source) {
      return <div>Loading...</div>;
    }
  
    const src = source;
    return (
      <div>
        <iframe
          src={"https://docs.google.com/viewer?url=" + src + "&embedded=true"}
          title="file"
          width="100%"
          height="600"
        ></iframe>
      </div>
    );
  };
  
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
      wordUrl: "https://www.academia.edu/35362398/Amour_docx",
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
  const [documentType, setDocumentType] = useState("");

  const openModal = (url, type) => {
    setCurrentDocumentUrl(url);
    setDocumentType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDocumentUrl(null);
    setDocumentType("");
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
                      onClick={() => openModal(doc.pdfUrl, "pdf")}
                      className="view-pdf-btn"
                    >
                      View PDF
                    </button>
                  ) : doc.wordUrl ? (
                    <button
                      onClick={() => openModal(doc.wordUrl, "word")}
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
            {documentType === "pdf" ? (
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
            ) : documentType === "word" ? (
              <div className="App">
              <h1>Sample Doc file:</h1>
              <DocViewer source="https://www.academia.edu/35362398/Amour_docx" />
            </div>
            ) : (
              <p>No document available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;