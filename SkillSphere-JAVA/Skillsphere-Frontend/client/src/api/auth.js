import axios from 'axios';

  const API_URL = 'http://localhost:8080/api';

// Including token in every request
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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.clear(); // Clear stored data
      window.location.href = "/signin"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);


  export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  };

  export const registerCreator = async (creatorData) => {
    const response = await axios.post(`${API_URL}/creators`, creatorData);
    return response.data;
  };

export const registerAdmin = (name, email, password) => {
  return axios.post(`${API_URL}/auth/register-admin`, { name, email, password });
};

export const login = async (email, password) => {
  const response = await axios.post("http://localhost:8080/authenticate", { email, password });
  return response;
};

export const fetchCreatorDetails = async (id) => {
  const response = await axios.get(`${API_URL}/creators/${id}`);
  return response.data;
};

export const fetchUserDetails = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};



// Courses API

// Fetch All Courses
export const retrieveAllCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data; // Assuming the response is an array of courses
};

export const getCourses = async (token) => {
  const creatorId = localStorage.getItem('id'); 
  return await axios.get(`${API_URL}/${creatorId}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCourse = async (creatorId, courseData, token) => {
  return await axios.post(`${API_URL}/${creatorId}/courses`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCourseById = async (courseId, token) => {
  const creatorId = localStorage.getItem('id');
  return await axios.get(`${API_URL}/${creatorId}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (courseId, courseData, token) => {
  const creatorId = localStorage.getItem("id");
  return await axios.put(`${API_URL}/${creatorId}/courses/${courseId}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // This is important when sending FormData
    },
  });
};

export const deleteCourse = async (courseId, token) => {
  const creatorId = localStorage.getItem("id");
  return await axios.delete(`${API_URL}/${creatorId}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Modules API
export const getModules = async (courseId, token) => {
  return await axios.get(`${API_URL}/${courseId}/modules`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addModule = async (courseId, moduleData, token) => {
  return await axios.post(`${API_URL}/${courseId}/modules`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getModuleById = async (courseId, moduleId, token) => {
  return await axios.get(`${API_URL}/${courseId}/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateModule = async (courseId, moduleId, moduleData, token) => {
  return await axios.put(`${API_URL}/${courseId}/modules/${moduleId}`, moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteModule = async (courseId, moduleId, token) => {
  return await axios.delete(`${API_URL}/${courseId}/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Videos API
export const getVideos = async (moduleId, token) => {
  return await axios.get(`${API_URL}/${moduleId}/videos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getVideoById = async (moduleId, videoId, token) => {
  return await axios.get(`${API_URL}/${moduleId}/videos/${videoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addVideo = async (moduleId, videoData, token) => {
  const formData = new FormData();
  formData.append("title", videoData.title);
  formData.append("file", videoData.file);

  return await axios.post(`${API_URL}/${moduleId}/videos`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const updateVideo = async (moduleId, videoId, videoData, token) => {
  const formData = new FormData();
  formData.append("title", videoData.title);
  if (videoData.file) {
    formData.append("file", videoData.file);
  }

  return await axios.put(`${API_URL}/${moduleId}/videos/${videoId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteVideo = async (moduleId, videoId, token) => {
  return await axios.delete(`${API_URL}/${moduleId}/videos/${videoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Consultations API
export const retrieveAllConsultations = async () => {
  const response = await axios.get('http://localhost:8080/api/consultations');
  return response.data;
};


export const getConsultations = async (creatorId, token) => {
  return await axios.get(`${API_URL}/${creatorId}/consultations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createConsultation = async (creatorId, consultationData, token) => {
  return await axios.post(`${API_URL}/${creatorId}/consultations`, consultationData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};


export const getConsultation = async (creatorId, consultationId, token) => {
  return await axios.get(`${API_URL}/${creatorId}/consultations/${consultationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateConsultation = async (creatorId, consultationId, consultationData, token) => {
  return await axios.put(`${API_URL}/${creatorId}/consultations/${consultationId}`, consultationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteConsultation = async (creatorId, consultationId, token) => {
  return await axios.delete(`${API_URL}/${creatorId}/consultations/${consultationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


//Workshops apis

export const retrieveAllWorkshops= async () => {
  const response = await axios.get('http://localhost:8080/api/workshops');
  return response.data;
};


export const getWorkshops = async (creatorId, token) => {
  return await axios.get(`${API_URL}/${creatorId}/workshops`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWorkshop = async (creatorId, workshopId, token) => {
  return await axios.get(`${API_URL}/${creatorId}/workshops/${workshopId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWorkshop = async (creatorId, workshopData, token) => {
  return await axios.post(`${API_URL}/${creatorId}/workshops`, workshopData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const updateWorkshop = async (creatorId, workshopId, workshopData, token) => {
  return await axios.put(`${API_URL}/${creatorId}/workshops/${workshopId}`, workshopData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const deleteWorkshop = async (creatorId, workshopId, token) => {
  return await axios.delete(`${API_URL}/${creatorId}/workshops/${workshopId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Purchases
export const retrieveUserPurchases = async (userId, type, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/purchases/${userId}/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    throw error;
  }
};

// Other API functions, such as getCourseDetails, getConsultationDetails, getWorkshopDetails
export const getPurchasedCourseDetails = async (userId, courseId, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/purchases/${userId}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const course = response.data.find(purchase => purchase.course.courseId === parseInt(courseId));
    return course ? course.course : null;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

export const getPurchasedConsultationDetails = async (userId, consultationId, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/purchases/${userId}/consultations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const consultation = response.data.find(purchase => purchase.consultation.consultationId === parseInt(consultationId));
    return consultation ? consultation.consultation : null;
  } catch (error) {
    console.error('Error fetching consultation details:', error);
    throw error;
  }
};

export const getPurchasedWorkshopDetails = async (userId, workshopId, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/purchases/${userId}/workshops`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const workshop = response.data.find(purchase => purchase.workshop.workshopId === parseInt(workshopId));
    return workshop ? workshop.workshop : null;
  } catch (error) {
    console.error('Error fetching workshop details:', error);
    throw error;
  }
};