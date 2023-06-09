import React, { useEffect, useState } from "react";
import Chat_UI from "./components/chat";
import Frame_UI from "./components/frame_ui";
import Home_UI from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import File_UI from "./components/file";
import Calendar_UI from "./components/calendar";
import Login from "./components/acc_user/login";
import Register_admin from "./low-level-admin/register-admin";
import Login_admin from "./low-level-admin/login-admin";
import Home_admin_panel from "./low-level-admin/components-admin-panel/home";
import Frame_UI_admin_panel from "./low-level-admin/components-admin-panel/frame_ui_admin_panel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User_account from "./low-level-admin/components-admin-panel/users/user_account";
import Users from "./low-level-admin/components-admin-panel/users";
import Pays_UI from "./low-level-admin/components-admin-panel/pays";
import Job_UI_app from "./components/job";

/* 
`Wrapper` để bọc và kiểm soát việc hiển thị của `Frame_UI`.  truyền prop `showForm` vào trong `Wrapper` 
và sử dụng nó để kiểm soát việc hiển thị của `Frame_UI` và cách margin bên trái cho nội dung.
Trong các routes `Login` và `Register`, chỉ cần chuyển giá trị `false` cho prop `showForm` để ẩn `Frame_UI`. */
const Wrapper = React.memo(({ children, showForm }) => {
  const token = useSelector((state) => state.authUser.token);
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  //console.log("useradmin:", adminUser);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của adminUser
    const hasUser = token !== null && token !== undefined;

    // Nếu adminUser không hợp lệ, chuyển hướng đến trang login
    if (!hasUser) {
      navigate("/login");
    } else {
      setShouldRender(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    // Cập nhật khi showForm thay đổi
  }, [showForm]);
 

  return shouldRender ? (
    <>
      {showForm &&  <Frame_UI />}
      <div className={` transition-all duration-300 ${showForm ? "" : ""}`}>
        {children}
      </div>
    </>
  ) : null;
});
const WrapperAdmins = React.memo(({ children, showForm }) => {
  const token = useSelector((state) => state.authAdmin.token);
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  //console.log("useradmin:", adminUser);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của adminUser
    const hasAdminUser = token !== null && token !== undefined;

    // Nếu adminUser không hợp lệ, chuyển hướng đến trang login
    if (!hasAdminUser) {
      navigate("/admin/admin-panel/login");
    } else {
      setShouldRender(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    // Cập nhật khi showFormadmin thay đổi
  }, [showForm]);

  return shouldRender ? (
    <>
      {showForm && <Frame_UI_admin_panel />}
      <div className={` transition-all duration-300 ${showForm ? "" : ""}`}>
        {children}
      </div>
    </>
  ) : null;
});

function App() {
  const showForm = true;
  const dispatch = useDispatch();
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/admin-panel/register"
            element={<Register_admin />}
          />
          <Route path="/admin/admin-panel/login" element={<Login_admin />} />
          {/*  <Route path="/admin-panel/home" element={<Home_admin_panel />} /> */}
          <Route
            path="/admin-panel/home"
            element={
              <WrapperAdmins showForm={showForm}>
                <Home_admin_panel />
              </WrapperAdmins>
            }
          />
          <Route
            path="/admin-panel/users"
            element={
              <WrapperAdmins showForm={showForm}>
                <Users />
              </WrapperAdmins>
            }
          />

          <Route
            path="/admin-panel/user_accounts"
            element={
              <WrapperAdmins showForm={showForm}>
                <User_account />
              </WrapperAdmins>
            }
          />
          <Route
            path="/admin-panel/pays"
            element={
              <WrapperAdmins showForm={showForm}>
                <Pays_UI />
              </WrapperAdmins>
            }
          />
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
                <Job_UI_app></Job_UI_app>
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
