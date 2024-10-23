import React, { useState, useEffect } from "react";
import "../../../Styles/TaxationForm/CardInfo.css";
import "../../../Styles/TaxationForm/Popup.css";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import { useGeneraliteContext } from "../../../Hooks/GeneraliteContext";
import { FaFileSignature } from "react-icons/fa6";

const PopupNoteHonoraire = ({ onClose, onSubmitData }) => {
  const { noteHonoraire } = useGeneraliteContext();
  const tableHeaders = [
    { label: "Nombre d'heures facturées", key: "hours" },
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

  useEffect(() => {
    const { totalHonoraireFraisDossier, tauxTVA } = formData;
    if (totalHonoraireFraisDossier && tauxTVA) {
      const montantTVA = (
        (parseFloat(totalHonoraireFraisDossier) * parseFloat(tauxTVA)) /
        100
      ).toFixed(2);
      setFormData((prevData) => ({ ...prevData, montantTVA }));
    }
  }, [formData.totalHonoraireFraisDossier, formData.tauxTVA]);

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

  const handleFilterClick = (key) => {
    setFilterActive(key);
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
    <div className="overlay">
      <div className="popupTax">
        <div className="titleCard">
          HONORAIRES
          <button
            className="close-button"
            style={{ marginTop: "-5px" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="avocatForm2">
            <div className="prestataire">
              <div style={{ display: "flex" }}>
                <div>
                  <label htmlFor="date">Date*: </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
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
                    value={formData.reference}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <p>Nombre d'heures facturées * :</p>
                <div style={{ display: "flex" }}>
                  <input
                    className="hour"
                    type="text"
                    placeholder="0h"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="hour"
                    type="text"
                    placeholder="0mn"
                    name="minutes"
                    value={formData.minutes}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="tauxHorairesfacturés">
                  Taux horaires HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="tauxHorairesfacturés"
                  name="tauxHorairesfacturés"
                  value={formData.tauxHorairesfacturés}
                  onChange={handleChange}
                  placeholder="0.00 €"
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalHonoraireHTVA">
                  Total des honoraires HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="totalHonoraireHTVA"
                  name="totalHonoraireHTVA"
                  value={formData.totalHonoraireHTVA}
                  onChange={handleChange}
                  placeholder="0.00 €"
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalFraisConstitutionHtva">
                  Total des frais de constitution de dossier et des frais de
                  bureau HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="totalFraisConstitutionHtva"
                  name="fraisConstitutionDossier"
                  value={formData.fraisConstitutionDossier}
                  placeholder="0.00 €"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalHonorairesFraisDossierHtva">
                  Total des honoraires et frais de dossiers HTVA :
                </label>
                <input
                  type="text"
                  id="totalHonorairesFraisDossierHtva"
                  name="totalHonoraireFraisDossier"
                  value={formData.totalHonoraireFraisDossier}
                  placeholder="0.00 €"
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="tauxTva">Taux de TVA :</label>
                <input
                  type="text"
                  id="tauxTva"
                  name="tauxTVA"
                  placeholder="0.00 %"
                  value={formData.tauxTVA}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="prestataire">
              <div className="formGroup">
                <label htmlFor="montantTvaHonoraire">
                  Montant de la TVA (honoraires et frais compris) * :
                </label>
                <input
                  type="text"
                  id="montantTvaHonoraire"
                  name="montantTVA"
                  value={formData.montantTVA}
                  placeholder="0.00 €"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalHonorairesTtc">
                  Total des honoraires TTC * :
                </label>
                <input
                  type="text"
                  id="totalHonorairesTtc"
                  name="totalHonoraireTTC"
                  placeholder="0.00 €"
                  value={formData.totalHonoraireTTC}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="fraisHuissiersTtc">
                  Frais d’huissiers, d’expertise, de traduction, de RCS... (TTC)
                  * :
                </label>
                <input
                  type="text"
                  id="fraisHuissiersTtc"
                  name="fraisDivers"
                  placeholder="0.00 €"
                  value={formData.fraisDivers}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalProvisionsTtc">
                  Total des provisions TTC payées * :
                </label>
                <input
                  type="text"
                  id="totalProvisionsTtc"
                  name="provisionsTTC"
                  placeholder="0.00 €"
                  value={formData.provisionsTTC}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="remiseNoteCredit">
                  Remise/note de crédit :
                </label>
                <input
                  type="text"
                  id="remiseNoteCredit"
                  name="remise"
                  placeholder="0.00%"
                  value={formData.remise}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="noteTtc">Note TTC :</label>
                <input
                  type="text"
                  id="noteTtc"
                  name="noteTTC"
                  placeholder="0.00 €"
                  value={formData.noteTTC}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="restantDu">Restant dû :</label>
                <input
                  type="text"
                  id="restantDu"
                  name="restantDu"
                  placeholder="0.00 €"
                  value={formData.restantDu}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button className="addButton" type="submit">
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </form>

        <div className="table-container">
          <table className="tavleInfo">
            <thead>
              <tr>
                {tableHeaders.map(({ label, key }) => (
                  <th key={key} onClick={() => requestSort(key)}>
                    <span className="sort-icon">
                      <PiCaretUpDownFill />
                    </span>
                    {label}
                    <span
                      className="filter-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterClick(key);
                      }}
                    >
                      <FaFilter />
                    </span>
                    {filterActive === key && (
                      <input
                        type="text"
                        placeholder={`Filter by ${label}`}
                        value={filters[key] || ""}
                        onChange={(e) => handleFilterChange(e, key)}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) =>
                index === editIndex ? null : (
                  <tr key={index}>
                    <td>{data.hours}</td>
                    <td>{data.minutes}</td>
                    <td>{data.tauxHorairesfacturés}</td>
                    <td>{data.totalHonoraireHTVA}</td>
                    <td>{data.fraisConstitutionDossier}</td>
                    <td>{data.totalHonoraireFraisDossier}</td>
                    <td>{data.tauxTVA}</td>
                    <td>{data.montantTVA}</td>
                    <td>{data.totalHonoraireTTC}</td>
                    <td>{data.fraisDivers}</td>
                    <td>{data.provisionsTTC}</td>
                    <td>{data.remise}</td>
                    <td>{data.noteTTC}</td>
                    <td>{data.restantDu}</td>
                    <td>
                      <FaFileSignature onClick={() => handleEditClick(index)} />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <button className="sendButton" onClick={handleSendData}>
          Envoyer les données
        </button>
      </div>
    </div>
  );
};

export default PopupNoteHonoraire;
