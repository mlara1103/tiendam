import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000
});

export function getErrorMessage(error) {
  return error.response?.data?.message || error.message || 'No fue posible completar la solicitud.';
}

export default api;
