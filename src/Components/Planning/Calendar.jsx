import React from "react";
import "../../Styles/Reunion/DashboardCalendar.css";

const mockEvents = [
  {
    id: 1,
    title: "Design team daily meeting",
    time: "07:00 - 08:00",
    type: "yellow",
    attendees: ["user1.jpg", "user2.jpg", "user3.jpg"],
  },
  {
    id: 2,
    title: "Meeting with clients",
    time: "09:30 - 10:30",
    type: "blue",
    attendees: ["user2.jpg", "user4.jpg"],
  },
  {
    id: 3,
    title: "Proposal meeting",
    time: "08:00 - 09:00",
    type: "purple",
    attendees: ["user1.jpg", "user3.jpg", "user4.jpg"],
  },
];

const CalendarPlan = () => {
  return (
    <div className="calendar-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-info">
          <div className="user-avatar"></div>
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

      {/* Main Calendar Area */}
      <main className="calendar-main">
        <header className="calendar-header">
          <div className="calendar-controls">
            <button className="nav-btn">←</button>
            <span>Today</span>
            <button className="nav-btn">→</button>
          </div>

          <div className="view-options">
            <button className="view-option">Day</button>
            <button className="view-option active">Week</button>
            <button className="view-option">Month</button>
            <button className="view-option">Year</button>
          </div>

          <input type="text" className="search-bar" placeholder="Search..." />
        </header>

        <div className="calendar-grid">
          {/* Calendar Headers */}
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div key={day} className="calendar-header-cell">
              {day}
            </div>
          ))}

          {/* Calendar Cells */}
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="calendar-cell">
              {mockEvents.map((event) => (
                <div key={event.id} className={`event-card ${event.type}`}>
                  <span className="event-time">{event.time}</span>
                  <div className="event-title">{event.title}</div>
                  <div className="event-attendees">
                    {event.attendees.map((attendee, i) => (
                      <div key={i} className="attendee-avatar" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <button className="add-event-btn">+</button>
    </div>
  );
};

export default CalendarPlan;
