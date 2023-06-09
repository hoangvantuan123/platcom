import React, { useState, useEffect } from "react";
import Menu_item_ml10 from "./menu_item_ml10";
import Menu_item_ml64 from "./menu_item_ml64";
import "./css/styles.css";

export default function Aside_Sildebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prevState) => {
      const nextState = !prevState;
      sessionStorage.setItem("isOpen", JSON.stringify(nextState));
      return nextState;
    });
  };

  useEffect(() => {
    const storedIsOpen = sessionStorage.getItem("isOpen");
    if (storedIsOpen !== null) {
      setIsOpen(JSON.parse(storedIsOpen));
    }
  }, []);
  return (
    <div>
      <div className="bg-white h-screen w-64 border-r border-gray-200  translate-x-0 fixed top-0 left-0 z-40 transition-all duration-300 transform ">
        <Menu_item_ml64 />
      </div>
    </div>
  );
}
