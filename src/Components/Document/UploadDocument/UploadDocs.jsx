import React, { useState } from 'react';
import '../../../Styles/Document/UploadDocs.css';
import UploadForm from './UploadForm';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiTwotoneCloseCircle } from "react-icons/ai";

const UploadDocs = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const uploadedDocs = [
    { id: 1, name: 'Document1.pdf', version: 3 },
    { id: 2, name: 'Document2.docx', version: 1 },
  ];

  const sharedDocs = [
    { id: 1, name: 'SharedDoc1.pdf', sharedBy: 'John Doe' },
  ];

  const sidebarItems = [
    { key: 'upload', label: 'Liste des documents' },
    { key: 'versionControl', label: 'Version Control' },
    { key: 'shared', label: 'Documents partagés' },
  ];

  return (
    <div className="upload-docs-container">
      <button
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <AiTwotoneCloseCircle /> : <GiHamburgerMenu />}
      </button>

      <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>Gestion des Document</h1>
        </div>
        <ul className="sidebar-list">
          {sidebarItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  setActiveTab(item.key);
                  setIsMenuOpen(true);
                }}
                className={`sidebar-item ${
                  activeTab === item.key ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} />}

      <div className="content">
        {activeTab === 'upload' && (
          <div className="tab-content">
            <h2>Ajout des documents uploader</h2>
            <UploadForm />
            <ul className="document-list">
              {uploadedDocs.map((doc) => (
                <li key={doc.id} className="document-item">
                  {doc.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'versionControl' && (
          <div className="tab-content">
            <h2>Version Control</h2>
            <ul className="document-list">
              {uploadedDocs.map((doc) => (
                <li key={doc.id} className="document-item">
                  <div>{doc.name} - Version {doc.version}</div>
                  <div className="actions">
                    {['Edit', 'Delete', 'Download', 'Share'].map((action) => (
                      <button key={action} className="action-button">
                        {action}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'shared' && (
          <div className="tab-content">
            <h2>Documents partagés avec vous</h2>
            <ul className="document-list">
              {sharedDocs.map((doc) => (
                <li key={doc.id} className="document-item">
                  {doc.name} (Shared by: {doc.sharedBy})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocs;
