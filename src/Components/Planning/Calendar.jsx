import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../Styles/Reunion/DashboardCalendar.css";

const CalendarPlan = () => {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");

  const mockEvents = [
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
  ];

  const handleDatesSet = (arg) => {
    const month = arg.view.title;
    setCurrentMonth(month);
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const handleMonthViewClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("dayGridMonth");
  };

  const handleWeekViewClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek");
  };

  const handleDayViewClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridDay");
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
            <button className="nav-btn" onClick={handlePrevClick}>
              &larr;
            </button>
            <button className="nav-btn" onClick={handleTodayClick}>
              Today
            </button>
            <button className="nav-btn" onClick={handleNextClick}>
              &rarr;
            </button>
            <button className="nav-btn" onClick={handleMonthViewClick}>
              Month View
            </button>
            <button className="nav-btn" onClick={handleWeekViewClick}>
              Week View
            </button>
            <button className="nav-btn" onClick={handleDayViewClick}>
              Day View
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
            events={mockEvents}
            timeZone="local"
            editable={true}
            selectable={true}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
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
          />{" "}
        </div>
      </main>

      <button className="add-event-btn">+</button>
    </div>
  );
};

export default CalendarPlan;
