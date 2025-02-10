import React, { useState } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const AvocatList = () => {
  const navigate= useNavigate()
  const lawyers = [
    {
      id: 1,
      name: "Me. Sophie Martin",
      speciality: "Droit des affaires",
      city: "Paris",
      status: "Inscrit",
      email: "sophie.martin@cabinet.fr",
    },
    {
      id: 2,
      name: "Me. Jean Dubois",
      speciality: "Droit pénal",
      city: "Lyon",
      status: "Non inscrit",
      email: "jean.dubois@cabinet.fr",
    },
    {
      id: 3,
      name: "Me. Marie Laurent",
      speciality: "Droit immobilier",
      city: "Marseille",
      status: "Inscrit",
      email: "marie.laurent@cabinet.fr",
    },
    {
      id: 4,
      name: "Me. Pierre Moreau",
      speciality: "Droit de la famille",
      city: "Bordeaux",
      status: "Inscrit",
      email: "pierre.moreau@cabinet.fr",
    },
    {
      id: 5,
      name: "Me. Claire Petit",
      speciality: "Droit du travail",
      city: "Toulouse",
      status: "Non inscrit",
      email: "claire.petit@cabinet.fr",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all"
        ? true
        : selectedStatus === "inscrit"
        ? lawyer.status === "Inscrit"
        : lawyer.status === "Non inscrit";

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
              <button onClick={()=>{
                navigate("/ficheAvocat")
              }} className="px-4 py-2 bg-[#5E1675] text-white rounded-lg hover:bg-[#4A1259] transition-colors w-full sm:w-auto">
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
              <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-thin scrollbar-thumb-[#5E1675] scrollbar-track-gray-100">
                {" "}
                <table className="w-full max-w-[97%] ml-4 md:ml-6  rounded-lg ">
                  <thead className="sticky top-0 z-10 bg-[#5E1675] ">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Etude
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Adresse
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLawyers.map((lawyer) => (
                      <tr key={lawyer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#5E1675]/10 flex items-center justify-center">
                                <span className="text-[#5E1675] font-medium">
                                  {lawyer.name.split(" ")[1][0]}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {lawyer.name}
                              </div>
                              <div className="text-sm text-gray-500 hidden sm:block">
                                {lawyer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.speciality}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lawyer.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-colors duration-200 ease-in-out ${
                              lawyer.status === "Inscrit"
                                ? "bg-green-200 text-green-800 hover:bg-green-300"
                                : "bg-red-200 text-red-800 hover:bg-red-300"
                            }`}
                          >
                            {lawyer.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-[#5E1675] hover:text-[#4A1259]">
                            <MoreVertical className="h-5 w-5" />
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
