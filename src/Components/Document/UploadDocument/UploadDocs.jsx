import React, { useState } from 'react';
import SideBar from '../SideBar';
import UploadForm from './UploadForm';
import '../../../Styles/Document/UploadDocs.css';

const UploadDocs = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="upload-docs-container">
      <SideBar isClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
      
      <div className={`upload-form-container ${isSidebarClosed ? 'closed' : ''}`}>
        <UploadForm />
      </div>
    </div>
  );
};

export default UploadDocs;
