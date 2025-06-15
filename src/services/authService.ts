import axios from "axios";

const API_URL = "https://ticketpro-api.onrender.com/api/auth"; // Ajusta esto a tu backend real

export default {
     async login(formData) {
          try {
               const { data } = await axios.post(`${API_URL}/login`, formData);
               return data.data;
          } catch (err) {
               if (err?.response?.data) {
                    throw err.response.data
               } else {
                    throw {
                         ok: false,
                         code: 500,
                         message: 'Error de red o servidor no disponible',
                         status: 'error'
                    }
               }
          }
     }
};
