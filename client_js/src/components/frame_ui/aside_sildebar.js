import React, { useState } from "react";
import Content from "./content";

import Menu_item_ml10 from "./menu_item_ml10";
import Menu_item_ml64 from "./menu_item_ml64";

export default function Aside_Sildebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className={`bg-white  h-screen w-64 border-r border-gray-200 fixed top-0 left-0 z-40 transition-all duration-300 transform ${
          isOpen ? "-translate-x-48" : "translate-x-0 "
        }`}
      >
        {isOpen ? (
          <Menu_item_ml10 isOpen={isOpen} />
        ) : (
          <Menu_item_ml64 idOpen={isOpen} />
        )}

        <div
          className="h-full w-4 absolute top-0 right-0 -mr-4 cursor-pointer"
          onClick={toggleSidebar}
        ></div>
      </div>
      <section
        className={`ml-10 transition-all duration-300 ${
          isOpen ? " ml-10 px-5" : "ml-64"
        }`}
      >
        <Content />
      </section>
    </div>
  );
}
