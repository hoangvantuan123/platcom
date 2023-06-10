import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, loginAdmin, loginSuccess } from "../../slices/authAdminSlice";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
export default function Home_admin_panel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state);
  //console.log("reduxState", reduxState);
  // Sử dụng useSelector để truy cập vào state từ Redux
  // Sử dụng useSelector để truy cập vào state từ Redux
  /*   const { useradmin: adminUser, user: User, token: Token } = useSelector(state => state.authAdmin);


  console.log("useradmin:", adminUser);
  console.log("user:", User);
  console.log("token:", Token);
 */

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/admin-panel/login");
  };

  return (
    <div
      className="  ml-64 p-5
    "
    >
      Home_admin_panel
      <div>
        {/* Các thành phần khác */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
