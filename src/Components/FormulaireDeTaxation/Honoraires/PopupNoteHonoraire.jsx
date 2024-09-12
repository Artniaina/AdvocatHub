import React, { useState } from "react";
import "../../../Styles/TaxationForm/CardInfo.css";
import "../../../Styles/TaxationForm/Popup.css";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";

const PopupNoteHonoraire = ({ onClose }) => {
  const tableHeaders = [
    { label: "Nombre de minutes facturées", key: "minutes" },
    { label: "Taux honoraires HTVA facturés", key: "tauxHoraires" },
    { label: "Total des honoraires HTVA facturés", key: "totalHonotraireHTVA" },
    {
      label:
        "Total des frais de constitution de dossier et des frais de bureau HTVA facturés",
      key: "fraisDossier",
    },
    {
      label: "Total des honoraires et des frais de dossier HTVA",
      key: "totalHTVA",
    },
    { label: "Taux de TVA", key: "tauxTVA" },
    {
      label: "Montant de la TVA (honoraire et frais compris)",
      key: "montantTVA",
    },
    { label: "Total des honoraires TTC", key: "totalTTC" },
    {
      label: "Frais d'huissiers, d'expertise, de traduction, de RCS...(TTC)",
      key: "fraisDivers",
    },
    { label: "Total des provisions TTC payées", key: "provisionsTTC" },
    { label: "Remise/note de crédit", key: "remise" },
    { label: "Total de la note d'honoraire TTC", key: "noteTTC" },
    { label: "Total du montant restant dû TTC", key: "restantDu" },
  ];

  const [formData, setFormData] = useState({
    date: "",
    reference: "",
    hours: "",
    minutes: "",
    tauxHoraires: "",
    totalHonotraireHTVA: "",
    fraisDossier: "",
    totalHTVA: "",
    tauxTVA: "",
    montantTVA: "",
    totalTTC: "",
    fraisDivers: "",
    provisionsTTC: "",
    remise: "",
    noteTTC: "",
    restantDu: "",
  });
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterActive, setFilterActive] = useState(null);
  const [filters, setFilters] = useState({});
  const [tableData, setTableData] = useState([]);

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
        ? row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({
      date: "",
      reference: "",
      hours: "",
      minutes: "",
      tauxHoraires: "",
      totalHonotraireHTVA: "",
      fraisDossier: "",
      totalHTVA: "",
      tauxTVA: "",
      montantTVA: "",
      totalTTC: "",
      fraisDivers: "",
      provisionsTTC: "",
      remise: "",
      noteTTC: "",
      restantDu: "",
    });
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
                  />
                  <input
                    className="hour"
                    type="text"
                    placeholder="0mn"
                    name="minutes"
                    value={formData.minutes}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="tauxHoraires">
                  Taux horaires HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="tauxHoraires"
                  name="tauxHoraires"
                  value={formData.tauxHoraires}
                  onChange={handleChange}
                  placeholder="0.00 €"
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
                  name="totalHonotraireHTVA"
                  value={formData.totalHonotraireHTVA}
                  placeholder="0.00 €"
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalFraisDossierBureauHtva">
                  Total des frais de constitution de dossier et des frais de
                  bureau HTVA facturés :
                </label>
                <input
                  type="text"
                  id="totalFraisDossierBureauHtva"
                  name="fraisDossier"
                  value={formData.fraisDossier}
                  placeholder="0.00 €"
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalHonorairesFraisDossierHtva">
                  Total des honoraires et frais de dossiers HTVA :
                </label>
                <input
                  type="text"
                  id="totalHonorairesFraisDossierHtva"
                  name="totalHTVA"
                  value={formData.totalHTVA}
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
                />
              </div>

              <div className="formGroup">
                <label htmlFor="totalHonorairesTtc">
                  Total des honoraires TTC * :
                </label>
                <input
                  type="text"
                  id="totalHonorairesTtc"
                  name="totalTTC"
                  placeholder="0.00 €"
                  value={formData.totalTTC}
                  onChange={handleChange}
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
            Ajouter
          </button>
        </form>

        <div className="tablediv">
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
  {filteredData.map((data, index) => (
    <tr key={index}>
      <td>{data.minutes}</td>
      <td>{data.tauxHoraires}</td>
      <td>{data.totalHonotraireHTVA}</td>
      <td>{data.fraisDossier}</td>
      <td>{data.totalHTVA}</td>
      <td>{data.tauxTVA}</td>
      <td>{data.montantTVA}</td>
      <td>{data.totalTTC}</td>
      <td>{data.fraisDivers}</td>
      <td>{data.provisionsTTC}</td>
      <td>{data.remise}</td>
      <td>{data.noteTTC}</td>
      <td>{data.restantDu}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        <button className="sendButton">Envoyer les données</button>
      </div>
    </div>
  );
};

export default PopupNoteHonoraire;
