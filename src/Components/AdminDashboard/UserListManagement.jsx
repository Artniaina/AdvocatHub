import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import SideBar from "./SideBar";

const UserListManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const apiUrl = "http://192.168.10.113/Utilisateur/Utilisateur";

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
      <main className="flex-1">
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Liste des utilisateurs inscrits
          </h1>

          <div style={{display: "flex", flexDirection:'row'}} className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher par nom..."
                className="w-[80%] pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                         shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 
                         outline-none transition-all duration-300 ease-in-out"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>

            <div className="relative w-full sm:w-[200px] ">
              <select
                className="w-[60%] appearance-none pl-10 pr-10 py-2.5 border border-gray-300 
                         rounded-lg shadow-sm bg-white cursor-pointer
                         focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 
                         outline-none transition-all duration-300 ease-in-out"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Filter size={18} />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#5E1675]">
                  <tr>
                    {["ID", "Nom", "Email", "Role", "Statut", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-white"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.IDUtilisateur}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-900">
                        {user.IDUtilisateur}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-900">
                        {user.NomUtilisateur}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-900">
                        {user.EmailUtilisateur}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full 
                                     bg-purple-100 text-purple-800"
                        >
                          {user.Role}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <button
                          onClick={() => handleChangeStatus(user.IDUtilisateur)}
                          className={`px-3 py-1 rounded-full text-white text-xs md:text-sm 
                                   font-medium transition-all duration-200
                                   ${
                                     user.Statut
                                       ? "bg-green-500 hover:bg-green-600"
                                       : "bg-red-500 hover:bg-red-600"
                                   }`}
                        >
                          {user.Statut ? "Actif" : "Inactif"}
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
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
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Voulez-vous vraiment supprimer cet utilisateur ? Cette action est
              irréversible.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg
                         hover:bg-gray-200 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-500 rounded-lg
                         hover:bg-red-600 transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserListManagement;
