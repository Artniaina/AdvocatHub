import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  LayoutDashboard,
  Users,
  Scale,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../Hooks/AuthContext";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const cookies = new Cookies();
  const {
    setIsAuthenticated,
    setIsAdminAuthenticated,
    setIsSimpleAuthenticated,
  } = useAuth();
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    cookies.remove("COOKIE_SESSION", { path: "/" });
    setIsSimpleAuthenticated(false);
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
  };

  return (
    <div
      className={`h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 border-b border-gray-800 relative">
        <div className="flex">
          <div className="w-8 h-8 bg-purple-600 rounded-lg">
            <div className="w-4 h-4 bg-white rounded-full mr-[2px]"></div>
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
          </div>
          {isExpanded && (
            <span className="ml-2 font-bold text-xl text-white">Dashboard</span>
          )}
          <button
            onClick={toggleSidebar}
            className="absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      <div className="flex  p-4 space-y-6">
        <nav className="space-y-2">
          <button
            className={`${
              isExpanded ? "w-[80%] px-4 pl-10 p-3" : "p-3 w-[30%]"
            } text-purple-400 bg-transparent rounded-lg hover:bg-purple-900/60 transition-colors text-start ${
              location.pathname === "/dashboard" ? "bg-purple-900" : ""
            }`}
            onClick={() => handleNavigation("/dashboard")}
          >
            <LayoutDashboard className="inline-block w-5 h-5" />
            {isExpanded && <span className="ml-3 inline-block">Aperçu</span>}
          </button>

          <button
            className={`${
              isExpanded ? "w-[80%] px-4 pl-10 p-3" : "p-3 w-[30%]"
            } text-purple-400 bg-transparent rounded-lg hover:bg-purple-900/60 transition-colors text-start ${
              location.pathname === "/utilisateurs" ? "bg-purple-900" : ""
            }`}
            onClick={() => handleNavigation("/utilisateurs")}
          >
            <Users className=" inline-block w-5 h-5" />
            {isExpanded && (
              <span className="ml-3 inline-block">Utilisateurs</span>
            )}
          </button>

          <button
            className={`${
              isExpanded ? "w-[80%] px-4 pl-10 p-3" : "p-3 w-[30%]"
            } text-purple-400 bg-transparent rounded-lg hover:bg-purple-900/60 transition-colors text-start ${
              location.pathname === "/avocats" ? "bg-purple-900" : ""
            }`}
            onClick={() => handleNavigation("/avocats")}
          >
            <Scale className="inline-block w-5 h-5" />
            {isExpanded && <span className="ml-3 inline-block">Avocats</span>}
          </button>

          <button
            className={`${
              isExpanded ? "w-[80%] px-4 pl-10 p-3" : "p-3 w-[30%]"
            } text-purple-400 bg-transparent rounded-lg hover:bg-purple-900/60 transition-colors text-start ${
              location.pathname === "/reinitialisation" ? "bg-purple-900" : ""
            }`}
            onClick={() => handleNavigation("/reinitialisation")}
          >
            <RotateCcw className="inline-block w-5 h-5" />
            {isExpanded && (
              <span className="ml-3 inline-block">Réinitialisation</span>
            )}
          </button>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-[80%] p-3 text-white  hover:bg-red-700 rounded-lg shadow-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
