import React, { useState, useEffect } from "react";
import PopupNoteHonoraire from "./PopupNoteHonoraire";
import { IoAddCircle } from "react-icons/io5";
import { useGeneraliteContext } from "../../../../Hooks/GeneraliteContext";

const Facture = () => {
  const { noteHonoraire, setNoteHonoraire } = useGeneraliteContext();
  const { noteHonoraireToCompare, setNoteHonoraireToCompare } =
    useGeneraliteContext();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedData, setSelectedData] = useState({
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

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDataFromPopup = (data) => {
    setNoteHonoraire(data);
    handleClosePopup();
  };

  useEffect(() => {
    if (noteHonoraire.length > 0) {
      const noteHonoraireData = noteHonoraire.map(
        ({ date, totalHonoraireTTC, reference }) => ({
          date,
          amount: totalHonoraireTTC,
          reference,
        })
      );
      setNoteHonoraireToCompare(noteHonoraireData);

      setSelectedDate(noteHonoraire[0].date);
      setSelectedData(noteHonoraire[0]);
    } else {
      setNoteHonoraireToCompare([]);
      setSelectedData({
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
    }
  }, [noteHonoraire]);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    const data = noteHonoraire.find((item) => item.date === date);
    setSelectedData(
      data || {
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
      }
    );
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
      {noteHonoraire.length > 0 && (
        <div>
          <label htmlFor="dateSelect">Sélectionner une date:</label>
          <select
            id="dateSelect"
            value={selectedDate}
            onChange={handleDateChange}
          >
            {noteHonoraire.map((data) => (
              <option key={data.date} value={data.date}>
                {data.date}
              </option>
            ))}
          </select>
        </div>
      )}
      <div style={{ display: "flex" }}>
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
      </div>

      <div className="honoraires ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="honorairesHtva">Aux horaires HTVA facturés :</label>
          <input
            type="text"
            id="honorairesHtva"
            placeholder="0.00 €"
            value={selectedData.tauxHorairesfacturés}
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
            value={selectedData.fraisConstitutionDossier}
            readOnly
          />

          <label htmlFor="totalHonorairesFraisHtva">
            Total des honoraires et frais de dossiers HTVA :
          </label>
          <input
            type="text"
            id="totalHonorairesFraisHtva"
            placeholder="0.00 €"
            value={selectedData.totalHonoraireFraisDossier}
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
            value={selectedData.totalHonoraireTTC}
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
        {showPopup && (
          <PopupNoteHonoraire
            noteHonoraire={noteHonoraire}
            onClose={handleClosePopup}
            onSubmitData={handleDataFromPopup}
          />
        )}
      </div>
    </>
  );
};

export default Facture;
