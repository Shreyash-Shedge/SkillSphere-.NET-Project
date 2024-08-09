import axios from 'axios';

const API_URL = 'http://localhost:5144/api';

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/register-user`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};  

export const registerCreator = (name, email, password, bio) => {
  return axios.post(`${API_URL}/auth/register-creator`, { name, email, password, bio });
};

export const registerAdmin = (name, email, password) => {
  return axios.post(`${API_URL}/auth/register-admin`, { name, email, password });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

