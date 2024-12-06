import React, { useState, useEffect } from "react";
import "../../../../Styles/TaxationForm/CardInfo.css";
import "../../../../Styles/TaxationForm/PopupInvoice.css";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";
import { FaFileSignature } from "react-icons/fa6";

const PopupNoteHonoraire = ({ onClose, onSubmitData }) => {
  const { noteHonoraire } = useGeneraliteContext();
  const tableHeaders = [
    { label: "Nombre d'he.ures facturées", key: "hours" },
    { label: "Nombre de minutes facturées", key: "minutes" },
    { label: "Taux horaires HTVA facturés", key: "tauxHorairesfacturés" },
    { label: "Total des honoraires HTVA facturés", key: "totalHonoraireHTVA" },
    {
      label: "Total des frais de constitution de dossier HTVA",
      key: "fraisConstitutionDossier",
    },
    {
      label: "Total des honoraires et des frais de dossier HTVA",
      key: "totalHonoraireFraisDossier",
    },
    { label: "Taux de TVA", key: "tauxTVA" },
    { label: "Montant de la TVA", key: "montantTVA" },
    { label: "Total des honoraires TTC", key: "totalHonoraireTTC" },
    { label: "Frais divers (TTC)", key: "fraisDivers" },
    { label: "Total des provisions TTC payées", key: "provisionsTTC" },
    { label: "Remise/note de crédit", key: "remise" },
    { label: "Total de la note d'honoraire TTC", key: "noteTTC" },
    { label: "Total du montant restant dû TTC", key: "restantDu" },
  ];

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const [formData, setFormData] = useState({
    id: generateId(),
    date: "",
    reference: "",
    hours: "",
    minutes: "",
    tauxHorairesfacturés: "",
    totalHonoraireHTVA: "",
    fraisConstitutionDossier: "",
    totalHonoraireFraisDossier: "",
    tauxTVA: "",
    montantTVA: "",
    totalHonoraireTTC: "",
    fraisDivers: "",
    provisionsTTC: "",
    remise: "",
    noteTTC: "",
    restantDu: "",
  });

  const [tableData, setTableData] = useState(noteHonoraire);
  const [editIndex, setEditIndex] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [filterActive, setFilterActive] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortKey(key);
    setSortOrder(order);
    setTableData(sortedData);
  };

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };


  const [activeFilterKey, setActiveFilterKey] = useState(null);

  const handleFilterClick = (key) => {
    setActiveFilterKey(key); 
  };

  const handleFilterClose = () => {
    setActiveFilterKey(null); 
  };


  const filteredData = tableData.filter((row) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? row[key]
            ?.toString()
            .toLowerCase()
            .includes(filters[key].toLowerCase())
        : true
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditIndex(null);
    if (editIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
      setEditIndex(null);
    } else {
      setTableData([...tableData, formData]);
    }

    setFormData({
      id: generateId(),
      date: "",
      reference: "",
      hours: "",
      minutes: "",
      tauxHorairesfacturés: "",
      totalHonoraireHTVA: "",
      fraisConstitutionDossier: "",
      totalHonoraireFraisDossier: "",
      tauxTVA: "",
      montantTVA: "",
      totalHonoraireTTC: "",
      fraisDivers: "",
      provisionsTTC: "",
      remise: "",
      noteTTC: "",
      restantDu: "",
    });
  };

  const handleEditClick = (index) => {
    setFormData(tableData[index]);
    setEditIndex(index);
  };

  const handleSendData = () => {
    onSubmitData(tableData);
    onClose();
  };

  return (
    <div className="invoice-overlay">
      <div className="invoice-popup">
        <div className="invoice-title">
          HONORAIRES
          <button
            className="invoice-close-btn"
            style={{ marginTop: "-5px" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="invoice-form-container">
            <div className="invoice-form-section">
              <div style={{ display: "flex" }}>
                <div>
                  <label htmlFor="date">Date*: </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="invoice-input"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ width: "395px", marginLeft: "30px" }}>
                  <label htmlFor="reference">Référence: </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    className="invoice-input"
                    value={formData.reference}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <p>Nombre d'heures facturées * :</p>
                <div className="invoice-hours-input">
                  <input
                    className="invoice-input"
                    type="text"
                    placeholder="0h"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="invoice-input"
                    type="text"
                    placeholder="0mn"
                    name="minutes"
                    value={formData.minutes}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="invoice-form-group">
                <label htmlFor="tauxHorairesfacturés">
                  Taux horaires HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="tauxHorairesfacturés"
                  name="tauxHorairesfacturés"
                  className="invoice-input"
                  value={formData.tauxHorairesfacturés}
                  onChange={handleChange}
                  placeholder="0.00 €"
                  required
                />
              </div>
              <div className="invoice-form-group">
                <label htmlFor="totalHonoraireHTVA">
                  Total des honoraires HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="totalHonoraireHTVA"
                  name="totalHonoraireHTVA"
                  className="invoice-input"
                  value={formData.totalHonoraireHTVA}
                  onChange={handleChange}
                  placeholder="0.00 €"
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="totalFraisConstitutionHtva">
                  Total des frais de constitution de dossier et des frais de
                  bureau HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="totalFraisConstitutionHtva"
                  name="fraisConstitutionDossier"
                  className="invoice-input"
                  value={formData.fraisConstitutionDossier}
                  placeholder="0.00 €"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="totalHonorairesFraisDossierHtva">
                  Total des honoraires et frais de dossiers HTVA :
                </label>
                <input
                  type="text"
                  id="totalHonorairesFraisDossierHtva"
                  name="totalHonoraireFraisDossier"
                  className="invoice-input"
                  value={formData.totalHonoraireFraisDossier}
                  placeholder="0.00 €"
                  onChange={handleChange}
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="tauxTva">Taux de TVA :</label>
                <input
                  type="text"
                  id="tauxTva"
                  name="tauxTVA"
                  className="invoice-input"
                  placeholder="0.00 %"
                  value={formData.tauxTVA}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="invoice-form-section">
              <div className="invoice-form-group">
                <label htmlFor="montantTvaHonoraire">
                  Montant de la TVA (honoraires et frais compris) * :
                </label>
                <input
                  type="text"
                  id="montantTvaHonoraire"
                  name="montantTVA"
                  className="invoice-input"
                  value={formData.montantTVA}
                  placeholder="0.00 €"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="totalHonorairesTtc">
                  Total des honoraires TTC * :
                </label>
                <input
                  type="text"
                  id="totalHonorairesTtc"
                  name="totalHonoraireTTC"
                  className="invoice-input"
                  placeholder="0.00 €"
                  value={formData.totalHonoraireTTC}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="fraisHuissiersTtc">
                  Frais d'huissiers, d'expertise, de traduction, de RCS... (TTC)
                  * :
                </label>
                <input
                  type="text"
                  id="fraisHuissiersTtc"
                  name="fraisDivers"
                  className="invoice-input"
                  placeholder="0.00 €"
                  value={formData.fraisDivers}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="totalProvisionsTtc">
                  Total des provisions TTC payées * :
                </label>
                <input
                  type="text"
                  id="totalProvisionsTtc"
                  name="provisionsTTC"
                  className="invoice-input"
                  placeholder="0.00 €"
                  value={formData.provisionsTTC}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="remiseNoteCredit">
                  Remise/note de crédit :
                </label>
                <input
                  type="text"
                  id="remiseNoteCredit"
                  name="remise"
                  className="invoice-input"
                  placeholder="0.00%"
                  value={formData.remise}
                  onChange={handleChange}
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="noteTtc">Note TTC :</label>
                <input
                  type="text"
                  id="noteTtc"
                  name="noteTTC"
                  className="invoice-input"
                  placeholder="0.00 €"
                  value={formData.noteTTC}
                  onChange={handleChange}
                />
              </div>

              <div className="invoice-form-group">
                <label htmlFor="restantDu">Restant dû :</label>
                <input
                  type="text"
                  id="restantDu"
                  name="restantDu"
                  className="invoice-input"
                  placeholder="0.00 €"
                  value={formData.restantDu}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="invoice-button-container">
            <button className="invoice-add-btn" type="submit">
              {editIndex !== null ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>

        <div className="invoice-table-container">
          <table className="invoice-table">
          <thead>
        <tr>
          {tableHeaders.map(({ label, key }) => (
            <th key={key} onClick={() => requestSort(key)}>
              {activeFilterKey === key ? (
                <div className="invoice-filter-input-container">
                  <input
                    className="invoice-filter-input"
                    type="text"
                    placeholder={`Filtrer: ${label}`}
                    value={filters[key] || ""}
                    onChange={(e) => handleFilterChange(e, key)}
                  />
                  <span
                    className="invoice-filter-close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFilterClose();
                    }}
                  >
                    x
                  </span>
                </div>
              ) : (

                <div className="invoice-table-header-container">
                  <span>{label}</span>
                  <span className="invoice-sort-icon">
                    <PiCaretUpDownFill />
                  </span>
                  <span
                    className="invoice-filter-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFilterClick(key);
                    }}
                  >
                    <FaFilter />
                  </span>
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
            <tbody>
              {filteredData.map((data, index) =>
                index === editIndex ? null : (
                  <tr key={index} className="invoice-table-row">
                    <td className="invoice-table-cell">{data.hours}</td>
                    <td className="invoice-table-cell">{data.minutes}</td>
                    <td className="invoice-table-cell">
                      {data.tauxHorairesfacturés} €
                    </td>
                    <td className="invoice-table-cell">
                      {data.totalHonoraireHTVA} €
                    </td>
                    <td className="invoice-table-cell">
                      {data.fraisConstitutionDossier} €
                    </td>
                    <td className="invoice-table-cell">
                      {data.totalHonoraireFraisDossier} €
                    </td>
                    <td className="invoice-table-cell">{data.tauxTVA} %</td>
                    <td className="invoice-table-cell">{data.montantTVA} €</td>
                    <td className="invoice-table-cell">
                      {data.totalHonoraireTTC} €
                    </td>
                    <td className="invoice-table-cell">{data.fraisDivers} €</td>
                    <td className="invoice-table-cell">
                      {data.provisionsTTC} €
                    </td>
                    <td className="invoice-table-cell">{data.remise} %</td>
                    <td className="invoice-table-cell">{data.noteTTC} €</td>
                    <td className="invoice-table-cell">{data.restantDu} €</td>
                    <td className="invoice-table-action">
                      <FaFileSignature
                        className="invoice-edit-icon"
                        onClick={() => handleEditClick(index)}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="invoice-button-container">
          <button className="invoice-send-btn" onClick={handleSendData}>
            Envoyer les données
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupNoteHonoraire;
