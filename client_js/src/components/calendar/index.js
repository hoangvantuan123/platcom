import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const events = [{ title: "Meeting", start: new Date() }];
// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
export default function Calendar_UI() {
  const calendarRef = useRef(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handleMonthViewClick = () => {
    setCurrentView("dayGridMonth");
    calendarRef.current.getApi().changeView("dayGridMonth");
  };

  const handleWeekViewClick = () => {
    setCurrentView("timeGridWeek");
    calendarRef.current.getApi().changeView("timeGridWeek");
  };

  const handleDayViewClick = () => {
    setCurrentView("timeGridDay");
    calendarRef.current.getApi().changeView("timeGridDay");
  };
  return (
    <div className="flex flex-col">
      <div className="gap-3">
        <button onClick={handleMonthViewClick}>Tháng</button>
        <button onClick={handleWeekViewClick}>Tuần</button>
        <button onClick={handleDayViewClick}>Ngày</button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={currentView}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}
