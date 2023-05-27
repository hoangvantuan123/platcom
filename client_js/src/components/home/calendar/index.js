import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import styled from "styled-components";
import eventsData from "./events.json";
import CustomCalendar  from "./custom-calendar";

const Calendar_UI = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      timeZone: "UTC",
      views: {
        listDay: {
          buttonText: "list day",
          titleFormat: {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        },
      },
      headerToolbar: null,
      initialView: "listDay",
      weekNumbers: true,
      dayMaxEvents: true,
      events: eventsData,
      plugins: [listPlugin],
      locale: "en",
     
    });
    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div className="">
      <div className="container h-full  ">
        <CustomCalendar ref={calendarRef} />
      </div>
    </div>
  );
};

export default Calendar_UI;
