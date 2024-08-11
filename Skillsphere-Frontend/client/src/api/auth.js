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

// Course related functions
export const getCourses = (token) => {
  return axios.get(`${API_URL}/courses/creator/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCourseById = (courseId, token) => {
  return axios.get(`${API_URL}/courses/creator/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCourse = (courseData, token) => {
  return axios.post(`${API_URL}/courses/creator/courses`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const updateCourse = (courseId, courseData, token) => {
  return axios.put(`${API_URL}/courses/creator/courses/${courseId}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const addModule = (courseId, moduleData, token) => {
  return axios.post(`${API_URL}/courses/creator/courses/${courseId}/modules`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const updateModule = (courseId, moduleId, moduleData, token) => {
  return axios.put(`${API_URL}/courses/creator/courses/${courseId}/modules/${moduleId}`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const addVideo = (moduleId, videoData, token) => {
  const formData = new FormData();
  formData.append('title', videoData.title);
  formData.append('file', videoData.file);

  return axios.post(`${API_URL}/courses/creator/modules/${moduleId}/videos`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateVideo = (moduleId, videoId, videoData, token) => {
  const formData = new FormData();
  formData.append('title', videoData.title);
  formData.append('file', videoData.file);

  return axios.put(`${API_URL}/courses/creator/modules/${moduleId}/videos/${videoId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteCourse = (courseId, token) => {
  return axios.delete(`${API_URL}/courses/creator/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteModule = (moduleId, token) => {
  return axios.delete(`${API_URL}/courses/creator/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteVideo = (moduleId, videoId, token) => {
  return axios.delete(`${API_URL}/courses/creator/modules/${moduleId}/videos/${videoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};