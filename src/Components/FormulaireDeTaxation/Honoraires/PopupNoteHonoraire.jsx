//Can youadjust the code et show all of the input value in the tableafter a submit
import React, { useState } from "react";
import "../../../Styles/TaxationForm/CardInfo.css";
import "../../../Styles/TaxationForm/Popup.css";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";

const PopupNoteHonoraire = ({ onClose }) => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [etude, setEtude] = useState("");
  const [titrePro, setTitrePro] = useState("");
  const [formationExp, setFormationExp] = useState("");
  const [autresInfo, setAutresInfo] = useState("");
  // const [Prestataires, setPrestataires] = useState(prestataireData);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterActive, setFilterActive] = useState(null);
  const [filters, setFilters] = useState({});

  // const handleSubmitTable = (e) => {
  //   e.preventDefault();
  //   setPrestataires([
  //     ...Prestataires,
  //     {
  //       name,
  //       prenom,
  //       email,
  //       etude,
  //       titrePro,
  //       formationExp,
  //       autresInfo,
  //       checked: false,
  //     },
  //   ]);
//
  //   setName("");
  //   setPrenom("");
  //   setEmail("");
  //   setEtude("");
  //   setTitrePro("");
  //   setFormationExp("");
  //   setAutresInfo("");
  // };

  // const handleCheckboxChange = (index) => {
  //   const updatedPrestataires = Prestataires.map((Prestataire, i) => {
  //     if (i === index) {
  //       return { ...Prestataire, checked: !Prestataire.checked };
  //     }
  //     return Prestataire;
  //   });
  //   setPrestataires(updatedPrestataires);
  // };

  const handleSendData = () => {
    // onSubmitData(Prestataires);
    onClose();
  };
  const handleSubmit = () => {
    // onSubmitData(Prestataires);
    console.log("Good bye world");
  };

  // const requestSort = (key) => {
  //   const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
  //   const sortedPrestataires = [...Prestataires].sort((a, b) => {
  //     if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
  //     if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
  //     return 0;
  //   });
  //   setSortKey(key);
  //   setSortOrder(order);
  //   setPrestataires(sortedPrestataires);
  // };

  // const handleFilterChange = (e, key) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [key]: e.target.value,
  //   }));
  // };

  // const handleFilterClick = (key) => {
  //   setFilterActive(key);
  // };

  // const filteredPrestataires = Prestataires.filter((Prestataire) =>
  //   Object.keys(filters).every((key) =>
  //     Prestataire[key]
  //       ? Prestataire[key].toLowerCase().includes(filters[key].toLowerCase())
  //       : false
  //   )
  // );

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
              <div style={{display:"flex"}}>
                <div >
                  <label htmlFor="daterequ">Date*: </label>
                  <input
                    type="date"
                    id="daterequ"
                    value={etude}
                    onChange={(e) => setEtude(e.target.value)}
                    required
                  />
                </div>
                <div style={{width:"395px", marginLeft:"30px"}}>
                  <label htmlFor="reference">Référence: </label>
                  <input
                    type="text"
                    id="reference"
                    value={etude}
                    onChange={(e) => setEtude(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <p>Nombre d'heures facturées *  :</p>
                <div style={{ display: "flex" }}>
                  <input className="hour" type="text" placeholder="0h" />
                  <input className="hour" type="text" placeholder="0mn" />
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="fraisHuissiersTtc">
                Taux horaires HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="fraisHuissiersTtc"
                  placeholder="0.00 €"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalFraisDossierHtva">
                Total des frais de constitution de dossier et des frais de bureau HTVA facturés * :
                </label>
                <input
                  type="text"
                  id="totalFraisDossierHtva"
                  placeholder="0.00 €"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalFraisDossierHtva">
                  Total des frais de constitution de dossier et des frais de
                  bureau HTVA facturés :
                </label>
                <input
                  type="text"
                  id="totalFraisDossierHtva"
                  placeholder="0.00 €"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalFraisDossierHtva">
                Total des honoraires et frais de dossiers HTVA : 
                </label>
                <input
                  type="text"
                  id="totalFraisDossierHtva"
                  placeholder="0.00 €"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalProvisionsTtc">
                Taux de TVA : 
                                </label>
                <input
                  type="text"
                  id="totalProvisionsTtc"
                  placeholder="0.00 €"
                  
                />
              </div>{" "}
            </div>

            <div className="prestataire">
              <div className="formGroup">
                {" "}
                <label htmlFor="totalHonorairesHtva">
                Montant de la TVA (honoraires et frais compris) * :                </label>
                <input
                  type="text"
                  id="totalHonorairesHtva"
                  placeholder="0.00 €"
                  
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalFraisDossierHtva">
                Total des honoraires TTC * :
                </label>
                <input
                  type="text"
                  id="totalFraisDossierHtva"
                  placeholder="0.00 €"
                  
                />
              </div>
              <div className="formGroup">
                <label htmlFor="totalFraisDossierHtva">
                Frais d’huissiers, d’expertise, de traduction, de RCS... (TTC) * : 
                </label>
                <input
                  type="text"
                  id="totalFraisDossierHtva"
                  placeholder="0.00 €"
                  
                />
              </div>
              <div className="formGroup">
                {" "}
                <label htmlFor="totalHonorairesFraisHtva">
                Total des provisions TTC payées * :
                </label>
                <input
                  type="text"
                  id="totalHonorairesFraisHtva"
                  placeholder="0.00 €"
                  
                />
              </div>
              <div className="formGroup">
                <label htmlFor="tauxTva">Remise/note de crédit:</label>
                <input type="text" id="tauxTva" placeholder="0.00%"  />
              </div>
              <div className="formGroup">
                <label htmlFor="montantTva">
                  Total de la note honoraires TTC*:
                </label>
                <input
                  type="text"
                  id="montantTva"
                  placeholder="0.00 €"
                  readOnly
                />
              </div>
              <div className="formGroup">
                <label htmlFor="montantTva">
                  Total du montant restant dû TTC*:
                </label>
                <input
                  type="text"
                  id="montantTva"
                  placeholder="0.00 €"
                  readOnly
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
                {[
                  "Nombre de minutes facturées",
                  "Taux honoraires HTVA facturés",
                  "Total des honoraires HTVA facturés",
                  "Total des frais de constitution de dossier et des frais de bureau HTVA facturés",
                  "Total des honoraires et des frais de dossier HTVA",
                  "Taux de TVA",
                  "Montant de la TVA (honoraire et frais compris)",
                  "Total des honoraires TTC",
                  "Frais d'huissiers, d'expertise, de traduction, de RCS...(TTC)",
                  "Total des provisions TTC payées",
                  "Remise/note de crédit",
                  "Total de la note d'honoraire TTC",
                  "Total du montant restant dû TTC",
                ].map((key) => (
                  <th
                    key={key}
                    // onClick={() => requestSort(key)}
                  >
                    <span className="sort-icon">
                      <PiCaretUpDownFill />
                    </span>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span
                      className="filter-btn"
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleFilterClick(key);
                      // }}
                    >
                      <FaFilter />
                    </span>
                    {/* {filterActive === key && ( */}
                    <input
                      type="text"
                      placeholder={`Filter by ${key}`}
                      value={filters[key] || ""}
                      // onChange={(e) => handleFilterChange(e, key)}
                    />
                    {/* )} */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {filteredPrestataires.map((Prestataire, index) => ( */}
              {/* <tr key={index}>
                  <td>{Prestataire.name}</td>
                  <td>{Prestataire.prenom}</td>
                  <td>{Prestataire.email}</td>
                  <td>{Prestataire.etude}</td>
                  <td>{Prestataire.titrePro}</td>
                  <td>{Prestataire.formationExp}</td>
                  <td>{Prestataire.autresInfo}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={Prestataire.checked}
                      // onChange={() => handleCheckboxChange(index)}
                    />
                  </td> */}
              {/* </tr> */}
              {/* ))} */}
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
