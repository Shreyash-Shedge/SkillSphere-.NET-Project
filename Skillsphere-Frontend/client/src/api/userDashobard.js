import axios from 'axios';

const API_URL = 'http://localhost:5144/api';

export const getCourses = (token) => {
    return axios.get(`${API_URL}/Courses/user/all-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const getCourseById = (courseId, token) => {
    return axios.get(`${API_URL}/courses/user/all-courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };