import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { PiNotePencil } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "../Styles/TaxationForm/ListeForm.css"; 
import { useAuth } from "../Hooks/AuthContext"; 
import { fetchFormulaireByEmail } from "../Store/TaxationDraftListeSlice";

const ListeFormulairePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const originalFormulaires = useSelector((state) => state.formulaireDraft.formulaireDraft);
  const status = useSelector((state) => state.formulaireDraft.status);
  const error = useSelector((state) => state.formulaireDraft.error);
  
  const [formulaires, setFormulaires] = useState([]);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchFormulaireByEmail(user.email));
    } else {
      console.log("User or User Email is not available.");
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFormulaires(originalFormulaires);
  }, [originalFormulaires]);

  const deleteFormulaire = async (idFormulaire) => {
    try {
      const response = await fetch(`http://192.168.10.10/Utilisateur/DeleteForm/${idFormulaire}`, {
        method: 'DELETE', 
      });
      if (!response.ok) {
        throw new Error('Failed to delete the form');
      }

      setFormulaires((prevFormulaires) =>
        prevFormulaires.filter((formulaire) => formulaire.sIDFormulaire !== idFormulaire)
      );
    } catch (error) {
      console.error('Error deleting formulaire:', error);
    }
  };

  const handleNavigateAddNew = () => {
    navigate("/home/formTaxation");
  };

  const handleNavigate = () => {
    navigate("/home/UpdateformTaxation");
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
              <td>{formulaire.sEtatAvancement}</td>
              <td>{formulaire.sSubmited_at}</td>
              <td>{formulaire.sIDFormulaire}</td>
              <td className="actions">
                <PiNotePencil onClick={handleNavigate} />
                <RiDeleteBin5Line onClick={() => deleteFormulaire(formulaire.sIDFormulaire)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListeFormulairePage;
