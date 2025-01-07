import React, { useState, useEffect } from "react";
import { X, Clock, Calendar, Upload, Bell, MapPin } from "lucide-react";
import { useAuth } from "../../Hooks/AuthContext";

const addEventStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
  },
  container: {
    position: "relative",
    backgroundColor: "#FFF",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
    maxHeight: "90vh",
    overflowY: "auto",
    width: "460px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    transition: "all 0.2s",
  },
  closeButtonHover: {
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#111",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #eee",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  inputFocus: {
    borderColor: "#2563eb",
    backgroundColor: "#fff",
    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
  },
  dateTimeContainer: {
    display: "flex",
    gap: "12px",
  },
  dateTimeGroup: {
    flex: 1,
  },
  dateTimeDisplay: {
    fontSize: "13px",
    color: "#666",
    marginTop: "4px",
  },
  guestsContainer: {
    marginTop: "8px",
  },
  avatarGroup: {
    display: "flex",
    marginTop: "8px",
    gap: "4px",
  },
  avatarMore: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#666",
  },
  notificationGroup: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
  notificationButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #eee",
    backgroundColor: "#fff",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  uploadSection: {
    marginTop: "16px",
  },
  uploadButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px dashed #ccc",
    backgroundColor: "#fafafa",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#666",
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    marginTop: "8px",
    fontSize: "13px",
  },
  progressBar: {
    width: "100%",
    height: "4px",
    backgroundColor: "#eee",
    borderRadius: "2px",
    marginTop: "4px",
  },
  progress: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: "2px",
    width: "50%",
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  submitButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  submitButtonHover: {
    backgroundColor: "#1d4ed8",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#666",
  },
};

const PopupEditEvent = ({ meetingData, eventId, refreshEvents, onClose }) => {
  const { user } = useAuth();
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}${month}${day}`;
  }

  const currentDate = getCurrentDate();

  const [eventData, setEventData] = useState({
    titre: "",
    organisateur: user?.email,
    ordreDuJour: "",
    lienVisio: "",
    statut: "scheduled",
    date: "",
    heureDebut: "",
    heureFin: "",
    participant: "kanto@jm-contacts.net, sh.herinavalona@gmail.com", //Mbola on verra bien
    dateCreation: currentDate,
  });
  console.log(meetingData);

  useEffect(() => {
    if (meetingData && meetingData.length > 0) {
      const meeting = meetingData[0];
      setEventData({
        titre: meeting.titre || "",
        organisateur: user?.email,
        ordreDuJour: meeting.ordreDuJour || "",
        lienVisio: meeting.lienVisio || "",
        statut: meeting.statut || "scheduled",
        date: meeting.date ? meeting.date.split("T")[0] : "",
        heureDebut: meeting.heureDebut || "",
        heureFin: meeting.heureFin || "",
        participant: "kanto@jm-contacts.net, sh.herinavalona@gmail.com", //Mbola on verra bien
        dateCreation: currentDate,
      });
    }
  }, [meetingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventId) {
      alert("Event ID is missing.");
      return;
    }
    try {
      const response = await fetch(
        `http://192.168.10.10/Utilisateur/api/meetings/update/${eventId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        alert("Événement mis à jour avec succès!");
        await refreshEvents();
        onClose();
      } else {
        alert("Échec de la mise à jour de l'événement.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Erreur réseau. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div style={addEventStyles.overlay}>
      <div style={addEventStyles.backdrop} onClick={onClose} />
      <div style={addEventStyles.container}>
        <div style={addEventStyles.header}>
          <h2 style={addEventStyles.title}>Modifier un événement</h2>
          <button style={addEventStyles.closeButton} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={addEventStyles.form}>
          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Nom de l'événement</label>
            <input
              type="text"
              name="titre"
              value={eventData.titre}
              onChange={handleChange}
              placeholder="Saisissez le nom de l'événement"
              style={addEventStyles.input}
            />
          </div>

          <div style={addEventStyles.dateTimeContainer}>
            <div style={addEventStyles.dateTimeGroup}>
              <label style={addEventStyles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                style={addEventStyles.input}
              />
            </div>
            <div style={addEventStyles.dateTimeGroup}>
              <label style={addEventStyles.label}>Heure début</label>
              <input
                type="time"
                name="heureDebut"
                value={eventData.heureDebut}
                onChange={handleChange}
                style={addEventStyles.input}
              />
            </div>
            <div style={addEventStyles.dateTimeGroup}>
              <label style={addEventStyles.label}>Heure fin</label>
              <input
                type="time"
                name="heureFin"
                value={eventData.heureFin}
                onChange={handleChange}
                style={addEventStyles.input}
              />
            </div>
          </div>

          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Lieu</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Choisir un lieu"
              style={addEventStyles.input}
            />
          </div>

          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Lien Visio</label>
            <input
              type="text"
              name="lienVisio"
              value={eventData.lienVisio}
              onChange={handleChange}
              placeholder="Entrez le lien visio"
              style={addEventStyles.input}
            />
          </div>

          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Ordre du Jour</label>
            <textarea
              name="ordreDuJour"
              value={eventData.ordreDuJour}
              onChange={handleChange}
              placeholder="Détails de l'ordre du jour"
              style={addEventStyles.input}
            />
          </div>

          <div style={addEventStyles.buttonContainer}>
            <button
              type="button"
              style={addEventStyles.cancelButton}
              onClick={onClose}
            >
              Annuler
            </button>
            <button type="submit" style={addEventStyles.submitButton}>
              Mettre à jour l'événement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditEvent;
