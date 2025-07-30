import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Skills API
export const skillsAPI = {
  getAll: (params = {}) => api.get('/skills/', { params }),
  getById: (id) => api.get(`/skills/${id}/`),
  create: (data) => api.post('/skills/', data),
  update: (id, data) => api.put(`/skills/${id}/`, data),
  delete: (id) => api.delete(`/skills/${id}/`),
  getStats: () => api.get('/skills/stats/'),
};

// Activities API
export const activitiesAPI = {
  getAll: (params = {}) => api.get('/activities/', { params }),
  getById: (id) => api.get(`/activities/${id}/`),
  create: (data) => api.post('/activities/', data),
  update: (id, data) => api.put(`/activities/${id}/`, data),
  delete: (id) => api.delete(`/activities/${id}/`),
};

export default api;