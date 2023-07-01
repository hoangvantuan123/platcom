import axios from "axios";

export const urlAPI = "http://localhost:8000";

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (credentials) => api.post("/api/login/", credentials);
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
export default api;