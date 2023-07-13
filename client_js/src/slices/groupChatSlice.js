// groupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { URL_API_CHAT } from '../services_api';

const socket = io(URL_API_CHAT);
const groupSlice = createSlice({
  name: "group",
  initialState: {
    selectedGroupId: null, // Thêm trường selectedGroupId
    groups: [], // Danh sách các nhóm chat
  },
  reducers: {
    groupCreated: (state, action) => {
      state.selectedGroupId = action.payload.id; // Lưu trữ ID của nhóm chat mới được tạo
      state.groups.push(action.payload); // Thêm nhóm chat mới vào danh sách
    },
    membersAddedToGroup: (state, action) => {
      const { groupId, members } = action.payload;
      const group = state.groups.find((group) => group.id === groupId); // Tìm nhóm chat trong danh sách
      if (group) {
        group.members = members; // Cập nhật thành viên của nhóm chat
      }
    },
  },
});

export const { groupCreated, membersAddedToGroup } = groupSlice.actions;

export const createGroup = (groupName, memberId) => (dispatch) => {
  socket.emit("createGroup", { groupName, memberId });
};

export const addMembersToGroup = (groupId, memberIds) => (dispatch) => {
  socket.emit("addMembersToGroup", { groupId, memberIds });
};

export default groupSlice.reducer;