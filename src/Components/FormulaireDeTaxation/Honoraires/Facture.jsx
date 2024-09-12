import React, { useState } from "react";
import PopupNoteHonoraire from "./PopupNoteHonoraire";
import { IoAddCircle } from "react-icons/io5";

const Facture = () => {
  const [honoraireData, setHonoraireData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedData, setSelectedData] = useState({
    fraisDivers: "",
    fraisDossier: "",
    hours: "",
    minutes: "",
    montantTVA: "",
    noteTTC: "",
    provisionsTTC: "",
    reference: "",
    remise: "",
    restantDu: "",
    tauxHoraires: "",
    tauxTVA: "",
    totalHTVA: "",
    totalHonoraireHTVA: "",
    totalTTC: ""
  });

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDataFromPopup = (data) => {
    setHonoraireData(data);
    handleClosePopup();
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    const data = honoraireData.find(item => item.date === date);
    setSelectedData(data || {
      fraisDivers: "",
      fraisDossier: "",
      hours: "",
      minutes: "",
      montantTVA: "",
      noteTTC: "",
      provisionsTTC: "",
      reference: "",
      remise: "",
      restantDu: "",
      tauxHoraires: "",
      tauxTVA: "",
      totalHTVA: "",
      totalHonoraireHTVA: "",
      totalTTC: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p>
        L'intégralité des honoraires facturés doit être saisie. L'ensemble des
        montants sont exprimés en Euros.
      </p>
      <div>
        <p style={{ display: "flex" }}>
          Ajouter une note d'honoraire{" "}
          <div
            className="btnAdd"
            onClick={handleShowPopup}
            style={{
              color: "green",
              fontSize: "40px",
              marginLeft: "12px",
              marginBottom: "-45px",
            }}
          >
            <IoAddCircle />
          </div>
        </p>
        <div style={{ display: "flex" }}>
          <p>Nombre d'heures facturées:</p>
          <div>
            <input className="hour" type="text" placeholder="0h" value={selectedData.hours} readOnly />
            <input className="hour" type="text" placeholder="0mn" value={selectedData.minutes} readOnly />
          </div>
        </div>
      </div>
      <div className="honoraires ">
        <form onSubmit={handleSubmit}>
          {/* New Select Input */}
          {honoraireData.length > 0 && (
            <div>
              <label htmlFor="dateSelect">Sélectionner une date:</label>
              <select id="dateSelect" value={selectedDate} onChange={handleDateChange}>
                <option value="">-- Choisissez une date --</option>
                {honoraireData.map((data) => (
                  <option key={data.date} value={data.date}>
                    {data.date}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Existing Form Inputs */}
          <label htmlFor="honorairesHtva">Aux horaires HTVA facturés :</label>
          <input
            type="text"
            id="honorairesHtva"
            placeholder="0.00 €"
            value={selectedData.totalHTVA}
            readOnly
          />

          <label htmlFor="totalHonorairesHtva">
            Total des honoraires HTVA facturés :
          </label>
          <input
            type="text"
            id="totalHonorairesHtva"
            placeholder="0.00 €"
            value={selectedData.totalHonoraireHTVA}
            readOnly
          />

          <label htmlFor="totalFraisDossierHtva">
            Total des frais de constitution de dossier et des frais de bureau
            HTVA facturés :
          </label>
          <input
            type="text"
            id="totalFraisDossierHtva"
            placeholder="0.00 €"
            value={selectedData.fraisDossier}
            readOnly
          />

          <label htmlFor="totalHonorairesFraisHtva">
            Total des honoraires et frais de dossiers HTVA :
          </label>
          <input
            type="text"
            id="totalHonorairesFraisHtva"
            placeholder="0.00 €"
            value={selectedData.totalHonotraireHTVA}
            readOnly
          />

          <label htmlFor="tauxTva">Taux de TVA :</label>
          <input
            type="text"
            id="tauxTva"
            placeholder="0.00%"
            value={selectedData.tauxTVA}
            readOnly
          />

          <label htmlFor="montantTva">
            Montant de la TVA (honoraires et frais compris) :
          </label>
          <input
            type="text"
            id="montantTva"
            placeholder="0.00 €"
            value={selectedData.montantTVA}
            readOnly
          />

          <label htmlFor="totalHonorairesTtc">Total des honoraires TTC :</label>
          <input
            type="text"
            id="totalHonorairesTtc"
            placeholder="0.00 €"
            value={selectedData.noteTTC}
            readOnly
          />

          <label htmlFor="fraisHuissiersTtc">
            Frais d’huissiers, d’expertise, de traduction, de RCS... (TTC) :
          </label>
          <input
            type="text"
            id="fraisHuissiersTtc"
            placeholder="0.00 €"
            value={selectedData.fraisDivers}
            readOnly
          />

          <label htmlFor="totalProvisionsTtc">
            Total des provisions TTC payées :
          </label>
          <input
            type="text"
            id="totalProvisionsTtc"
            placeholder="0.00 €"
            value={selectedData.provisionsTTC}
            readOnly
          />

          <label htmlFor="remiseCreditNote">Remise / note de crédit :</label>
          <input
            type="text"
            id="remiseCreditNote"
            placeholder="0.00 €"
            value={selectedData.remise}
            readOnly
          />

          <label htmlFor="totalNoteHonorairesTtc">
            Total de la note d’honoraires TTC :
          </label>
          <input
            type="text"
            id="totalNoteHonorairesTtc"
            placeholder="0.00 €"
            value={selectedData.noteTTC}
            readOnly
          />

          <label htmlFor="totalMontantRestantTtc">
            Total du montant restant dû TTC :
          </label>
          <input
            type="text"
            id="totalMontantRestantTtc"
            placeholder="0.00 €"
            value={selectedData.restantDu}
            readOnly
          />
        </form>
        {showPopup && <PopupNoteHonoraire onClose={handleClosePopup} onSubmitData={handleDataFromPopup} />}
      </div>
    </>
  );
};

export default Facture;
