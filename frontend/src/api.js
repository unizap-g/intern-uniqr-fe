import axios from "axios";
const URL=import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: URL,
});
console.log("auth check")
api.interceptors.request.use((config) => {
  const uuid = localStorage.getItem("uuidApiKey");
  if (uuid) {
    config.headers["x-api-key"] = uuid;
  }
  return config;
});

// if backend returns a new uuid in response headers
api.interceptors.response.use((response) => {
  const newUuid = response.headers["x-api-key"];
  console.log("Response Headers:", response.headers);
  if (newUuid) {
    console.log("Received new UUID from server:", newUuid);
    localStorage.setItem("uuidApiKey", newUuid);
  }
  return response;
});

export default api;
