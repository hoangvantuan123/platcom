import React, { useEffect } from "react";
import Chat_UI from "./components/chat";
import Frame_UI from "./components/frame_ui";
import Home_UI from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Job_UI from "./components/job";
import File_UI from "./components/file";
import Calendar_UI from "./components/calendar";
import Login from "./components/acc_user/login";
import RegisterForm from "./low-level-admin";
import Register_admin from "./low-level-admin/register-admin";

/* 
`Wrapper` để bọc và kiểm soát việc hiển thị của `Frame_UI`.  truyền prop `showForm` vào trong `Wrapper` 
và sử dụng nó để kiểm soát việc hiển thị của `Frame_UI` và cách margin bên trái cho nội dung.
Trong các routes `Login` và `Register`, chỉ cần chuyển giá trị `false` cho prop `showForm` để ẩn `Frame_UI`. */
const Wrapper = React.memo(({ children, showForm }) => {
  useEffect(() => {
    // Cập nhật khi showForm thay đổi
  }, [showForm]);

  return (
    <>
      {showForm && <Frame_UI />}
      <div className={` transition-all duration-300 ${showForm ? "" : ""}`}>
        {children}
      </div>
    </>
  );
});

function App() {
  const showForm = true;
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register_admin" element={<Register_admin />} />
          <Route
            path="/"
            element={
              <Wrapper showForm={showForm}>
                <Home_UI />
              </Wrapper>
            }
          />
          <Route
            path="/messages"
            element={
              <Wrapper showForm={showForm}>
                <Chat_UI />
              </Wrapper>
            }
          />
          <Route
            path="/tasks"
            element={
              <Wrapper showForm={showForm}>
                <Job_UI />
              </Wrapper>
            }
          />
          <Route
            path="/files"
            element={
              <Wrapper showForm={showForm}>
                <File_UI />
              </Wrapper>
            }
          />
          <Route
            path="/calendar"
            element={
              <Wrapper showForm={showForm}>
                <Calendar_UI />
              </Wrapper>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
