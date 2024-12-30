import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../Styles/Reunion/DashboardCalendar.css";

const mockEvents = [
  {
    id: 1,
    title: "Design team daily meeting",
    start: "2024-12-30T07:00:00",
    end: "2024-12-30T08:00:00",
    backgroundColor: "#FFD700",
  },
  {
    id: 2,
    title: "Meeting with clients",
    start: "2024-12-30T09:30:00",
    end: "2024-12-30T10:30:00",
    backgroundColor: "#1E90FF",
  },
  {
    id: 3,
    title: "Proposal meeting",
    start: "2024-12-31T08:00:00",
    end: "2024-12-31T09:00:00",
    backgroundColor: "#9370DB",
  },
];

const CalendarPlan = () => {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");

  // Update the current month whenever the view changes
  const handleDatesSet = (arg) => {
    const month = arg.view.title; // Get the month and year from the calendar view title
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

  const handleYearViewClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("dayGridYear");
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
            <button className="nav-btn" onClick={handleYearViewClick}>
              Year View
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
            initialView="dayGridMonth"
            events={mockEvents}
            editable={true}
            selectable={true}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,dayGridYear",
            }}
            titleFormat={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
            datesSet={handleDatesSet}
          />
        </div>
      </main>

      <button className="add-event-btn">+</button>
    </div>
  );
};

export default CalendarPlan;
