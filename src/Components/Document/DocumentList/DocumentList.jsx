import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "../../../Styles/Document/DocumentTable.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

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
      wordUrl: require("./Compte rendu de la journée.docx"),  // Use `wordUrl` or similar to represent the word file.
    },
    {
      name: "Document 3",
      description: "This is a description for Document 3.",
      lastModified: "2024-12-03",
      version: "1.2",
      pdfUrl: "",
    },
  ];
  const docs = [
    // {
    //   uri:
    //     "http://localhost:9000/uploads/ULRYB3ATJ56B/Screenshot%202021-04-28%20at%2014.04.23.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20210507%2F%2Fs3%2Faws4_request&X-Amz-Date=20210507T142426Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=761187860be22801088ab8c212733f7f52af8f62d638f1341ee2ae4c18944251"
    //   // "http://localhost:9000/uploads/6QK5HJ84MAEM/RAS-118_CompanyCodes__SalesOffices.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20210507%2F%2Fs3%2Faws4_request&X-Amz-Date=20210507T110429Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=c20f9b77ffdc1a15910cea5acd3420b6583a1d4d38ce5716da30f1d0ea4315d5"
    //   // "https://res.cloudinary.com/cloudinaryforme/image/upload/v1618339571/workplace-1245776_1920_i9ayae.jpg"
    // },

    // {
    //   uri:
    //     "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf"
    // },
    // { uri: require("./test-excelaki.xlsx") },
    // { uri: require("./Compte rendu de la journée.docx") }
  ];
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocumentUrl, setCurrentDocumentUrl] = useState(null);
  const [documentType, setDocumentType] = useState(""); // Track document type (PDF/Word)

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
              <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />

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
