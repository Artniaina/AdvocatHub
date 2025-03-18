import React, { useState, useEffect } from "react";
import "../../Styles/Document/UploadDocs.css";
import { FaFolder, FaUpload, FaShare, FaArchive } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarMenuItems = [
    {
      key: "documents",
      icon: <FaFolder />,
      label: "Documents",
      path: "/documents",
    },
    {
      key: "upload",
      icon: <FaUpload />,
      label: "Ajout de document",
      path: "/upload",
    },
    {
      key: "share",
      icon: <FaShare />,
      label: "Documents partagés",
      path: "/shared-documents",
    },
    {
      key: "archive",
      icon: <FaArchive />,
      label: "Versioning",
      path: "/versioning",
    },
  ];

  const bottomMenuItems = [
    {
      key: "return",
      icon: <GrLinkPrevious />,
      label: "Retour",
      path: "/document",
    },
  ];

  useEffect(() => {
    const currentTab = sidebarMenuItems.find(
      (item) => item.path === location.pathname
    )?.key;
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [location.pathname]);

  const handleMenuClick = (path, key) => {
    setActiveTab(key);
    navigate(path);
  };

  return (
    <div className={`ged-sidebar ${isOpen ? "open" : "closed"}`}>
      {isOpen ? (
        <div className="sidebar-header">
          <span className="logo">Logo</span>
          <button onClick={toggleSidebar} className="toggle-btn">
            {isOpen ? <SlClose /> : ""}
          </button>
        </div>
      ) : (
        <div className="sidebar-hamburger">
          <GiHamburgerMenu className="hamburger-icon" onClick={toggleSidebar} />
          <button onClick={toggleSidebar} className="toggle-btn">
            {isOpen ? <SlClose /> : ""}
          </button>
        </div>
      )}
      <div className="menu">
        {sidebarMenuItems.map((item) => (
          <div
            key={item.key}
            className={`menu-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => handleMenuClick(item.path, item.key)}
          >
            <div className="icon">{item.icon}</div>
            {isOpen && <span className="label">{item.label}</span>}
          </div>
        ))}
      </div>

      <div className="bottom-menu">
        {bottomMenuItems.map((item) => (
          <div
            key={item.key}
            className={`menu-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => handleMenuClick(item.path, item.key)}
          >
            <div className="icon">{item.icon}</div>
            {isOpen && <span className="label">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
