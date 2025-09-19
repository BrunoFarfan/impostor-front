import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const matchAPI = {
  // Create a new match
  createMatch: async () => {
    try {
      const response = await api.post('/match/create');
      return response.data;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  },

  // Join an existing match
  joinMatch: async (name, code) => {
    try {
      const response = await api.post('/match/join', { 
        name: name,
        match_code: code 
      });
      return response.data;
    } catch (error) {
      console.error('Error joining match:', error);
      throw error;
    }
  },
};

export default api;
