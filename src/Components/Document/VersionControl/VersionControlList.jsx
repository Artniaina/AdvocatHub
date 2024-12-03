import React, { useState } from "react";
import SearchBar from "../SearchBar";

const VersionControlList = () => {
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#5E1675",
        padding: "20px",
      }}
    >
      <SearchBar
        documents={documents}
        setFilteredDocuments={setFilteredDocuments}
      />

      <h1
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}
      >
        Document Version Control
      </h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#5E1675", color: "#ffffff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
            <th style={{ padding: "10px", textAlign: "left" }}>
              Last Modified
            </th>
            <th style={{ padding: "10px", textAlign: "left" }}>Version</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#EDE3F2" : "#CBA8DA",
              }}
            >
              <td style={{ padding: "10px" }}>{doc.name}</td>
              <td style={{ padding: "10px" }}>{doc.description}</td>
              <td style={{ padding: "10px" }}>{doc.lastModified}</td>
              <td style={{ padding: "10px" }}>{doc.version}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <button
                  style={{
                    marginRight: "5px",
                    padding: "5px 10px",
                    backgroundColor: "#5E1675",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Share
                </button>
                <button
                  style={{
                    marginRight: "5px",
                    padding: "5px 10px",
                    backgroundColor: "#5E1675",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#5E1675",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Upload New Version
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VersionControlList;
