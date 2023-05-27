import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import "./css/style.css"
export default function Calendar_UI() {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      timeZone: "UTC",
      themeSystem: "bootstrap5",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      },
      weekNumbers: true,
      dayMaxEvents: true,
      events: "https://fullcalendar.io/api/demo-feeds/events.json",
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      locale: "en", // Đặt ngôn ngữ mặc định là 
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <div ref={calendarRef} />
    </div>
  );
}
