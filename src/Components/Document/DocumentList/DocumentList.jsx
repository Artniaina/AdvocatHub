import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "../../../Styles/Document/DocumentTable.css";

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
      pdfUrl: "",
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
              <th>View PDF</th>
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
                  <object
                    data={doc.pdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="200px"
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={doc.pdfUrl}>to the PDF!</a>
                    </p>
                  </object>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentList;
