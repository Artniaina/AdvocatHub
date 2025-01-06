import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import PopupEditEvent from "./PopupEditEvent";

const popupStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  container: {
    position: "relative",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgb(185, 182, 182)",
    width: "400px",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    padding: "4px",
    transition: "color 0.2s",
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
  },
  eventTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  eventInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  infoLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
  },
  infoContent: {
    fontSize: "16px",
    color: "#1a1a1a",
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  actionButton: {
    flex: 1,
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  editButton: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    color: "white",
  },
};

export const EventDetailsPopup = ({
  event,
  onClose,
  onDelete,
  backgroundColor,
  eventId,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  const [dataMeeting, setDataMeeting] = useState([]);

  const { extendedProps = {} } = event;

  useEffect(() => {
    if (!eventId) {
      console.error("No eventId provided. Unable to fetch event details.");
      return;
    }

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.10.10/Utilisateur/api/meetings/${eventId}`
        );

        if (response.ok) {
          const data = await response.json();
          setDataMeeting(data);
          console.log("Fetched event details:", data);
        } else {
          console.error(
            "Failed to fetch event details. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    console.log("Updated dataMeeting state:", dataMeeting);
  }, [dataMeeting]);

  const handleDelete = async () => {
    if (!eventId) {
      alert("Custom Event ID is missing. Unable to delete the event.");
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

  const handleEditEvent = () => {
    setShowEdit(true);
  };

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.backdrop} onClick={onClose} />
      <div
        style={{
          ...popupStyles.container,
          backgroundColor: backgroundColor || event.backgroundColor,
        }}
      >
        <button style={popupStyles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <div style={popupStyles.eventHeader}>
          <div
            style={{
              ...popupStyles.colorDot,
              backgroundColor: backgroundColor || event.backgroundColor,
            }}
          />
          <h2 style={popupStyles.eventTitle}>{event.title}</h2>
        </div>

        <div style={popupStyles.eventInfo}>
          <div style={popupStyles.infoSection}>
            <h3 style={popupStyles.infoLabel}>Time</h3>
            <p style={popupStyles.infoContent}>
              {new Date(event.start).toLocaleString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {new Date(event.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {extendedProps.location && (
            <div style={popupStyles.infoSection}>
              <h3 style={popupStyles.infoLabel}>Location</h3>
              <p style={popupStyles.infoContent}>{extendedProps.location}</p>
            </div>
          )}

          {extendedProps.description && (
            <div style={popupStyles.infoSection}>
              <h3 style={popupStyles.infoLabel}>Description</h3>
              <p style={popupStyles.infoContent}>{extendedProps.description}</p>
            </div>
          )}
        </div>

        <div style={popupStyles.buttonContainer}>
          <button
            style={{ ...popupStyles.actionButton, ...popupStyles.editButton }}
            onClick={handleEditEvent}
          >
            Edit Event
          </button>
          <button
            style={{ ...popupStyles.actionButton, ...popupStyles.deleteButton }}
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </div>
      </div>
      {showEdit && (
  <PopupEditEvent
    onClose={() => {
      setShowEdit(false);
    }}
    meetingData={dataMeeting}
    eventId={eventId}
  />
)}

    </div>
  );
};
