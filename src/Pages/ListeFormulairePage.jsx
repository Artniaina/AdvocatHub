import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import { IoAddCircleSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import "../Styles/TaxationForm/ListeForm.css";
import { useAuth } from "../Hooks/AuthContext";
import { fetchFormulaireByEmail } from "../Store/TaxationDraftListeSlice";
import { Edit, Trash2 } from "react-feather";

const ListeFormulairePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const originalFormulaires = useSelector(
    (state) => state.formulaireDraft.formulaireDraft
  );

  console.log(originalFormulaires);

  const status = useSelector((state) => state.formulaireDraft.status);
  const error = useSelector((state) => state.formulaireDraft.error);

  const [formulaires, setFormulaires] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formulaireToDelete, setFormulaireToDelete] = useState(null);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchFormulaireByEmail(user.email));
    } else {
      console.log("User or User Email is not available.");
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFormulaires(originalFormulaires);
    if (!originalFormulaires || originalFormulaires.length === 0) {
      navigate("/home/formTaxation");
    }
  }, [originalFormulaires, navigate]);

  const handleDeleteClick = (idFormulaire) => {
    setFormulaireToDelete(idFormulaire);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://192.168.10.113/Utilisateur/DeleteForm/${formulaireToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        if (response.status === 204) {
          console.log(
            `Formulaire with ID ${formulaireToDelete} deleted successfully.`
          );
        } else {
          const data = await response.json();
          console.log("Delete response data:", data);
        }
        setFormulaires((prevFormulaires) =>
          prevFormulaires.filter(
            (formulaire) => formulaire.sIDFormulaire !== formulaireToDelete
          )
        );

        const updatedFormulaires = formulaires.filter(
          (formulaire) => formulaire.sIDFormulaire !== formulaireToDelete
        );

        if (updatedFormulaires.length === 0) {
          navigate("/home/formTaxation");
        }
      } else {
        throw new Error("Failed to delete the form");
      }
    } catch (error) {
      console.error("Error deleting formulaire:", error);
    } finally {
      setShowPopup(false);
      setFormulaireToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setFormulaireToDelete(null);
  };

  const handleNavigateAddNew = () => {
    navigate("/home/formTaxation");
  };

  const handleNavigate = (formulaireId) => {
    navigate("/home/UpdateformTaxation", { state: { id: formulaireId } });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="page-title">
        <h2>Mes demandes de taxation ordinaire</h2>
      </div>
      <div className="button-container">
        <button className="add-button" onClick={handleNavigateAddNew}>
          <IoAddCircleSharp />
          Nouveau formulaire en ligne
        </button>
        <button className="update-button">
          <GrUpdate />
        </button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Affaire</th>
            <th>Enregistré le</th>
            <th>Statut</th>
            <th>Transmis le</th>
            <th>Référence Formulaire PDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formulaires.map((formulaire) => (
            <tr key={formulaire.sIDFormulaire}>
              <td>{formulaire.sNomAffaire}</td>
              <td>{formulaire.sDateContestation}</td>
              <td>{formulaire.sStatutFormulaire}</td>
              <td>{formulaire.sTransmis_le}</td>
              <td>{formulaire.sReferencePDF}</td>
              <td className="actions">
                <Edit
                  onClick={() => handleNavigate(formulaire.sIDFormulaire)}
                  className="action-button"
                  size={20}
                />
                <Trash2
                  onClick={() => handleDeleteClick(formulaire.sIDFormulaire)}
                  className="action-button"
                  size={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Confirmer la suppression</h3>
            <p>
              Voulez-vous vraiment supprimer ce formulaire ? Cette action est
              irréversible.
            </p>
            <div className="popup-actions">
              <button className="confirm-button" onClick={confirmDelete}>
                Supprimer
              </button>
              <button className="cancel-button" onClick={cancelDelete}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListeFormulairePage;
