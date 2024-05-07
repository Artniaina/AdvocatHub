import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import "../Styles/AdminDashboard/Table.css"

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const apiUrl = 'http://192.168.10.5/Utilisateur/Utilisateur';

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    const handleDelete = async (userID) => {
        const deleteUrl = `${apiUrl}/${userID}`;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error('La suppression a échoué avec un statut :', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Liste des Utilisateurs</h1>
            <table className="tableUsers">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Statut</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.IDUtilisateur}>
                            <td>{user.IDUtilisateur}</td>
                            <td>{user.NomUtilisateur}</td>
                            <td>{user.EmailUtilisateur}</td>
                            <td>{user.Authorization}</td>
                            <td>
                                <button className='btn' onClick={() => handleDelete(user.IDUtilisateur)}>
                                    <RiDeleteBin6Line />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserTable;
