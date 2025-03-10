import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaChevronLeft, FaChevronRight, FaCalendarDay } from "react-icons/fa";
import "../../Styles/Reunion/DashboardCalendar.css";
const Aside = () => {

  const [currentMonth, setCurrentMonth] = useState("");

  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setCurrentMonth(
        calendarApi.getDate().toLocaleString("default", { month: "long" })
      );
    }
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const goToToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      updateMonth();
    }
  };

  const goToNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      updateMonth();
    }
  };

  const goToPrevious = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      updateMonth();
    }
  };

  const updateMonth = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const month = calendarApi
        .getDate()
        .toLocaleString("default", { month: "long" });
      setCurrentMonth(month);
    }
  };

  return (
    <aside
      style={{
        display: "flex",
        width: "25vw",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="p-4 h-[96vh]"
    >
      <div className="aside-calendar">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mt-4 mb-4"
        >
          <div style={{ display: "flex" }}>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-[#5E1675] text-white rounded-md flex items-center justify-center"
            >
              <FaCalendarDay className="text-lg animate-bounce" />
            </button>
            <div className="text-lg font-bold ml-2 text-center mb-2 text-xl">
              {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <button
              onClick={goToPrevious}
              className="px-2 py-2  rounded-md flex items-center justify-center"
            >
              <FaChevronLeft className="text-lg animate-pulse" />
            </button>

            <button
              onClick={goToNext}
              className="px-2 py-2 ml-4 rounded-md flex items-center justify-center"
            >
              <FaChevronRight className="text-lg animate-pulse" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative mb-4">
            <FullCalendar
              ref={calendarRef}
              height="600px"
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={reunions.map((reunion) => ({
                title: reunion.titre,
                date: reunion.date,
                color:
                  reunion.date === getCurrentDate() ? "#4CAF50" : "#1976D2",
              }))}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
              }}
              dayCellClassNames={({ date }) =>
                date.toISOString().split("T")[0] === getCurrentDate()
                  ? "bg-blue-500 text-white rounded-full"
                  : "text-gray-600"
              }
              eventsClassNames="text-white bg-blue-500 rounded-lg"
              eventContent={(eventInfo) => (
                <div className="text-sm text-white">
                  <span>{eventInfo.event.title}</span>
                </div>
              )}
              headerToolbarClassNames="bg-gray-800 text-white p-2"
              buttonText={{
                today: "",
                prev: "",
                next: "",
              }}
              contentHeight="auto"
              stickyHeaderDates={false}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 min-w-50vh">
        <h3 className="text-xl font-semibold">Réunions à venir</h3>
        <ul className="mt-2 space-y-3">
          {reunions.map((reunion, index) => {
            const isToday = reunion.date === getCurrentDate();
            return (
              <li
                key={index}
                className={`p-3 rounded-lg ${
                  isToday ? "bg-yellow-200" : "bg-gray-200"
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-md font-medium">{reunion.titre}</span>
                  <span className="text-sm text-gray-600">{reunion.date}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
