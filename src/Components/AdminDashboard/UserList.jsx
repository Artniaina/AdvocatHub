import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Home, Package, Users, FolderClosed } from "lucide-react";

const UserList = () => {
  const stats = [
    {
      icon: Home,
      color: "bg-purple-600",
      label: "Teachers Revenue",
      value: "$59,402,199",
      change: "183%",
      changeType: "decrease",
    },
    {
      icon: Users,
      color: "bg-blue-600",
      label: "Customer Reach",
      value: "559,302",
      change: "25%",
      changeType: "increase",
    },
    {
      icon: Package,
      color: "bg-orange-500",
      label: "Product Purchased",
      value: "189,391",
      change: "25%",
      changeType: "increase",
    },
    {
      icon: FolderClosed,
      color: "bg-teal-600",
      label: "Product Categories",
      value: "45,291",
      change: "183%",
      changeType: "decrease",
    },
  ];

  const StatCard = ({
    icon: Icon,
    color,
    label,
    value,
    change,
    changeType,
  }) => (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span
          className={`${
            changeType === "increase" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const apiUrl = "http://192.168.10.10/Utilisateur/Utilisateur";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const handleChangeStatus = async (userID) => {
    const updatedUsers = users.map((user) =>
      user.IDUtilisateur === userID ? { ...user, Statut: !user.Statut } : user
    );
    setUsers(updatedUsers);

    try {
      const response = await fetch(`${apiUrl}/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Statut: updatedUsers.find((user) => user.IDUtilisateur === userID)
            .Statut,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Erreur:", error);
      // Rollback the change if API call fails
      setUsers(users);
    }
  };

  const handleDelete = async (userID) => {
    try {
      const response = await fetch(`${apiUrl}/${userID}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.IDUtilisateur !== userID));
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="flex">
      <div className="py-8 px-4 max-w-7xl mx-auto flex-1 ml-64">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Liste des utilisateurs inscrits
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mt-4 flex flex-col">
          <div className="overflow-x-auto rounded-lg shadow">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#5E1675]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-white"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-white"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-white"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-white"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-white"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-white"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user.IDUtilisateur}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.IDUtilisateur}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.NomUtilisateur}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.EmailUtilisateur}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#5E1675] bg-opacity-10 text-[#5E1675]">
                          {user.Role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleChangeStatus(user.IDUtilisateur)}
                          className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-all duration-200 ${
                            user.Statut
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {user.Statut ? "Actif" : "Inactif"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(user.IDUtilisateur)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <RiDeleteBin6Line className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
