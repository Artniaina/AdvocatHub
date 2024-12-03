import React, { useState } from 'react';
import SideBar from '../SideBar';
import '../../../Styles/Document/UploadForm.css';
import ListeDocumentPartages from './ListeDocumentPartages';

const DocumentPartages = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="upload-docs-container">
      <SideBar isClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
      <div className={`upload-form-container ${isSidebarClosed ? 'closed' : ''}`}>
        <ListeDocumentPartages />
      </div>
    </div>
  );
};

export default DocumentPartages;
