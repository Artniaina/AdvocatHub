import React from 'react';
import Navbar from '../Components/Navbar';
import { IoAddCircleSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { PiNotePencil } from "react-icons/pi";


const ListeFormulairePage = () => {
  return (
    <>
      <Navbar />
      <div>
      <h2>Mes demandes de taxation ordinaire</h2>
      </div>
      <div>
        <button><IoAddCircleSharp/>Nouveau formulaire en ligne</button>
        <button><GrUpdate/></button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Affaire</th>
            <th>Enregistré le</th>
            <th>Statut</th>
            <th>Transmis le</th>
            <th>Référence Formulaire PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Affaire 1</td>
            <td>2024-09-01</td>
            <td>En cours</td>
            <td>2024-09-02</td>
            <td>12345</td>
            <td><PiNotePencil/></td>
            <td><RiDeleteBin5Line/></td>
          </tr>
          <tr>
            <td>Affaire 2</td>
            <td>2024-08-25</td>
            <td>Terminé</td>
            <td>2024-08-26</td>
            <td>67890</td>
            <td><PiNotePencil/></td>
            <td><RiDeleteBin5Line/></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ListeFormulairePage;
