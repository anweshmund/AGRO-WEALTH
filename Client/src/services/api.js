// API Service for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getHeaders(options.requireAuth !== false),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
    requireAuth: false,
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    requireAuth: false,
  }),

  getMe: () => apiRequest('/auth/me'),
};

// Users API
export const usersAPI = {
  getUser: (id) => apiRequest(`/users/${id}`),
  updateUser: (id, data) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Projects API
export const projectsAPI = {
  getProjects: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/projects${queryString ? `?${queryString}` : ''}`, {
      requireAuth: false,
    });
  },

  getProject: (id) => apiRequest(`/projects/${id}`, {
    requireAuth: false,
  }),

  createProject: (data) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateProject: (id, data) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteProject: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),

  approveProject: (id) => apiRequest(`/projects/${id}/approve`, {
    method: 'PUT',
  }),

  rejectProject: (id) => apiRequest(`/projects/${id}/reject`, {
    method: 'PUT',
  }),
};

// Investments API
export const investmentsAPI = {
  getInvestments: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/investments${queryString ? `?${queryString}` : ''}`);
  },

  getInvestment: (id) => apiRequest(`/investments/${id}`),

  createInvestment: (data) => apiRequest('/investments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// News API
export const newsAPI = {
  getNews: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/news${queryString ? `?${queryString}` : ''}`, {
      requireAuth: false,
    });
  },

  getNewsItem: (id) => apiRequest(`/news/${id}`, {
    requireAuth: false,
  }),

  createNews: (data) => apiRequest('/news', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateNews: (id, data) => apiRequest(`/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteNews: (id) => apiRequest(`/news/${id}`, {
    method: 'DELETE',
  }),
};

// Notifications API
export const notificationsAPI = {
  getNotifications: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/notifications${queryString ? `?${queryString}` : ''}`);
  },

  markAsRead: (id) => apiRequest(`/notifications/${id}/read`, {
    method: 'PUT',
  }),

  markAllAsRead: () => apiRequest('/notifications/read-all', {
    method: 'PUT',
  }),

  deleteNotification: (id) => apiRequest(`/notifications/${id}`, {
    method: 'DELETE',
  }),
};

// Messages API
export const messagesAPI = {
  getMessages: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/messages${queryString ? `?${queryString}` : ''}`);
  },

  getMessage: (id) => apiRequest(`/messages/${id}`),

  sendMessage: (data) => apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  markAsRead: (id) => apiRequest(`/messages/${id}/read`, {
    method: 'PUT',
  }),

  deleteMessage: (id) => apiRequest(`/messages/${id}`, {
    method: 'DELETE',
  }),
};

// Contact API
export const contactAPI = {
  submitContact: (data) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    requireAuth: false,
  }),
};

// Bookmarks API
export const bookmarksAPI = {
  getBookmarks: () => apiRequest('/bookmarks'),

  toggleBookmark: (projectId) => apiRequest('/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ projectId }),
  }),

  checkBookmark: (projectId) => apiRequest(`/bookmarks/check/${projectId}`),
};

