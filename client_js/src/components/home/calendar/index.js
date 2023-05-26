import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";


const events = [{ title: "Meeting", start: new Date() }];

const Calendar_UI = () => {
  const calendarRef = useRef(null);

  // Hàm callback sau khi nạp thành công lịch
  const handleCalendarLoad = () => {
    
    // Tùy chỉnh giao diện
    const calendarApi = calendarRef.current.getApi();

    // Xoá HeaderToolbar
    calendarApi.setOption("headerToolbar", false);
    // Đặt màu sắc sự kiện
    calendarApi.setOption("eventColor", "red");

    // Đặt kích thước chữ cho tiêu đề sự kiện
    calendarApi.setOption("eventTitleFontSize", 14);

    // Đặt màu nền cho tiêu đề tháng
    calendarApi.setOption("headerToolbar", {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    });

    // Đặt màu sắc nền cho các ngày cuối tuần
    calendarApi.setOption("dayCellDidMount", (arg) => {
      const { date } = arg;
      const day = date.getDay();

      if (day === 0 || day === 6) {
        arg.el.style.backgroundColor = "lightgray";
      }
    });
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        hiddenDays={[0, 6]}
        events={events}
        onLoad={handleCalendarLoad}
      />
    </div>
  );
};

export default Calendar_UI;
