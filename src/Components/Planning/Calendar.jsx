import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AddEventPopup } from "./PopupAddEvent";
import { EventDetailsPopup } from "./PopupEvent";
import "../../Styles/Reunion/DashboardCalendar.css";

const CalendarPlan = () => {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Hello",
      start: new Date("2024-12-30T09:00:00").toISOString(),
      end: new Date("2024-12-30T10:00:00").toISOString(),
      backgroundColor: "#FFD700",
      allDay: false,
      extendedProps: {
        description: "Daily sync with design team",
        location: "Meeting Room A",
      },
    },
    {
      id: 2,
      title: "Meeting with clients",
      start: new Date("2024-12-30T11:30:00").toISOString(),
      end: new Date("2024-12-30T12:30:00").toISOString(),
      backgroundColor: "#1E90FF",
      allDay: false,
      extendedProps: {
        description: "Client review meeting",
        location: "Virtual",
      },
    },
    {
      id: 3,
      title: "Proposal meeting",
      start: new Date("2024-12-30T14:00:00").toISOString(),
      end: new Date("2024-12-30T15:00:00").toISOString(),
      backgroundColor: "#9370DB",
      allDay: false,
      extendedProps: {
        description: "Review new project proposal",
        location: "Conference Room B",
      },
    },
    {
      id: 4,
      title: "Team wrap-up meeting",
      start: new Date("2024-12-30T16:00:00").toISOString(),
      end: new Date("2024-12-30T17:00:00").toISOString(),
      backgroundColor: "#32CD32",
      allDay: false,
      extendedProps: {
        description: "Daily team wrap-up",
        location: "Meeting Room C",
      },
    },
  ]);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setShowAddEvent(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(null);
    setEditingEvent(event);
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
    setSelectedEvent(null);
  };

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      extendedProps: {
        description: eventData.description,
        location: eventData.location,
      },
    };
    setEvents([...events, newEvent]);
  };

  const handleUpdateEvent = (eventData) => {
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id
        ? {
            ...eventData,
            id: event.id,
            extendedProps: {
              description: eventData.description,
              location: eventData.location,
            },
          }
        : event
    );
    setEvents(updatedEvents);
    setEditingEvent(null);
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
              setEditingEvent({
                start: selectInfo.start.toISOString(),
                end: defaultEndTime.toISOString(),
                title: "",
                backgroundColor: "#1E90FF",
                location: "",
                description: "",
              });
            }}
            headerToolbar={false}
            views={{
              timeGridWeek: {
                slotMinTime: "08:00:00",
                slotMaxTime: "20:00:00",
                slotDuration: "00:30:00",
                slotLabelInterval: "01:00:00",
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
                slotLabelFormat: {
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: "short",
                },
              },
            }}
            eventContent={(eventInfo) => {
              return (
                <div className="fc-event-main-content">
                  <div className="fc-event-title">{eventInfo.event.title}</div>
                  {(eventInfo.view.type === "timeGridWeek" ||
                    eventInfo.view.type === "timeGridDay") && (
                    <div className="fc-event-time">
                      {new Date(eventInfo.event.start).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              );
            }}
            datesSet={handleDatesSet}
          />
        </div>
      </main>
      <button 
        className="add-event-btn" 
        onClick={() => {
          
          setShowAddEvent(true); 
          setEditingEvent({
            
            start: new Date().toISOString(), 
            end: new Date(
              new Date().setHours(new Date().getHours() + 1)
            ).toISOString(), 
            title: "",
            backgroundColor: "#1E90FF", 
            location: "", 
            description: "",
          }); 
        }} 
      >
         Ajouter un événement
      </button>
      <button
        className="add-event-btn"
        onClick={() => {
          setShowAddEvent(true);
          setEditingEvent(null);
        }}
      >
        +
      </button>
      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={handleClosePopup}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
      {(showAddEvent || editingEvent) && (
        <AddEventPopup
          event={editingEvent}
          onClose={handleClosePopup}
          onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
        />
      )}
    </div>
  );
};

export default CalendarPlan;
