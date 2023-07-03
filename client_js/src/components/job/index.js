import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessages,
  addMessage,
  selectMessages,
} from "../../slices/messagesSlice";
import { logout } from "../../slices/authUserSlice";
import { fetchDataUserNumbers } from "../../slices/authUserSlice";
export default function Job_UI_app({ items }) {
  console.log("item test " , items)
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const messageInputRef = useRef();
  const token = useSelector((state) => state.authUser.token);
  console.log(messages);
  /*  useEffect(() => {
    if (token) {
      dispatch(fetchDataUserNumbers(token));
    }
  }, [dispatch]); */
  const handleLogout = async () => {
    if (token) {
      try {
        await dispatch(fetchDataUserNumbers(token));
        dispatch(logout());
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = () => {
    const text = messageInputRef.current.value.trim();
    if (text) {
      dispatch(addMessage(text));
      messageInputRef.current.value = "";
    }
  };

  return (
    <div className="ml-64">
      <button
        onClick={handleLogout}
        className=" w-24 h-24 bg-slate-50 text-slate-950"
      >
        Logout
      </button>
      <h1>Real-time Chat Application</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <span>{message.text}</span>
            <span>{message.created_at}</span>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" ref={messageInputRef} className=" border " />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
