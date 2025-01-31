import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventPopup from "./PopupAddEvent";
import { EventDetailsPopup } from "./PopupEvent";
import "../../Styles/Reunion/DashboardCalendar.css";
import { useAuth } from "../../Hooks/AuthContext";
import Aside from "./Aside";

const CalendarPlan = () => {
  const { user } = useAuth();
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showDetailsEvent, setShowDetailsEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [dataMeeting, setDataMeeting] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventId = selectedEvent?.id;

  const fetchEventDetails = async (id) => {
    if (!id) {
      console.error("No eventId provided. Unable to fetch event details.");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.10.10/Utilisateur/api/meetings/${id}/${user?.email}`
      );

      if (response.ok) {
        const data = await response.json();
        setDataMeeting(data);
        return data;
      } else {
        console.error(
          "Failed to fetch event details. Status:",
          response.status
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      return null;
    }
  };

  const fetchEvents = async () => {
    if (loading) return;
    setLoading(true);

    const email = user?.email;
    try {
      const response = await fetch(
        `http://192.168.10.10/Utilisateur/api/userMeetings/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          id: event.idMeeting,
          title: event.titre,
          start: `${event.date}T${event.heureDebut}`,
          end: `${event.date}T${event.heureFin}`,
          location: event.location || "",
          description: event.ordreDuJour || "",
          extendedProps: {
            lienVisio: event.lienVisio || "",
            statut: event.statut || "",
            location: event.location || "",
            description: event.ordreDuJour || "",
          },
          editable: true,
          backgroundColor: "#D9B8E6",
          borderColor: "#ffff",
          textColor: "#000000",
          borderLeft: "10px solid #8E4CA2",
        }));

        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventId && showDetailsEvent) {
      fetchEventDetails(eventId);
    }
  }, [eventId, showDetailsEvent]);

  const handleEventClick = async (clickInfo) => {
    const id = clickInfo.event.id;
    await fetchEventDetails(id);
    setSelectedEvent(clickInfo.event);
    setShowDetailsEvent(true);
  };

  const handleClosePopup = async () => {
    setShowAddEvent(false);
    fetchEvents();
  };

  const handleCloseDetails = async () => {
    setShowDetailsEvent(false);
    setDataMeeting([]);
    fetchEvents();
  };

  const handleDeleteEvent = async (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
    setSelectedEvent(null);
    setDataMeeting([]);
    fetchEvents();
  };

  const handleAddEvent = async (newEvent) => {
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
    fetchEvents();
  };

  const handleDatesSet = (arg) => {
    const month = arg.view.title;
    setCurrentMonth(month);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1}}>
        <Aside 
        events ={events}
        dataMeeting={dataMeeting}
        />
      </div>
      <div style={{ flex: 4 }}>
        {" "}
        <div className="dashboard-container">
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
                  const endTime = new Date(
                    eventInfo.event.end
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <div className="fc-event-main-content">
                      <div className="fc-event-title">
                        {eventInfo.event.title}
                      </div>
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
                  info.el.style.borderLeft = "9px solid #8E4CA2";
                }}
                datesSet={handleDatesSet}
              />
            </div>
          </main>

          {selectedEvent && showDetailsEvent && (
            <EventDetailsPopup
              dataMeeting={dataMeeting}
              event={selectedEvent}
              eventId={selectedEvent ? selectedEvent.id : null}
              backgroundColor={selectedEvent.extendedProps.backgroundColor}
              onClose={handleCloseDetails}
              onDelete={handleDeleteEvent}
              refreshEvents={fetchEvents}
            />
          )}

          {showAddEvent && (
            <AddEventPopup
              onClose={handleClosePopup}
              onEventCreated={handleAddEvent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPlan;
