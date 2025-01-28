import React from "react";
import {
  Home,
  Package,
  Gift,
  Store,
  Users,
  FolderClosed,
  Settings,
  Search,
} from "lucide-react";
import UserList from "./UserList";

const Overview = () => {
  const stats = [
    {
      icon: { icon: Home, color: "bg-purple-600" },
      label: "Teachers Revenue",
      value: "$59,402,199",
      change: "183%",
      changeType: "decrease",
    },
    {
      icon: { icon: Users, color: "bg-blue-600" },
      label: "Customer Reach",
      value: "559,302",
      change: "25%",
      changeType: "increase",
    },
    {
      icon: { icon: Package, color: "bg-orange-500" },
      label: "Product Purchased",
      value: "189,391",
      change: "25%",
      changeType: "increase",
    },
    {
      icon: { icon: FolderClosed, color: "bg-teal-600" },
      label: "Product Categories",
      value: "45,291",
      change: "183%",
      changeType: "decrease",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search new report here"
              className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center ml-4">
            <div className="mr-4 text-right">
              <p className="font-semibold">Shayna Xuna</p>
              <p className="text-sm text-gray-500">@shayna</p>
            </div>
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">My Overview</h1>
              <p className="text-gray-500">Lorem dolor reporting easier</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                Filter
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Export Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
