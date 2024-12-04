import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "../../../Styles/Document/ListeDocumentPartages.css"

const ListeDocumentPartages = () => {
  const documents = [
    {
      name: "Project Proposal.pdf",
      sharedBy: "John Doe",
      dateShared: "2024-11-15",
      link: "#",
      description: "Project proposal document",
      status: "approved",
    },
    {
      name: "Budget Report.xlsx",
      sharedBy: "Alice Smith",
      dateShared: "2024-11-20",
      link: "#",
      description: "Budget for Q4",
      status: "pending",
    },
    {
      name: "Client Meeting Notes.docx",
      sharedBy: "Jane Doe",
      dateShared: "2024-11-25",
      link: "#",
      description: "Meeting notes for client meeting",
      status: "approved",
    },
    {
      name: "Website Design Mockups.png",
      sharedBy: "Emma Johnson",
      dateShared: "2024-11-30",
      link: "#",
      description: "Design mockups for the website",
      status: "pending",
    },
  ];

  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  const approvedDocuments = filteredDocuments.filter((doc) => doc.status === "approved");
  const pendingDocuments = filteredDocuments.filter((doc) => doc.status === "pending");

  const renderTable = (docs, title) => (
    <>
      <h3 className="table-title">{title}</h3>
      <div className="table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Shared By</th>
              <th>Date Shared</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, index) => (
              <tr key={index}>
                <td>{doc.name}</td>
                <td>{doc.sharedBy}</td>
                <td>{doc.dateShared}</td>
                <td>
                  <a href={doc.link} className="action-link">
                    View/Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="liste-document-container">
      <SearchBar documents={documents} setFilteredDocuments={setFilteredDocuments} />
      <h2 className="main-title">Shared Documents</h2>
      {renderTable(approvedDocuments, "Approved Documents")}
      {renderTable(pendingDocuments, "Pending Documents")}
    </div>
  );
};

export default ListeDocumentPartages;
