import React, { useState } from 'react';
import SideBar from '../SideBar';
import '../../../Styles/Document/UploadForm.css';
import VersionControlList from './VersionControlList';

const UploadDocs = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="upload-docs-container">
      <SideBar isClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
      
      <div className={`upload-form-container ${isSidebarClosed ? 'closed' : ''}`}>
        <VersionControlList />
      </div>
    </div>
  );
};

export default UploadDocs;
