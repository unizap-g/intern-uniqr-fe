import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.1.4.23:3000/api", // your backend server
});

// Attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default instance;