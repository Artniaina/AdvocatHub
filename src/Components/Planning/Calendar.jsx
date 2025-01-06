import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventPopup from "./PopupAddEvent";
import PopupEditEvent from "./PopupEditEvent";
import { EventDetailsPopup } from "./PopupEvent";
import "../../Styles/Reunion/DashboardCalendar.css";

const CalendarPlan = () => {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  console.log("selectedevent", selectedEvent);
  console.log("events:", events);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://192.168.10.10/Utilisateur/api/meetings"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);

        const formattedEvents = data.map((event) => ({
          id: event.idMeeting,
          title: event.titre,
          start: `${event.date}T${event.heureDebut}`,
          end: `${event.date}T${event.heureFin}`,
          location: event.location || "", // Provide default empty string
          description: event.ordreDuJour || "", // Provide default empty string
          extendedProps: {
            lienVisio: event.lienVisio || "",
            statut: event.statut || "",
            location: event.location || "", // Include location in extendedProps
            description: event.ordreDuJour || "", // Include description in extendedProps
          },
          editable: true,
          backgroundColor: "#1E90FF", // Provide default color
          borderColor: "#1E90FF", // Provide default color
          textColor: "#FFFFFF", // Provide default text color
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setShowAddEvent(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
    setSelectedEvent(null);
  };

  const handleAddEvent = (newEvent) => {
    const formattedNewEvent = {
      ...newEvent,
      extendedProps: {
        location: newEvent.location || "",
        description: newEvent.description || "",
        lienVisio: newEvent.lienVisio || "",
        statut: newEvent.statut || "",
      },
      editable: true,
    };
    setEvents((prevEvents) => [...prevEvents, formattedNewEvent]);
  };

  const handleDatesSet = (arg) => {
    const month = arg.view.title;
    setCurrentMonth(month);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-info">
          <div className="user-avatar" />
          <span className="user-name">Hana Smith</span>
        </div>
        <nav className="nav-menu">
          <div className="nav-item active">
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <span>Overview</span>
          </div>
          <div className="nav-item">
            <span>Calendar</span>
          </div>
          <div className="nav-item">
            <span>To-do list</span>
          </div>
          <div className="nav-item">
            <span>Team</span>
          </div>
        </nav>
      </aside>
      <main className="calendar-main">
        <header className="calendar-header">
          <div className="calendar-controls">
            <button
              className="nav-btn"
              onClick={() => {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.prev();
              }}
            >
              &larr;
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.today();
              }}
            >
              Today
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.next();
              }}
            >
              &rarr;
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.changeView("dayGridMonth");
              }}
            >
              Month
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.changeView("timeGridWeek");
              }}
            >
              Week
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.changeView("timeGridDay");
              }}
            >
              Day
            </button>
          </div>

          <div className="calendar-month">
            <span>
              <strong>{currentMonth}</strong>
            </span>
          </div>

          <div>
            <button
              className="add-event-btn"
              onClick={() => {
                setShowAddEvent(true);
              }}
            >
              +
            </button>
          </div>
        </header>

        <div className="calendar-wrapper">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={events}
            timeZone="local"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            select={(selectInfo) => {
              setShowAddEvent(true);
              const defaultEndTime = new Date(selectInfo.end);
              defaultEndTime.setHours(defaultEndTime.getHours() + 1);
            }}
            headerToolbar={false}
            views={{
              dayGridMonth: {
                eventDisplay: "block",
                dayMaxEvents: true,
              },
              timeGridWeek: {
                slotMinTime: "08:00:00",
                slotMaxTime: "20:00:00",
                slotDuration: "00:30:00",
                slotLabelInterval: "01:00:00",
                displayEventEnd: true,
                slotLabelFormat: {
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                },
              },
              timeGridDay: {
                slotMinTime: "08:00:00",
                slotMaxTime: "20:00:00",
                slotDuration: "00:30:00",
                slotLabelInterval: "01:00:00",
                displayEventEnd: true,
                slotLabelFormat: {
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                },
              },
            }}
            eventContent={(eventInfo) => {
              const startTime = new Date(
                eventInfo.event.start
              ).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              });
              const endTime = new Date(eventInfo.event.end).toLocaleTimeString(
                [],
                {
                  hour: "numeric",
                  minute: "2-digit",
                }
              );

              return (
                <div className="fc-event-main-content">
                  <div className="fc-event-title">{eventInfo.event.title}</div>
                  {eventInfo.view.type !== "dayGridMonth" && (
                    <>
                      <div className="fc-event-time">
                        {startTime} - {endTime}
                      </div>
                      <div className="fc-event-location">
                        {eventInfo.event.extendedProps.location}
                      </div>
                    </>
                  )}
                </div>
              );
            }}
            eventDidMount={(info) => {
              const darkPurple = `rgb(${
                Math.floor(Math.random() * 56) + 100
              }, ${Math.floor(Math.random() * 56) + 50}, ${
                Math.floor(Math.random() * 56) + 100
              })`;

              const darkBlue = `rgb(${Math.floor(Math.random() * 56) + 50}, ${
                Math.floor(Math.random() * 56) + 50
              }, ${Math.floor(Math.random() * 56) + 100})`;

              const darkGrey = `rgb(${Math.floor(Math.random() * 56) + 100}, ${
                Math.floor(Math.random() * 56) + 100
              }, ${Math.floor(Math.random() * 56) + 100})`;

              const darkBrown = `rgb(${Math.floor(Math.random() * 40) + 90}, ${
                Math.floor(Math.random() * 40) + 60
              }, ${Math.floor(Math.random() * 40) + 30})`;

              const randomColor = [darkPurple, darkBlue, darkGrey, darkBrown][
                Math.floor(Math.random() * 4)
              ];

              const borderColor = randomColor;

              info.el.style.backgroundColor = randomColor;
              info.el.style.border = `1.5px solid ${borderColor}`;
              info.el.style.borderRadius = "12px";
              info.el.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              info.el.style.padding = "6px";
              info.el.style.transition = "all 0.3s ease-in-out";
              info.el.style.cursor = "pointer";

              info.el.onmouseenter = () => {
                info.el.style.transform = "scale(1.05)";
                info.el.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
              };
              info.el.onmouseleave = () => {
                info.el.style.transform = "scale(1)";
                info.el.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              };

              info.event.setExtendedProp("backgroundColor", randomColor);
            }}
            datesSet={handleDatesSet}
          />
        </div>
      </main>
      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          eventId={selectedEvent.id}
          backgroundColor={selectedEvent.extendedProps.backgroundColor}
          onClose={handleClosePopup}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {showAddEvent && (
        <AddEventPopup
          onClose={handleClosePopup}
          onEventCreated={handleAddEvent}
        />
      )}
    </div>
  );
};

export default CalendarPlan;
