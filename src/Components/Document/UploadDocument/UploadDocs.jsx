import React, { useState } from 'react';
import '../../../Styles/Document/UploadDocs.css';
import { FaHome, FaFolder, FaUpload, FaShare, FaArchive, FaCog, FaUser } from 'react-icons/fa'; 
import { SlClose } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";

const UploadDocs = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarMenuItems = [
    { key: 'dashboard', icon: <FaHome />, label: 'Dashboard' },
    { key: 'documents', icon: <FaFolder />, label: 'Documents' },
    { key: 'upload', icon: <FaUpload />, label: 'Upload' },
    { key: 'share', icon: <FaShare />, label: 'Share' },
    { key: 'archive', icon: <FaArchive />, label: 'Archive' },
  ];
  const bottomMenuItems = [
    { key: 'settings', icon: <FaCog />, label: 'Settings' },
    { key: 'profile', icon: <FaUser />, label: 'Profile' },
  ];

  return (
    <div className={`ged-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {isOpen ? (
          <span className="logo">Documents</span>
        ) : (
          <GiHamburgerMenu className="hamburger-icon" onClick={toggleSidebar} />
        )}
        <button onClick={toggleSidebar} className="toggle-btn">
          {isOpen ? <SlClose /> : ""}
        </button>
      </div>

      <div className="menu">
        {sidebarMenuItems.map(item => (
          <div
            key={item.key}
            className={`menu-item ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => setActiveTab(item.key)}
          >
            <div className="icon">{item.icon}</div>
            {isOpen && <span className="label">{item.label}</span>}
          </div>
        ))}
      </div>

      <div className="bottom-menu">
        {bottomMenuItems.map(item => (
          <div
            key={item.key}
            className={`menu-item ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => setActiveTab(item.key)}
          >
            <div className="icon">{item.icon}</div>
            {isOpen && <span className="label">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDocs;
