import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";

export default function Clock() {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [time, setTime] = useState(moment().format("LTS")); // Lấy thời gian hiện tại
  const [date, setDate] = useState(moment().format("LL")); // Lấy ngày hiện tại
  const [dayOfWeek, setDayOfWeek] = useState(
    capitalizeFirstLetter(moment().format("dddd"))
  ); // Lấy thứ hiện tại và viết hoa chữ cái đầu tiên

  useEffect(() => {
    const interval = setInterval(() => {
      // Cập nhật thời gian mỗi giây
      setTime(moment().format("LTS"));
      setDate(moment().format("LL"));
      setDayOfWeek(capitalizeFirstLetter(moment().format("dddd")));
    }, 1000);

    return () => {
      clearInterval(interval); // Hủy interval khi component bị unmount
    };
  }, []);

  return (
    <div className=" flex flex-col p-2 rounded-lg w-full border border-gray-100 bg-white shadow-sm transition">
      <h1 className="text-lg font-bold mb-4">{time}</h1>
      <p className="text-lg">{date}</p>
      <p className="text-xl">{dayOfWeek}</p>
    </div>
  );
}
