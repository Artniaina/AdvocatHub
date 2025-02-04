import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Link,
  Clock,
  Users,
  Edit2,
  Trash2,
  Video,
} from "lucide-react";
import PopupEditEvent from "./PopupEditEvent";
import { useAuth } from "../../Hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const popupStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  topAccentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "65px",
    backgroundColor: "#5E1675",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    zIndex: -1,
  },
  container: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    width: "450px",
    padding: "24px",
    transform: "scale(0.95)",
    opacity: 0,
    transition: "all 0.3s ease-out",
    overflow: "hidden",
  },
  containerActive: {
    transform: "scale(1)",
    opacity: 1,
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "none",
    border: "1px solid transparent",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "8px",
    transition: "all 0.2s ease",
  },
  closeButtonHover: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  eventHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  colorDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  eventTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#5E1675",
  },
  eventInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  infoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px",
    borderRadius: "8px",
    transition: "background-color 0.2s ease",
  },
  infoSectionHover: {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  infoIcon: {
    color: "#5f6368",
  },
  infoLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
  },
  infoContent: {
    fontSize: "15px",
    color: "#1a1a1a",
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flex: 1,
    padding: "10px 16px",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "white",
  },
  primaryButton: {
    backgroundColor: "#1a73e8",
    color: "white",
    borderColor: "transparent",
  },
  secondaryButton: {
    color: "#1a73e8",
    backgroundColor: "rgba(26, 115, 232, 0.1)",
  },
  deleteButton: {
    color: "#d93025",
    backgroundColor: "rgba(217, 48, 37, 0.1)",
  },
};

export const EventDetailsPopup = ({
  event,
  onClose,
  onDelete,
  backgroundColor,
  eventId,
  refreshEvents,
  dataMeeting,
}) => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [isHovered, setIsHovered] = useState({
    closeButton: false,
    infoSection: false,
  });
  const user = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.10.10/Utilisateur/AllAvocat/ListeAvocat"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const transformedData = data.map((item) => ({
          name: item.m_Description,
          email: item.m_emailbarreau,
        }));

        setCollaborators(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const meetingDetails = dataMeeting[0];

  const isOrganizer = meetingDetails?.role === "organisateur";

  const handleDelete = async () => {
    if (!eventId) {
      alert("Custom Event ID is missing. Unable to delete the event.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action is irreversible."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.10.10/Utilisateur/api/meetings/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const formattedTime = formatTime(meetingDetails.heureDebut);
        const formattedDate = formatDate(meetingDetails.date);

        for (const collaborator of collaborators) {
          const emailData = {
            sEmailRecepteur: collaborator.email,
            sID: meetingDetails.idMeeting,
            sFullName: collaborator.name,
            sHeureDebut: formattedTime,
            sDate: formattedDate,
            sOrdreDuJour: meetingDetails.ordreDuJour,
          };

          const emailResponse = await fetch(
            "http://192.168.10.10/Utilisateur/api/email/deleteInvitation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(emailData),
            }
          );

          if (!emailResponse.ok) {
            throw new Error(
              `Failed to send deletion email to ${collaborator.email}`
            );
          }

          console.log(`Email sent to ${collaborator.email}`);
        }

        alert("Event deleted successfully.");
        onDelete(event);
        onClose();
      } else {
        alert("Failed to delete the event.");
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  };

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}Z`);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();

    return `${hours.toString().padStart(2, "0")}h${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleEditEvent = () => {
    setShowEdit(true);
  };
  console.log(meetingDetails);

  return (
    <>
      <div style={popupStyles.overlay}>
        <div
          style={{
            ...popupStyles.container,
            ...(showEdit ? {} : popupStyles.containerActive),
          }}
        >
          <div style={popupStyles.topAccentLine} />
          <button
            style={{
              ...popupStyles.closeButton,
              ...(isHovered.closeButton ? popupStyles.closeButtonHover : {}),
            }}
            onClick={onClose}
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, closeButton: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, closeButton: false }))
            }
          >
            <X size={20} style={{ color: "white" }} />
          </button>

          <div style={popupStyles.eventHeader}>
            <div
              style={{
                ...popupStyles.colorDot,
                backgroundColor: backgroundColor || "#1a73e8",
                color: "white",
              }}
            />
            <h2 style={popupStyles.eventTitle}>{meetingDetails.titre}</h2>
          </div>

          <div style={popupStyles.eventInfo}>
            <div
              style={{
                ...popupStyles.infoSection,
                ...(isHovered.infoSection ? popupStyles.infoSectionHover : {}),
              }}
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, infoSection: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, infoSection: false }))
              }
            >
              <Calendar size={20} style={popupStyles.infoIcon} />
              <div>
                <h3 style={popupStyles.infoLabel}>Date et heure</h3>
                <p style={popupStyles.infoContent}>
                  {new Date(meetingDetails.date).toLocaleString([], {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {meetingDetails.lienVisio && (
              <div style={popupStyles.infoSection}>
                <Video size={20} style={popupStyles.infoIcon} />
                <div>
                  <h3 style={popupStyles.infoLabel}>Lien de la réunion</h3>
                  <p style={popupStyles.infoContent}>
                    {meetingDetails.lienVisio}
                  </p>
                </div>
              </div>
            )}

            {meetingDetails.ordreDuJour && (
              <div style={popupStyles.infoSection}>
                <Clock size={20} style={popupStyles.infoIcon} />
                <div>
                  <h3 style={popupStyles.infoLabel}>Ordre du jour</h3>
                  <p style={popupStyles.infoContent}>
                    {meetingDetails.ordreDuJour}
                  </p>
                </div>
              </div>
            )}

            {meetingDetails.participant && (
              <div style={popupStyles.infoSection}>
                <Users size={20} style={popupStyles.infoIcon} />
                <div>
                  <h3 style={popupStyles.infoLabel}>Participant</h3>
                  <p style={popupStyles.infoContent}>
                    {meetingDetails.participant}
                  </p>
                </div>
              </div>
            )}
          </div>

          {isOrganizer && (
            <div style={popupStyles.buttonContainer}>
              <button
                style={{
                  ...popupStyles.actionButton,
                  ...popupStyles.secondaryButton,
                }}
                onClick={handleEditEvent}
              >
                <Edit2 size={16} /> Modifier
              </button>
              <button
                style={{
                  ...popupStyles.actionButton,
                  ...popupStyles.primaryButton,
                }}
                onClick={() => navigate("/testjisti")}
              >
                <Video size={16} /> Lancer réunion
              </button>
              <button
                style={{
                  ...popupStyles.actionButton,
                  ...popupStyles.deleteButton,
                }}
                onClick={handleDelete}
              >
                <Trash2 size={16} /> Supprimer
              </button>
            </div>
          )}
        </div>
        {showEdit && (
          <PopupEditEvent
            onClose={() => {
              setShowEdit(false);
              onClose();
            }}
            meetingData={dataMeeting}
            eventId={eventId}
            refreshEvents={refreshEvents}
          />
        )}
      </div>
    </>
  );
};
