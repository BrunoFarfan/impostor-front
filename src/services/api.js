import axios from 'axios';
import { config } from './config.js';

const API_BASE_URL = config.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleResponse = (response) => {
  const data = response.data;
  if (data && typeof data.error === 'string') {
    throw new Error(data.error);
  }
  return data;
};

export const matchAPI = {
  // Create a new match
  createMatch: async () => {
    try {
      const response = await api.post('/match/create');
      return handleResponse(response);
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
      return handleResponse(response);
    } catch (error) {
      console.error('Error joining match:', error);
      throw error;
    }
  },

  startMatch: async (matchCode) => {
    try {
      const response = await api.post('/match/start', { 
        match_code: matchCode 
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error starting match:', error);
      throw error;
    }
  },

  getMatchState: async (matchCode) => {
    try {
      const response = await api.get(`/match/${matchCode}/state`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error getting match state:', error);
      throw error;
    }
  },
};

export default api;
