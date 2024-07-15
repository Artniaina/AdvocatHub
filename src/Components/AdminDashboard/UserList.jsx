import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../Styles/AdminDashboard/Table.css";
import { useNavigate, useLocation } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuthenticated, isAuthenticated } = location.state || {};

  const handleNavigate = () => {
    navigate("/home");
  };
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetchData();
    }
  }, []);

 

  const fetchData = async () => {
    try {
      const response = await fetch( "http://192.168.10.5/Utilisateur/Utilisateur");
      const data = await response.json();
      setUsers(data);
      localStorage.setItem("users", JSON.stringify(data));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const handleChangeStatus = async (userID) => {
    const updatedUsers = users.map((user) =>
      user.IDUtilisateur === userID ? { ...user, Statut: !user.Statut } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updateUserUrl = ` "http://192.168.10.5/Utilisateur/Utilisateur"/${userID}`;
    try {
      const response = await fetch(updateUserUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statut: !updatedUsers.find((user) => user.IDUtilisateur === userID)
            .Statut,
        }),
      });

      if (!response.ok) {
        console.error(
          "La mise à jour du statut a échoué avec un statut :",
          response.status
        );
        setUsers(
          users.map((user) =>
            user.IDUtilisateur === userID
              ? { ...user, Statut: !user.Statut }
              : user
          )
        );
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        const updatedUser = updatedUsers.find(
          (user) => user.IDUtilisateur === userID
        );
        console.log(`${updatedUser.Statut ? "Actif" : "Inactif"}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de l'utilisateur :",
        error
      );
      setUsers(
        users.map((user) =>
          user.IDUtilisateur === userID
            ? { ...user, Statut: !user.Statut }
            : user
        )
      );
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const handleDelete = async (userID) => {
    const deleteUrl = ` "http://192.168.10.5/Utilisateur/Utilisateur"/${userID}`;
    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedUsers = users.filter(
          (user) => user.IDUtilisateur !== userID
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } else {
        console.error(
          "La suppression a échoué avec un statut :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Liste des utilisateurs inscrits</h1>
      <button className="btnDash" onClick={handleNavigate}>
        Page d'acceuil
      </button>
      <table className="tableUsers">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Statut</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.IDUtilisateur}>
              <td>{user.IDUtilisateur}</td>
              <td>{user.NomUtilisateur}</td>
              <td>{user.EmailUtilisateur}</td>
              <td>{user.Role}</td>
              <td>
                <button
                  className="btn"
                  style={{ backgroundColor: user.Statut ? "green" : "red" }}
                  onClick={() => handleChangeStatus(user.IDUtilisateur)}
                >
                  {user.Statut ? "Actif" : "Inactif"}
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDelete(user.IDUtilisateur)}
                >
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
