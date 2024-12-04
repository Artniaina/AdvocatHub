import React, { useState } from "react";
import SearchBar from "../SearchBar";

const ListeDocumentPartages = () => {
  const documents = [
    {
      name: "Project Proposal.pdf",
      sharedBy: "John Doe",
      dateShared: "2024-11-15",
      link: "#",
      description: "Project proposal document",
      status: "approved"
    },
    {
      name: "Budget Report.xlsx",
      sharedBy: "Alice Smith",
      dateShared: "2024-11-20",
      link: "#",
      description: "Budget for Q4",
      status: "pending"
    },
    {
      name: "Client Meeting Notes.docx",
      sharedBy: "Jane Doe",
      dateShared: "2024-11-25",
      link: "#",
      description: "Meeting notes for client meeting",
      status: "approved"
    },
    {
      name: "Website Design Mockups.png",
      sharedBy: "Emma Johnson",
      dateShared: "2024-11-30",
      link: "#",
      description: "Design mockups for the website",
      status: "pending"
    },
  ];

  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  const approvedDocuments = filteredDocuments.filter(doc => doc.status === "approved");
  const pendingDocuments = filteredDocuments.filter(doc => doc.status === "pending");

  const renderTable = (docs, title) => (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-2 text-left">Document Name</th>
              <th className="px-4 py-2 text-left">Shared By</th>
              <th className="px-4 py-2 text-left">Date Shared</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, index) => (
              <tr key={index} className="text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{doc.name}</td>
                <td className="px-4 py-2">{doc.sharedBy}</td>
                <td className="px-4 py-2">{doc.dateShared}</td>
                <td className="px-4 py-2">
                  <a href={doc.link} className="text-blue-500 hover:underline">View/Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <SearchBar documents={documents} setFilteredDocuments={setFilteredDocuments} />
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
        Shared Documents
      </h2>

      {renderTable(approvedDocuments, "Approved Documents")}
      {renderTable(pendingDocuments, "Pending Documents")}
    </div>
  );
};


export default ListeDocumentPartages;
