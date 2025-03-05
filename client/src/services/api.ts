import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

// Flight API endpoints
export const flightApi = {
  searchFlights: async (params: { from: string; to: string; date: string; passengers?: number }) => {
    const response = await api.get('/flights/search', { params });
    return response.data;
  },
  
  getFlightById: async (id: string) => {
    const response = await api.get(`/flights/${id}`);
    return response.data;
  },
  
  createFlight: async (flightData: any) => {
    const response = await api.post('/flights', flightData);
    return response.data;
  },
};

export default api;