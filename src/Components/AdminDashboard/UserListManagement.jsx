import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const UserListManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const apiUrl = "http://192.168.10.10/Utilisateur/Utilisateur";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error("Erreur lors du chargement des données");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur:", error);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Statut: !users.find((u) => u.IDUtilisateur === userID).Statut,
        }),
      });
      if (!response.ok) throw new Error("Échec de la mise à jour");
    } catch (error) {
      console.error("Erreur:", error);
      setUsers(users);
    }
  };

  const handleDeleteClick = (userID) => {
    setUserToDelete(userID);
    setShowPopup(true);
  };

  const handleDelete = async (userID) => {
    try {
      const response = await fetch(`${apiUrl}/${userID}`, { method: "DELETE" });
      if (response.ok) {
        setUsers(users.filter((user) => user.IDUtilisateur !== userID));
      } else {
        throw new Error("Échec de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleDelete(userToDelete);
      setShowPopup(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.NomUtilisateur.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" ||
        (filterStatus === "active" && user.Statut) ||
        (filterStatus === "inactive" && !user.Statut))
  );

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div className="flex-1 py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className="border p-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border p-2 rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#5E1675]">
            <tr>
              {["ID", "Nom", "Email", "Role", "Statut", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-semibold text-white"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr
                key={user.IDUtilisateur}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.IDUtilisateur}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.NomUtilisateur}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.EmailUtilisateur}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#5E1675] bg-opacity-10 text-[#5E1675]">
                    {user.Role}
                  </span>
                </td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteClick(user.IDUtilisateur)}
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
  );
};

export default UserListManagement;
