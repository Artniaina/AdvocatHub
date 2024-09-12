import React, { useState } from "react";
import PopupNoteHonoraire from "./PopupNoteHonoraire";
import { IoAddCircle } from "react-icons/io5";

const Facture = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
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
            <input className="hour" type="text" placeholder="0h" readOnly />
            <input className="hour" type="text" placeholder="0mn" readOnly />
          </div>
        </div>
      </div>
      <div className="honoraires ">
        <form>
          <label htmlFor="honorairesHtva">Aux horaires HTVA facturés :</label>
          <input
            type="text"
            id="honorairesHtva"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="totalHonorairesHtva">
            Total des honoraires HTVA facturés :
          </label>
          <input
            type="text"
            id="totalHonorairesHtva"
            placeholder="0.00 €"
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
            readOnly
          />

          <label htmlFor="totalHonorairesFraisHtva">
            Total des honoraires et frais de dossiers HTVA :
          </label>
          <input
            type="text"
            id="totalHonorairesFraisHtva"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="tauxTva">Taux de TVA :</label>
          <input type="text" id="tauxTva" placeholder="0.00%" readOnly />

          <label htmlFor="montantTva">
            Montant de la TVA (honoraires et frais compris) :
          </label>
          <input type="text" id="montantTva" placeholder="0.00 €" readOnly />

          <label htmlFor="totalHonorairesTtc">Total des honoraires TTC :</label>
          <input
            type="text"
            id="totalHonorairesTtc"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="fraisHuissiersTtc">
            Frais d’huissiers, d’expertise, de traduction, de RCS... (TTC) :
          </label>
          <input
            type="text"
            id="fraisHuissiersTtc"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="totalProvisionsTtc">
            Total des provisions TTC payées :
          </label>
          <input
            type="text"
            id="totalProvisionsTtc"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="remiseCreditNote">Remise / note de crédit :</label>
          <input
            type="text"
            id="remiseCreditNote"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="totalNoteHonorairesTtc">
            Total de la note d’honoraires TTC :
          </label>
          <input
            type="text"
            id="totalNoteHonorairesTtc"
            placeholder="0.00 €"
            readOnly
          />

          <label htmlFor="totalMontantRestantTtc">
            Total du montant restant dû TTC :
          </label>
          <input
            type="text"
            id="totalMontantRestantTtc"
            placeholder="0.00 €"
            readOnly
          />
        </form>
        {showPopup && <PopupNoteHonoraire onClose={handleClosePopup} />}
      </div>
    </>
  );
};

export default Facture;
