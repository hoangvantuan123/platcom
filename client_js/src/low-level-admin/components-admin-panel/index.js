import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Home_admin_panel() {
  const dispatch = useDispatch();
  const authAdmin = useSelector((state) => state.authAdmin);
  console.log("authadmin", authAdmin);
  
  return (
    <div
      className="  ml-64 p-5
    "
    >
      Home_admin_panel
    </div>
  );
}
