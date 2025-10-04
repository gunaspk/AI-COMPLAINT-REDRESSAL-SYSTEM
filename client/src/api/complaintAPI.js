import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const complaintAPI = {
  // Get all complaints
  getAllComplaints: () => api.get('/complaints'),
  
  // Get complaint by ID
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  
  // Create new complaint
  createComplaint: (formData) => {
    return api.post('/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Update complaint status
  updateComplaintStatus: (id, status) => {
    return api.put(`/complaints/${id}/status`, { status });
  },
  
  // Get leaderboard
  getLeaderboard: () => api.get('/leaderboard'),
  
  // Get stats
  getStats: () => api.get('/stats'),
  
  // Analyze image
  analyzeImage: (formData) => {
    return api.post('/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
