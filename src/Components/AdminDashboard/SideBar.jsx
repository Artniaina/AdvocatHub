import React, { useState } from "react";
import {
  Home,
  Package,
  Gift,
  Store,
  Users,
  FolderClosed,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="p-3 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center"
      >
        {isExpanded ? (
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full mr-[2px]"></div>
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
          </div>
          {isExpanded && (
            <span className="ml-2 font-bold text-xl">DashPro</span>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div>
          {isExpanded && <p className="text-gray-500 text-sm mb-3">GENERAL</p>}
          <nav className="space-y-2">
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors`}
            >
              <Home className="w-5 h-5" />
              {isExpanded && <span className="ml-3">My Overview</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
            >
              <Package className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Post Jobs</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
            >
              <Gift className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Special Rewards</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
            >
              <Store className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Manage Stores</span>}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
