import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authService = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  updatePreferences: (preferences) =>
    api.patch('/auth/preferences', preferences)
};

// Video API
export const videoService = {
  processVideo: (videoUrl) =>
    api.post('/videos/process', { videoUrl }),
  
  processManualTranscript: (title, transcript, videoUrl = '') =>
    api.post('/videos/process-text', { title, transcript, videoUrl }),
  
  getVideoById: (videoId) =>
    api.get(`/videos/${videoId}`),
  
  getLearningHistory: (page = 1, limit = 10) =>
    api.get(`/videos?page=${page}&limit=${limit}`),
  
  deleteVideo: (videoId) =>
    api.delete(`/videos/${videoId}`)
};

// Quiz API
export const quizService = {
  getQuizByVideoId: (videoId) =>
    api.get(`/quiz/video/${videoId}`),
  
  submitQuiz: (quizId, answers, timeTaken) =>
    api.post(`/quiz/${quizId}/submit`, { answers, timeTaken }),
  
  getAttemptHistory: (quizId) =>
    api.get(`/quiz/${quizId}/attempts`),
  
  getAttemptDetails: (quizId, attemptNumber) =>
    api.get(`/quiz/${quizId}/attempts/${attemptNumber}`)
};

// User API
export const userService = {
  getDashboardStats: () =>
    api.get('/user/dashboard'),
  
  getLearningProgress: (period = '7d') =>
    api.get(`/user/progress?period=${period}`),
  
  updateProfile: (data) =>
    api.patch('/user/profile', data)
};

export default api;
