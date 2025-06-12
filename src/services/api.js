import axios from "axios";

// Puedes usar variables de entorno (.env) si prefieres
const api = axios.create({
  baseURL: "https://ticketpro-api.onrender.com/api",
  
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o de Pinia si usas store
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
