import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { PiNotePencil } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "../Styles/TaxationForm/ListeForm.css"; 
import { useAuth } from "../Hooks/AuthContext"; 

const ListeFormulairePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formulaires, setFormulaires] = useState([]);

  const fetchFormulaires = async () => {
    try {
      const response = await fetch(`http://192.168.10.10/Utilisateur/GetListFormulaire/${user.email}`, {
        method: 'GET', 
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        console.log("Il n'y a pas de formulaires disponibles."); 
        setFormulaires([]); 
      } else {
        setFormulaires(data); 
      }
    } catch (error) {
      console.error("Error fetching formulaires:", error);
    }
  };

  const deleteFormulaire = async (idFormulaire) => {
    setFormulaires((prevFormulaires) =>
        prevFormulaires.filter((form) => form.sIDFormulaire !== idFormulaire)
      );

    try {
      const response = await fetch(`http://192.168.10.10/Utilisateur/DeleteForm/${idFormulaire}`, {
        method: 'DELETE', 
      });
      if (!response.ok) {
        throw new Error('Failed to delete the form');
      }
      setFormulaires((prevFormulaires) =>
        prevFormulaires.filter((form) => form.id !== idFormulaire)
      );
    } catch (error) {
      console.error('Error deleting formulaire:', error);
    }

    fetchFormulaires();
  };

  useEffect(() => {
    fetchFormulaires();
  }, []);


  const handleNavigateAddNew = () => {
    navigate("/home/formTaxation");
  };

  const handleNavigate = () => {
    navigate("/home/UpdateformTaxation");
  };



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
