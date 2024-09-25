import React from "react";
import Navbar from "../Components/Navbar";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { PiNotePencil } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "../Styles/TaxationForm/ListeForm.css"; 

const ListeFormulairePage = () => {
  const navigate = useNavigate();

  const handleNavigateAddNew = () => {
    navigate("/home/formTaxation");
  };

  const handleNavigate = () => {
    navigate("/home/UpdateformTaxation");
  };

  const handleDelete = () => {
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
          <tr>
            <td>Affaire 1</td>
            <td>2024-09-01</td>
            <td>En cours</td>
            <td>2024-09-02</td>
            <td>12345</td>
            <td className="actions">
              <PiNotePencil onClick={handleNavigate} />
              <RiDeleteBin5Line onClick={handleDelete} />
            </td>
          </tr>
          <tr>
            <td>Affaire 2</td>
            <td>2024-08-25</td>
            <td>Terminé</td>
            <td>2024-08-26</td>
            <td>67890</td>
            <td className="actions">
              <PiNotePencil onClick={handleNavigate} />
              <RiDeleteBin5Line onClick={handleDelete} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ListeFormulairePage;
