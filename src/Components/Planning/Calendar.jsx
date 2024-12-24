import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MoreHorizontal,
} from "lucide-react";

const CalendarPlan = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");

  const events = [
    {
      id: 1,
      title: "Meeting with friends",
      description: "Meet-Up for Travel Destination Discussion",
      date: "Jan 10, 2024",
      time: "10:00 - 11:00",
      color: "purple",
    },
    {
      id: 2,
      title: "Visiting online course",
      description: "Checks updates for design course",
      date: "Jan 10, 2024",
      time: "05:40 - 13:00",
      color: "sky",
    },
    {
      id: 3,
      title: "Development meet",
      description: "Discussion with developer for upcoming project",
      date: "Jan 14, 2024",
      time: "10:00 - 11:00",
      color: "emerald",
    },
  ];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const prevMonthDays = firstDay.getDay();
    const prevMonth = new Date(year, month, 0);
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="relative bg-stone-50">
      <div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
      <div className="bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
      <div className="bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
      <div className="w-full py-24 relative z-10 backdrop-blur-3xl">
        <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
          <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
            <div className="col-span-12 xl:col-span-5">
              <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
                Upcoming Events
              </h2>
              <p className="text-lg font-normal text-gray-600 mb-8">
                Don't miss schedule
              </p>
              <div className="flex gap-5 flex-col">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-xl bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full bg-${event.color}-600`}
                        ></span>
                        <p className="text-base font-medium text-gray-900">
                          {event.date} - {event.time}
                        </p>
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">
                      {event.title}
                    </h6>
                    <p className="text-base font-normal text-gray-600">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <h5 className="text-xl leading-8 font-semibold text-gray-900">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h5>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        setCurrentDate(
                          new Date(
                            currentDate.setMonth(currentDate.getMonth() - 1)
                          )
                        )
                      }
                      className="p-2 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentDate(
                          new Date(
                            currentDate.setMonth(currentDate.getMonth() + 1)
                          )
                        )
                      }
                      className="p-2 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center rounded-md p-1 bg-indigo-50 gap-px">
                  <button
                    onClick={() => setViewMode("day")}
                    className={`py-2.5 px-5 rounded-lg ${
                      viewMode === "day"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600"
                    } text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setViewMode("week")}
                    className={`py-2.5 px-5 rounded-lg ${
                      viewMode === "week"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600"
                    } text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode("month")}
                    className={`py-2.5 px-5 rounded-lg ${
                      viewMode === "month"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600"
                    } text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white`}
                  >
                    Month
                  </button>
                </div>
              </div>

              <div className="border border-indigo-200 rounded-xl">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                      <div
                        key={day}
                        className={`py-3.5 ${index !== 6 ? "border-r" : ""} ${
                          index === 0 ? "rounded-tl-xl" : ""
                        } ${
                          index === 6 ? "rounded-tr-xl" : ""
                        } border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600`}
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 rounded-b-xl">
                  {getDaysInMonth().map((day, index) => {
                    const today = new Date();
                    const isToday =
                      day.isCurrentMonth &&
                      day.day === today.getDate() &&
                      currentDate.getMonth() === today.getMonth() &&
                      currentDate.getFullYear() === today.getFullYear();

                    return (
                      <div
                        key={index}
                        className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative
                            ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"}
                            ${index % 7 !== 6 ? "border-r" : ""}
                            ${index < 35 ? "border-b" : ""}
                            border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer
                            ${
                              index >= 35 && index % 7 === 0
                                ? "rounded-bl-xl"
                                : ""
                            }
                            ${
                              index >= 35 && index % 7 === 6
                                ? "rounded-br-xl"
                                : ""
                            }`}
                      >
                        <span
                          className={`text-xs font-semibold ${
                            day.isCurrentMonth
                              ? isToday
                                ? "text-white bg-indigo-600 w-6 h-6 rounded-full flex items-center justify-center"
                                : "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {day.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarPlan;
