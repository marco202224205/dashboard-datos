import axios from 'axios';

// Cliente HTTP configurado con las variables de entorno de Vite
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json'
    // Si la API pidiera una clave, se agregaría aquí leyendo import.meta.env.VITE_API_KEY
  }
});

export default apiClient;