import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchData, selectData } from "../../../slices/dataSlice";
import { useJwt } from "react-jwt";
export default function Pays_UI() {
  const dispatch = useDispatch();
  const useradmin = useSelector((state) => state.authAdmin.useradmin);
  const token = useSelector((state) => state.authAdmin.token);
  const user = useSelector((state) => state.authAdmin.user);
  const email = useSelector((state) => state.authAdmin.email);
  const userLoaded = useSelector((state) => state.authAdmin.userLoaded);


  

  /* useEffect(() => {
    sendDataToBackend();
  }, []);

  const sendDataToBackend = () => {
    const data = {
      text: token, // Thay đổi thành nội dung bạn muốn gửi
    };
    console.log(token)
    fetch("http://localhost:8000/api/your-endpoint/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Xử lý kết quả từ backend
        console.log(result);
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error(error);
      });
  }; */

  return (
    <div className="ml-64">
      <h1>My Component</h1>
      {/*  <button onClick={postData}>Gửi POST Request</button>
      <div>
        {responseData ? (
          <div>
            <h3>Phản hồi từ Django REST API:</h3>
            <p>{responseData.message}</p>
          </div>
        ) : (
          <p>Đang chờ phản hồi...</p>
        )}
      </div> */}
    </div>
  );
}
