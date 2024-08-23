import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createCoursePayment = async (userId, courseId) => {
  try {
    const response = await axios.post(`${API_URL}/payments/create/${userId}/course/${courseId}`);
    console.log('Course payment created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating course payment:', error);
    throw error;
  }
};

export const createConsultationPayment = async (userId, consultationId) => {
  try {
    const response = await axios.post(`${API_URL}/payments/create/${userId}/consultation/${consultationId}`);
    console.log('Consultation payment created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating consultation payment:', error);
    throw error;
  }
};

export const createWorkshopPayment = async (userId, workshopId) => {
  try {
    const response = await axios.post(`${API_URL}/payments/create/${userId}/workshop/${workshopId}`);
    console.log('Workshop payment created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating workshop payment:', error);
    throw error;
  }
};

export const checkPaymentStatus = async (orderId) => {
  try {
    console.log('Checking payment status for order ID:', orderId);
    const response = await axios.get(`http://localhost:8080/api/payments/status/${orderId}`);
    console.log('Full payment status response:', response);

    // Check if the status is "COMPLETED"
    if (response.data && response.data.status === 'COMPLETED') {
      console.log('Payment status is COMPLETED');
      return true;
    } else {
      console.log('Payment status is not COMPLETED:', response.data.status);
      return false;
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
};
