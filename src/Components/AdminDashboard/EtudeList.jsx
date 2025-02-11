
import React, { useState, useEffect } from "react";
import { Search, Filter, Edit, Trash } from "lucide-react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const EtudeList = () => {
  const navigate = useNavigate();
  const [etudes, setEtude] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [etudeTodelete, setEtudeTodelete] = useState(null);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.113/Utilisateur/api/getAllEtude"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEtude(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDeleteClick = (id) => {
    setEtudeTodelete(id);
    setShowPopup(true);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setEtudeTodelete(null);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://192.168.10.113/Utilisateur/api/deleteEtude/${etudeTodelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete lawyer");
      }
  
  
      await fetchData();
    } catch (error) {
      console.error("Error deleting etude:", error);
    } finally {
      setShowPopup(false);
      setEtudeTodelete(null);
    }
  };

  const filteredEtude = etudes?.filter((etude) => {
    const searchFields = [
      etude?.m_NumInterne,
      etude?.m_sDénominationEtude,
      etude?.m_sStatut,
      etude?.m_stype,
      etude?.m_sFormeSociale,
      etude?.m_nNumVoie,
      etude?.m_sAdresse,
      etude?.m_sAdresseSuite,
      etude?.m_sCodePostale,
      etude?.m_sLocalite,
      etude?.m_barreau,
      etude?.m_sboitepostal,
    ];

    const matchesSearch = searchFields.some(
      (field) =>
        field &&
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "inscrit" && etude.m_sStatut === "Inscrit") ||
      (selectedStatus === "non-inscrit" && etude.m_sStatut === "Non inscrit");

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
                onClick={() => navigate("/addFicheEtude")}
                className="px-4 py-2 bg-[#5E1675] text-white rounded-lg hover:bg-[#4A1259] transition-colors w-full sm:w-auto"
              >
                + Ajouter une Etude
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
              <div className="relative overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]  mx-4 my-5 p-5 scrollbar-thin scrollbar-thumb-[#5E1675] scrollbar-track-gray-100">
                <table className="w-full">
                <thead className="sticky top-[-18px] z-10 bg-[#5E1675]">
                <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        IDEtude
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Numéro interne
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Dénomination de l'étude
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Forme sociale
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Genre
                      </th>
              
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Adresse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Complement d'adresse
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Code postal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Localité
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Barreau
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Boîte postal
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEtude.map((etude) => (
                      <tr
                        key={etude.m_nidetude}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {etude.m_nidetude}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {etude.m_NumInterne}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {etude.m_sDénominationEtude}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              etude.m_sStatut === "Inscrite"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {etude.m_sStatut}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_stype}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_sFormeSociale}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_nGenreEtude}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_sAdresse}
                        </td>
                       
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_sAdresseSuite}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_sCodePostale}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_sLocalite}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_barreau}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {etude.m_sboitepostal}
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
                              navigate("/updateFicheEtude", {
                                state: { id: etude?.m_nidetude },
                              });
                            }}
                          >
                            <Edit className="h-5 w-5" />
                          </button>

                          <button
                            className="text-[#5E1675] hover:text-[#4A1259]"
                            onClick={() => handleDeleteClick(etude.m_nidetude)}
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
            {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Confirmer la suppression</h3>
            <p>
              Voulez-vous vraiment supprimer cette donnée ? Cette action est
              irréversible.
            </p>
            <div className="popup-actions">
              <button className="confirm-button" onClick={handleDelete}>
                Supprimer
              </button>
              <button className="cancel-button" onClick={cancelDelete}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtudeList;
