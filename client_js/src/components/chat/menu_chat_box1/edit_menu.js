import React, { useState } from "react";

const Edit_Menu = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setIsActive(false);
    }
  };

  return (
    <div className="relative">
      <div>
        <button
          onClick={toggleMenu}
          className="h-full p-2 text-gray-600  rounded-full hover:bg-gray-50 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
            className="h-4 w-4 opacity-60"
          >
            <g>
              <circle cx="256" cy="53.333" r="53.333" />
              <circle cx="256" cy="256" r="53.333" />
              <circle cx="256" cy="458.667" r="53.333" />
            </g>
          </svg>
        </button>
      </div>

      {isActive && (
        <div
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
          onClick={closeMenu}
          onKeyDown={handleEscapeKey}
          tabIndex={0}
        >
          <div className="p-2">
            <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
              General
            </strong>

            <a
              href="/"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              View on Storefront
            </a>

            <a
              href="/"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              View Warehouse Info
            </a>

            <a
              href="/"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              Duplicate Product
            </a>

            <a
              href="/"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              Unpublish Product
            </a>
          </div>

          <div className="p-2">
            <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
              Danger Zone
            </strong>

            <form method="POST" action="#">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit_Menu;
