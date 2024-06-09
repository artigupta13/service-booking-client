import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem("user");
    const { token } = JSON.parse(userString);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
