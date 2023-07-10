import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, fetchAndListenForMessages } from "../../slices/messagesSlice";

export default function Job_UI_app() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  
  useEffect(() => {
    dispatch(fetchAndListenForMessages());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lấy dữ liệu từ form
    const messageData = {
      content: e.target.message.value,
      sender_id: 'e5faa672-6d94-4d5d-a73b-8af46425312a',
      receiver_id: 'e5faa672-6d89-4d5d-a73b-8af46425312',
    };
    dispatch(sendMessage(messageData));
    // rest lại input
    e.target.reset();
  };

  return (
    <div className="ml-64">
      <h1>Real-time Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" placeholder="Enter message" required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
