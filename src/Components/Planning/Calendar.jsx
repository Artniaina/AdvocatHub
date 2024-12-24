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
    <section className="tw-relative tw-bg-stone-50">
      <div className="tw-bg-sky-400 tw-w-full sm:tw-w-40 tw-h-40 tw-rounded-full tw-absolute tw-top-1 tw-opacity-20 max-sm:tw-right-0 sm:tw-left-56 tw-z-0"></div>
      <div className="tw-bg-emerald-500 tw-w-full sm:tw-w-40 tw-h-24 tw-absolute tw-top-0 -tw-left-0 tw-opacity-20 tw-z-0"></div>
      <div className="tw-bg-purple-600 tw-w-full sm:tw-w-40 tw-h-24 tw-absolute tw-top-40 -tw-left-0 tw-opacity-20 tw-z-0"></div>
      <div className="tw-w-full tw-py-24 tw-relative tw-z-10 tw-backdrop-blur-3xl">
        <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-px-2 lg:tw-px-8">
          <div className="tw-grid tw-grid-cols-12 tw-gap-8 tw-max-w-4xl tw-mx-auto xl:tw-max-w-full">
            <div className="tw-col-span-12 xl:tw-col-span-5">
              <h2 className="tw-font-manrope tw-text-3xl tw-leading-tight tw-text-gray-900 tw-mb-1.5">
                Upcoming Events
              </h2>
              <p className="tw-text-lg tw-font-normal tw-text-gray-600 tw-mb-8">
                Don't miss schedule
              </p>
              <div className="tw-flex tw-gap-5 tw-flex-col">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="tw-p-6 tw-rounded-xl tw-bg-white tw-shadow-sm"
                  >
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-3">
                      <div className="tw-flex tw-items-center tw-gap-2.5">
                        <span
                          className={`tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-${event.color}-600`}
                        ></span>
                        <p className="tw-text-base tw-font-medium tw-text-gray-900">
                          {event.date} - {event.time}
                        </p>
                      </div>
                      <button className="tw-p-2 tw-rounded-full hover:tw-bg-gray-100 tw-transition-colors">
                        <MoreHorizontal className="tw-h-4 tw-w-4" />
                      </button>
                    </div>
                    <h6 className="tw-text-xl tw-leading-8 tw-font-semibold tw-text-black tw-mb-1">
                      {event.title}
                    </h6>
                    <p className="tw-text-base tw-font-normal tw-text-gray-600">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tw-col-span-12 xl:tw-col-span-7 tw-px-2.5 tw-py-5 sm:tw-p-8 tw-bg-gradient-to-b from-white/25 to-white xl:tw-bg-white tw-rounded-2xl max-xl:row-start-1">
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-items-center tw-justify-between tw-mb-5">
                <div className="tw-flex tw-items-center tw-gap-4">
                  <h5 className="tw-text-xl tw-leading-8 tw-font-semibold tw-text-gray-900">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h5>
                  <div className="tw-flex tw-items-center">
                    <button
                      onClick={() =>
                        setCurrentDate(
                          new Date(
                            currentDate.setMonth(currentDate.getMonth() - 1)
                          )
                        )
                      }
                      className="tw-p-2 tw-text-indigo-600 hover:tw-bg-indigo-600 hover:tw-text-white tw-rounded tw-transition-colors"
                    >
                      <ChevronLeft className="tw-h-4 tw-w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentDate(
                          new Date(
                            currentDate.setMonth(currentDate.getMonth() + 1)
                          )
                        )
                      }
                      className="tw-p-2 tw-text-indigo-600 hover:tw-bg-indigo-600 hover:tw-text-white tw-rounded tw-transition-colors"
                    >
                      <ChevronRight className="tw-h-4 tw-w-4" />
                    </button>
                  </div>
                </div>
                <div className="tw-flex tw-items-center tw-rounded-md tw-p-1 tw-bg-indigo-50 tw-gap-px">
                  <button
                    onClick={() => setViewMode("day")}
                    className={`tw-py-2.5 tw-px-5 tw-rounded-lg ${
                      viewMode === "day"
                        ? "tw-bg-indigo-600 tw-text-white"
                        : "tw-bg-indigo-50 tw-text-indigo-600"
                    } tw-text-sm tw-font-medium tw-transition-all tw-duration-300 hover:tw-bg-indigo-600 hover:tw-text-white`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setViewMode("week")}
                    className={`tw-py-2.5 tw-px-5 tw-rounded-lg ${
                      viewMode === "week"
                        ? "tw-bg-indigo-600 tw-text-white"
                        : "tw-bg-indigo-50 tw-text-indigo-600"
                    } tw-text-sm tw-font-medium tw-transition-all tw-duration-300 hover:tw-bg-indigo-600 hover:tw-text-white`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode("month")}
                    className={`tw-py-2.5 tw-px-5 tw-rounded-lg ${
                      viewMode === "month"
                        ? "tw-bg-indigo-600 tw-text-white"
                        : "tw-bg-indigo-50 tw-text-indigo-600"
                    } tw-text-sm tw-font-medium tw-transition-all tw-duration-300 hover:tw-bg-indigo-600 hover:tw-text-white`}
                  >
                    Month
                  </button>
                </div>
              </div>

              <div className="tw-border tw-border-indigo-200 tw-rounded-xl">
                <div className="tw-grid tw-grid-cols-7 tw-rounded-t-3xl tw-border-b tw-border-indigo-200">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                      <div
                        key={day}
                        className={`tw-py-3.5 ${
                          index !== 6 ? "tw-border-r" : ""
                        } ${index === 0 ? "tw-rounded-tl-xl" : ""} ${
                          index === 6 ? "tw-rounded-tr-xl" : ""
                        } tw-border-indigo-200 tw-bg-indigo-50 tw-flex tw-items-center tw-justify-center tw-text-sm tw-font-medium tw-text-indigo-600`}
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="tw-grid tw-grid-cols-7 tw-rounded-b-xl">
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
                        className={`tw-flex xl:tw-aspect-square max-xl:tw-min-h-[60px] tw-p-3.5 tw-relative
                            ${
                              day.isCurrentMonth
                                ? "tw-bg-white"
                                : "tw-bg-gray-50"
                            }
                            ${index % 7 !== 6 ? "tw-border-r" : ""}
                            ${index < 35 ? "tw-border-b" : ""}
                            tw-border-indigo-200 tw-transition-all tw-duration-300 hover:tw-bg-indigo-50 tw-cursor-pointer
                            ${
                              index >= 35 && index % 7 === 0
                                ? "tw-rounded-bl-xl"
                                : ""
                            }
                            ${
                              index >= 35 && index % 7 === 6
                                ? "tw-rounded-br-xl"
                                : ""
                            }`}
                      >
                        <span
                          className={`tw-text-xs tw-font-semibold ${
                            day.isCurrentMonth
                              ? isToday
                                ? "tw-text-white tw-bg-indigo-600 tw-w-6 tw-h-6 tw-rounded-full tw-flex tw-items-center tw-justify-center"
                                : "tw-text-gray-900"
                              : "tw-text-gray-400"
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
