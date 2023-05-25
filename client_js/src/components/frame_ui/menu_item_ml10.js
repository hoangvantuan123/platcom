import React, { useEffect, useState } from "react";
import "./css/styles.css";
export default function Menu_item_ml10() {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const storedItem = localStorage.getItem("activeItem");
    if (storedItem) {
      setActiveItem(storedItem);
    }
  }, []);

  const handleClick = (menuItem) => {
    setActiveItem(menuItem);
    localStorage.setItem("activeItem", menuItem);
  };
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white transform translate-x-48 overflow-x-hidden">
      <div className=" flex-1 overflow-y-auto scroll-container">
        <div>
          <div className="inline-flex h-16 w-16 items-center justify-center">
            <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                className=" h-6 w-6 opacity-90"
              >
                <path d="M5.972,22.285a1,1,0,0,1-.515-1.857C9,18.3,9,13.73,9,11a3,3,0,0,1,6,0,1,1,0,0,1-2,0,1,1,0,0,0-2,0c0,2.947,0,8.434-4.514,11.143A1,1,0,0,1,5.972,22.285Zm4.963,1.421c2.282-2.3,3.615-5.534,3.961-9.621A1,1,0,0,0,13.985,13a.983.983,0,0,0-1.081.911c-.311,3.657-1.419,6.4-3.388,8.381a1,1,0,0,0,1.419,1.41Zm5.2-.186a17.793,17.793,0,0,0,1.508-3.181,1,1,0,0,0-1.881-.678,15.854,15.854,0,0,1-1.338,2.821,1,1,0,0,0,1.711,1.038ZM18.5,17.191A31.459,31.459,0,0,0,19,11,7,7,0,0,0,6.787,6.333,1,1,0,1,0,8.276,7.667,5,5,0,0,1,17,11a29.686,29.686,0,0,1-.462,5.809,1,1,0,0,0,.79,1.172.979.979,0,0,0,.193.019A1,1,0,0,0,18.5,17.191ZM7,11a5,5,0,0,1,.069-.833A1,1,0,1,0,5.1,9.833,6.971,6.971,0,0,0,5,11c0,4.645-1.346,7-4,7a1,1,0,0,0,0,2C4.869,20,7,16.8,7,11ZM20.7,23.414A29.76,29.76,0,0,0,23,11a10.865,10.865,0,0,0-1.1-4.794,1,1,0,1,0-1.8.875A8.9,8.9,0,0,1,21,11a27.91,27.91,0,0,1-2.119,11.586,1,1,0,0,0,.5,1.324.984.984,0,0,0,.413.09A1,1,0,0,0,20.7,23.414ZM3,14V11a9.01,9.01,0,0,1,9-9,8.911,8.911,0,0,1,5.4,1.8,1,1,0,0,0,1.2-1.6A10.9,10.9,0,0,0,12,0,11.013,11.013,0,0,0,1,11v3a1,1,0,0,0,2,0Z" />
              </svg>
            </span>
          </div>

          <div className="border-t border-gray-100">
            <nav aria-label="Main Nav" className="flex flex-col p-2">
              <ul className="pb-4 space-y-4">
                <li>
                  <a
                    href="/"
                    /*  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700" */
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      activeItem === "home" ? "bg-gray-100 text-gray-700" : ""
                    }`}
                    onClick={() => handleClick("home")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-50"
                      id="Outline"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z" />
                    </svg>
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                      Home
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="/messages"
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      activeItem === "messages"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                    onClick={() => handleClick("messages")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 opacity-50"
                    >
                      <path d="m16.713,13.804c.384.393.381,1.02-.009,1.406-.074.073-1.84,1.79-4.704,1.79s-4.63-1.716-4.704-1.79c-.392-.389-.396-1.021-.007-1.414.39-.392,1.021-.396,1.415-.007.046.045,1.28,1.21,3.296,1.21s3.25-1.166,3.302-1.215c.396-.382,1.028-.374,1.411.02Zm-8.213-2.804c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5,1.5.672,1.5,1.5,1.5Zm7-3c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm8.5,4.34v6.66c0,2.757-2.243,5-5,5h-5.917C6.082,24,.471,19.208.029,12.854c-.24-3.476,1.027-6.878,3.479-9.333C5.962,1.065,9.371-.205,12.836.029c6.261.425,11.164,5.833,11.164,12.312Zm-2,0c0-5.431-4.085-9.962-9.299-10.316-.229-.016-.458-.023-.687-.023-2.656,0-5.209,1.048-7.091,2.933-2.043,2.046-3.1,4.883-2.898,7.782.372,5.38,5.023,9.285,11.058,9.285h5.917c1.654,0,3-1.346,3-3v-6.66Z" />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                      Messages
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="/tasks"
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      activeItem === "tasks"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                    onClick={() => handleClick("tasks")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 opacity-50"
                    >
                      <path d="m7,14c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-6c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Zm7,15c0,.553-.448,1-1,1s-1-.447-1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5c0,.553-.448,1-1,1s-1-.447-1-1c0-3.859,3.14-7,7-7s7,3.141,7,7ZM24,5v8c0,2.757-2.243,5-5,5h-4c-.552,0-1-.447-1-1v-2c0-.553.448-1,1-1h3c.552,0,1,.447,1,1v1c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3h-9.535c-1.068,0-2.064.575-2.599,1.501-.277.478-.888.643-1.366.364-.479-.276-.642-.888-.365-1.366.892-1.541,2.551-2.499,4.331-2.499h9.535c2.757,0,5,2.243,5,5Z" />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                      Tasks
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/files"
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      activeItem === "files"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                    onClick={() => handleClick("files")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 opacity-50"
                    >
                      <path d="m23.493,11.017c-.487-.654-1.234-1.03-2.05-1.03h-.443v-1.987c0-2.757-2.243-5-5-5h-5.056c-.154,0-.31-.037-.447-.105l-3.155-1.578c-.414-.207-.878-.316-1.342-.316h-2C1.794,1,0,2.794,0,5v13c0,2.757,2.243,5,5,5h12.558c2.226,0,4.15-1.432,4.802-3.607l1.532-6.116c.234-.782.089-1.605-.398-2.26ZM2,18V5c0-1.103.897-2,2-2h2c.154,0,.31.037.447.105l3.155,1.578c.414.207.878.316,1.342.316h5.056c1.654,0,3,1.346,3,3v1.987h-10.385c-1.7,0-3.218,1.079-3.789,2.72l-2.19,7.138c-.398-.509-.636-1.15-.636-1.845Zm19.964-5.253l-1.532,6.115c-.384,1.279-1.539,2.138-2.874,2.138H5c-.208,0-.411-.021-.607-.062l2.334-7.609c.279-.803,1.039-1.342,1.889-1.342h12.828c.242,0,.383.14.445.224.062.084.156.259.075.536Z" />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                      Files
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/calendar"
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      activeItem === "calendar"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                    onClick={() => handleClick("calendar")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 opacity-50"
                    >
                      <path d="M19,2h-1V1c0-.552-.448-1-1-1s-1,.448-1,1v1H8V1c0-.552-.448-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h4c.552,0,1-.448,1-1s-.448-1-1-1H5c-1.654,0-3-1.346-3-3V10H23c.552,0,1-.448,1-1v-2c0-2.757-2.243-5-5-5Zm3,6H2v-1c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v1Zm-3.121,4.879l-5.707,5.707c-.755,.755-1.172,1.76-1.172,2.829v1.586c0,.552,.448,1,1,1h1.586c1.069,0,2.073-.417,2.828-1.172l5.707-5.707c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121c-1.134-1.134-3.11-1.134-4.243,0Zm2.828,2.828l-5.708,5.707c-.377,.378-.879,.586-1.414,.586h-.586v-.586c0-.534,.208-1.036,.586-1.414l5.708-5.707c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Zm-16.707-1.707c0-.552,.448-1,1-1h7c.552,0,1,.448,1,1s-.448,1-1,1H6c-.552,0-1-.448-1-1Zm6,4c0,.552-.448,1-1,1H6c-.552,0-1-.448-1-1s.448-1,1-1h4c.552,0,1,.448,1,1Z" />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                      Calendar
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div className=" pt-0 p-2 ">
          <div className="space-y-1 border-t border-gray-100 p-2">
            <ul className=" space-y-4">
              <li>
                <a
                  href=""
                  className="group relative flex justify-center rounded py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 opacity-50"
                  >
                    <g id="_01_align_center" data-name="01 align center">
                      <path d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z" />
                    </g>
                  </svg>
                  <span className="absolute start-full top-1/2 ms-6 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                    Notification
                  </span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="group relative flex justify-center rounded py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 opacity-50"
                  >
                    <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                    <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z" />
                  </svg>

                  <span className="absolute start-full top-1/2  ms-6 -translate-y-1/2 rounded  px-2 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 opacity-0 group-hover:opacity-100">
                    Setting
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="/logout">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Logout
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
