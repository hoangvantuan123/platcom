import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  loginAdmin,
  loginSuccess,
} from "../../../slices/authAdminSlice";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header_ui_admin from "./header";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  color: theme.palette.text.secondary,
}));

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
      className="ml-64 p-5"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Header_ui_admin />
      <Box sx={{ flexGrow: 1, marginTop: 3 }}>
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item xs={12} md={6}>
            <div
              style={{ height: "100%" }}
              className="border  rounded-xl "
            >
              xs=6 md=8
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{ height: "100%" }}
              className="border  rounded-xl "
            >
              xs=6 md=8
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={{ height: "100%" }}
              className="border  rounded-xl "
            >
              xs=6 md=8
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div
              style={{ height: "100%" }}
              className="border  rounded-xl "
            >
              xs=6 md=8
            </div>
          </Grid>
        </Grid>
      </Box>
      <div>
        {/* Các thành phần khác */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
