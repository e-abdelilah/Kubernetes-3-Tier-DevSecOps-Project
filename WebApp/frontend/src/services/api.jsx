import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  getTasks: () => api.get('/'),
  getTask: (id) => api.get(`/${id}`),
  createTask: (taskData) => api.post('/', taskData),
  updateTask: (id, taskData) => api.put(`/${id}`, taskData),
  deleteTask: (id) => api.delete(`/${id}`),
};

export default api;