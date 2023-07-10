import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Thay đổi URL tùy theo địa chỉ backend

// Tạo slice cho chat
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [], // Trạng thái ban đầu, danh sách tin nhắn rỗng
  },
  reducers: {
    // Action để thiết lập danh sách tin nhắn
    setMessages: (state, action) => {
      state.messages = action.payload; // Gán danh sách tin nhắn mới
    },
    // Action để thêm tin nhắn vào danh sách
    addMessage: (state, action) => {
      const { message } = action.payload; // Lấy tin nhắn từ action payload
      const isMessageExist = state.messages.some((msg) => msg === message); // Kiểm tra xem tin nhắn đã tồn tại trong danh sách hay chưa

      if (!isMessageExist) {
        state.messages.push(message); // Thêm tin nhắn vào danh sách nếu chưa tồn tại
      }
    },
  },
});

// Xuất các action từ slice
export const { setMessages, addMessage } = chatSlice.actions;

// Action để gửi tin nhắn
export const sendMessage = (message) => (dispatch) => {
  socket.emit('chat message', message); // Gửi tin nhắn tới backend thông qua socket
};

// Action để xử lý việc nhận tin nhắn từ server
export const receiveMessage = (message) => (dispatch) => {
  dispatch(addMessage({ message })); // Thêm tin nhắn vào danh sách thông qua action addMessage
};

// Action để lắng nghe tin nhắn từ server
export const listenForMessages = () => (dispatch) => {
  socket.on('chat message', (message) => {
    dispatch(receiveMessage(message)); // Nhận tin nhắn từ server thông qua socket và xử lý bằng action receiveMessage
  });
};

// Action để lấy danh sách tin nhắn từ backend
export const fetchMessages = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/messages'); // Gửi yêu cầu GET để lấy danh sách tin nhắn từ backend
    dispatch(setMessages(response.data)); // Cập nhật danh sách tin nhắn trong state thông qua action setMessages
  } catch (error) {
    console.error('Error fetching messages', error);
  }
};

// Action để thực hiện lắng nghe và lấy danh sách tin nhắn từ backend
export const fetchAndListenForMessages = () => (dispatch) => {
  dispatch(fetchMessages()); // Gọi action fetchMessages để lấy danh sách tin nhắn từ backend
  dispatch(listenForMessages()); // Gọi action listenForMessages để lắng nghe tin nhắn từ server
};

// Reducer của slice
export default chatSlice.reducer;
