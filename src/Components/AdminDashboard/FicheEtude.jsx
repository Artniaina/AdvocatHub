import React, { useState } from "react";
import { Building, Info } from "lucide-react";

const FicheEtude = () => {
  const [formData, setFormData] = useState({
    m_nidetude: "",
    m_dDateInscription: "",
    m_sNom: "",
    m_sPrenom: "",
    m_sStatut: "",
    m_Liste: "",
    m_sDénominationEtude: "",
    m_sGEDEtude: "",
    m_dDateAssermentation: "",
    m_nNumVoie: "",
    m_sAdresse: "",
    m_sAdresseSuite: "",
    m_sCodePostale: "",
    m_Description: "",
    m_stelephone: "",
    m_sactivitépref: "",
    m_sfax: "",
    m_ssite: "",
    m_langue: "",
    m_dispenseaj: false,
    m_emailbarreau: "",
    m_barreau: "",
    m_numrcs: "",
    m_stype: "",
    m_sFormeSociale: "",
    m_sboitepostal: "",
    m_sLocalite: "",
    m_sCodepostalboitepostal: "",
    m_sLocaliteboitepostal: "",
    m_sLibelleliste: "",
    m_sbarreauorigine: "",
    m_stitreprofessionnel: "",
    m_sadressecomplet: "",
    m_sdenominationsansaccent: "",
    m_sdescriptionsansaccent: "",
    m_sformesocialsansaccent: "",
    m_stelephonetri: "",
    m_sNationalite: "",
    m_sSexe: "",
    m_sObservation: "",
    m_sEnseigne: "",
    m_nGenreEtude: "",
    m_dDateNaissance: "",
    m_sLieuNaissance: "",
    m_sAdressePrivee: "",
    m_sEmailSecondaire: "",
    m_IBAN: "",
    m_BIC: "",
    m_NumInterne: "",
    m_dDateAvoue: "",
    m_bufPhoto: "",
    m_stelephoneMobile: "",
    m_partDom: false,
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Building className="w-6 h-6" />
        <h1 className="text-xl font-semibold">4500 S.à r.l.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="mb-4">
              <div className="text-lg font-semibold flex items-center gap-2">
                <Info className="w-5 h-5" />
                Informations générales
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    ID Étude
                  </label>
                  <input
                    type="text"
                    defaultValue="1"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Statut
                  </label>
                  <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Inscrite</option>
                    <option>Non inscrite</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Numéro interne
                </label>
                <input
                  type="text"
                  defaultValue="200 312"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Genre
                  </label>
                  <input
                    type="text"
                    defaultValue="y"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Numéro
                  </label>
                  <input
                    type="text"
                    defaultValue="237"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Adresse
                </label>
                <input
                  type="text"
                  defaultValue="route de Thionville"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                 Complement d adresse
                </label>
                <input
                  type="text"
                  defaultValue="route de Thionville"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Code postal
                </label>
                <input
                  type="text"
                  defaultValue="L-5885"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Localité
                </label>
                <input
                  type="text"
                  defaultValue="Howald"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Téléphone fixe
                </label>
                <input
                  type="tel"
                  defaultValue="+352 66116483"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  defaultValue="y@y.fr"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Law Firm Section */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="mb-4">
              <div className="text-lg font-semibold">Société d'avocats</div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Forme sociale
                </label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>société civile</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Numéro RCS
                </label>
                <input
                  type="text"
                  defaultValue="B27307étes"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Liste</label>
                <input
                  type="text"
                  defaultValue="5"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Email barreau
                </label>
                <input
                  type="email"
                  defaultValue="4500@barreau.lu"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Data Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-semibold">Nom</th>
                  <th className="px-4 py-3 text-left font-semibold">Prénom</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Email barreau
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Date sermentation
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Liste</th>
                  <th className="px-4 py-3 text-left font-semibold">ID</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 border-b">CARRASCOSA GIL</td>
                  <td className="px-4 py-3 border-b">Maria</td>
                  <td className="px-4 py-3 border-b">
                    maria.carrascosagil@barreau.lu
                  </td>
                  <td className="px-4 py-3 border-b">17-02-2022</td>
                  <td className="px-4 py-3 border-b">1</td>
                  <td className="px-4 py-3 border-b">811</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Enregistrer
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Consulter le dossier
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Fermer
        </button>
      </div>
    </div>
  );
};
export default FicheEtude;
