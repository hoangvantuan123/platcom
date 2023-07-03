import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { urlAPI } from "../services_api";

export const fetchDataUserNumbers = createAsyncThunk("chat/fetchDataUserNumbers", async (token) => {
  try {
    const response = await fetch(`${urlAPI}/api/token/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: token }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("Error fetching data");
  }
});
export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  const response = await fetch('http://localhost:8000/api/messages/');
  const data = await response.json();
  console.log(data)
  return data;
});

export const addMessage = createAsyncThunk('chat/addMessage', async (text) => {
  const response = await fetch('http://localhost:8000/api/messages/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `text=${encodeURIComponent(text)}`,
  });
  const data = await response.json();
  return data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
