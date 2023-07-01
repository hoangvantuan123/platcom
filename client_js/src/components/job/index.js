import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, addMessage, selectMessages } from '../../slices/messagesSlice';

export default function Job_UI_app() {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const messageInputRef = useRef();
  console.log(messages)

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = () => {
    const text = messageInputRef.current.value.trim();
    if (text) {
      dispatch(addMessage(text));
      messageInputRef.current.value = '';
    }
  };

  return (
    <div className='ml-64'>
      <h1>Real-time Chat Application</h1>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <span>{message.text}</span>
            <span>{message.created_at}</span>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" ref={messageInputRef}  className=' border '/>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
