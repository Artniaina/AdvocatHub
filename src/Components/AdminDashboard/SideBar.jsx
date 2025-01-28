import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Scale,
  RotateCcw,
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
      className={`h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 border-b border-gray-800 relative">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full mr-[2px]"></div>
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
          </div>
          {isExpanded && (
            <span className="ml-2 font-bold text-xl text-white">Dashboard</span>
          )}
          <button
            onClick={toggleSidebar}
            className="absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div>
          <nav className="space-y-2">
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-purple-400 bg-purple-900/40 rounded-lg hover:bg-purple-900/60 transition-colors`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Aperçu</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-gray-300 hover:bg-gray-800 rounded-lg transition-colors`}
            >
              <Users className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Utilisateurs</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-gray-300 hover:bg-gray-800 rounded-lg transition-colors`}
            >
              <Scale className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Avocats</span>}
            </a>
            <a
              href="#"
              className={`flex items-center ${
                isExpanded ? "px-4 py-3" : "justify-center p-3"
              } text-gray-300 hover:bg-gray-800 rounded-lg transition-colors`}
            >
              <RotateCcw className="w-5 h-5" />
              {isExpanded && <span className="ml-3">Réinitialisation</span>}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
