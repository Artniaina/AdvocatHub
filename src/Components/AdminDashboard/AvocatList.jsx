import React, { useState, useEffect } from "react";
import { Search, Filter, Edit, Trash } from "lucide-react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const AvocatList = () => {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.113/Utilisateur/AllAvocat/ListeAvocat"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setLawyers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.10.113/Utilisateur/api/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete lawyer");
      }

      setLawyers((prevLawyers) =>
        prevLawyers.filter((lawyer) => lawyer.m_NumInterne !== id)
      );
    } catch (error) {
      console.error("Error deleting lawyer:", error);
    }
  };

  const filteredLawyers = lawyers?.filter((lawyer) => {
    const searchFields = [
      lawyer?.m_NumInterne,
      lawyer?.m_sNom,
      lawyer?.m_sPrenom,
      lawyer?.m_barreau,
      lawyer?.m_emailbarreau,
      lawyer?.m_sAdressePrivee,
      lawyer?.m_sStatut,
      lawyer?.m_sSexe,
      lawyer?.m_nidetude,
      lawyer?.m_sNationalite,
      lawyer?.m_dDateAssermentation,
    ];

    const matchesSearch = searchFields.some(
      (field) =>
        field &&
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "inscrit" && lawyer.m_sStatut === "Inscrit") ||
      (selectedStatus === "non-inscrit" && lawyer.m_sStatut === "Non inscrit");

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <div>
        <SideBar />
      </div>

      <div className="flex-1  overflow-hidden">
        <div className="rounded-lg shadow-md h-full overflow-hidden">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                margin: "25px",
              }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Liste des Avocats
              </h2>
              <button
                onClick={() => navigate("/addFicheAvocat")}
                className="px-4 py-2 bg-[#5E1675] text-white rounded-lg hover:bg-[#4A1259] transition-colors w-full sm:w-auto"
              >
                + Ajouter un avocat
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                margin: "24px 77px 28px 20px",
              }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un avocat..."
                  className="w-[80%] pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E1675]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative sm:w-48">
                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E1675] appearance-none bg-white"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="inscrit">Inscrits</option>
                  <option value="non-inscrit">Non inscrits</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-x-auto overflow-y-auto max-h-[calc(100vh-50px)]  mx-4 my-5 p-5 scrollbar-thin scrollbar-thumb-[#5E1675] scrollbar-track-gray-100">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-[#5E1675]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Identifiant interne
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Nom & Prénom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Barreau
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Adresse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Sexe
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Etude
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Nationalité
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Date d'assermentation
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLawyers.map((lawyer) => (
                      <tr
                        key={lawyer.m_NumInterne}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lawyer.m_NumInterne}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#5E1675]/10 flex items-center justify-center">
                                <span className="text-[#5E1675] font-medium">
                                  {lawyer.m_sNom?.[0]}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {lawyer.m_sNom} {lawyer.m_sPrenom}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_barreau}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_emailbarreau}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_sAdressePrivee}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              lawyer.m_sStatut === "Inscrit"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {lawyer.m_sStatut}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_sSexe}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_nidetude}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_sNationalite}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.m_dDateAssermentation}
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexDirection: "row",
                            margin: "30px auto",
                          }}
                          className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex items-center justify-center gap-3"
                        >
                          <button
                            className="text-[#5E1675] hover:text-[#4A1259]"
                            onClick={() => {
                              navigate("/updateFicheAvocat", {
                                state: { email: lawyer?.m_emailbarreau },
                              });
                            }}
                          >
                            <Edit className="h-5 w-5" />
                          </button>

                          <button
                            className="text-[#5E1675] hover:text-[#4A1259]"
                            onClick={() => handleDelete(lawyer.m_nIDAvocat_PP)}
                          >
                            <Trash className="h-5 w-5" />
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
    </div>
  );
};

export default AvocatList;
