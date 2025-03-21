import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const Invitation = () => {
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("email");
    const idFromUrl = params.get("id");

    if (emailFromUrl && idFromUrl) {
      setEmail(emailFromUrl);
      setId(idFromUrl);
    }
  }, []);

  const handleResponse = async (responseStatus) => {
    const requestBody = {
      sStatutParticipant: responseStatus,
    };

    try {
      const response = await fetch(
        `${apiUrl}/Utilisateur/invités/updateStatut/${email}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setStatus(responseStatus);
        setResponseMessage(
          `Invitation ${
            responseStatus === "accepté" ? "acceptée" : "refusée"
          } avec succès!`
        );
      } else {
        setResponseMessage(
          `Erreur lors de la ${
            responseStatus === "accepté" ? "acceptation" : "refus"
          } de l'invitation.`
        );
      }
    } catch (error) {
      setResponseMessage(
        `Une erreur est survenue lors de la ${
          responseStatus === "accepté" ? "acceptation" : "refus"
        } de l'invitation.`
      );
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Invitation</h1>
      <p>Statut : {status}</p>
      <button
        onClick={() => handleResponse("accepté")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Accepter l'invitation
      </button>
      <button
        onClick={() => handleResponse("refusé")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Refuser l'invitation
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Invitation;
