import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [news, setNews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('currentUser');
    
    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        // Verify token is still valid
        fetchUserData();
      } catch (error) {
        console.error('Error loading user:', error);
        logout();
      }
    }
  }, []);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const user = await api.authAPI.getMe();
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  // Load data when user is logged in
  useEffect(() => {
    if (currentUser) {
      loadAllData();
    }
  }, [currentUser]);

  // Load all data from backend
  const loadAllData = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      await Promise.all([
        loadProjects(),
        loadInvestments(),
        loadNews(),
        loadNotifications(),
        loadMessages(),
        loadBookmarks(),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load projects
  const loadProjects = async (params = {}) => {
    try {
      const data = await api.projectsAPI.getProjects(params);
      setProjects(data);
      return data;
    } catch (error) {
      console.error('Error loading projects:', error);
      throw error;
    }
  };

  // Load investments
  const loadInvestments = async () => {
    if (!currentUser) return;
    try {
      const data = await api.investmentsAPI.getInvestments();
      setInvestments(data);
      return data;
    } catch (error) {
      console.error('Error loading investments:', error);
      throw error;
    }
  };

  // Load news
  const loadNews = async () => {
    try {
      const data = await api.newsAPI.getNews();
      setNews(data);
      return data;
    } catch (error) {
      console.error('Error loading news:', error);
      throw error;
    }
  };

  // Load notifications
  const loadNotifications = async () => {
    if (!currentUser) return;
    try {
      const data = await api.notificationsAPI.getNotifications();
      setNotifications(data);
      return data;
    } catch (error) {
      console.error('Error loading notifications:', error);
      throw error;
    }
  };

  const loadMessages = async () => {
    if (!currentUser) return;
    try {
      const data = await api.messagesAPI.getMessages();
      setMessages(data);
      return data;
    } catch (error) {
      console.error('Error loading messages:', error);
      throw error;
    }
  };
  const loadBookmarks = async () => {
    if (!currentUser) return;
    try {
      const data = await api.bookmarksAPI.getBookmarks();
      const projectIds = data.map(b => b.projectId._id || b.projectId);
      setBookmarkedProjects(projectIds);
      return data;
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await api.authAPI.login(credentials);
      
      // Store token and user
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response));
      setCurrentUser(response);
      
      // Load all data
      await loadAllData();
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
        setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await api.authAPI.register(userData);
      
      // Store token and user
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response));
      setCurrentUser(response);
      
      // Load all data
      await loadAllData();
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setProjects([]);
    setInvestments([]);
    setNews([]);
    setNotifications([]);
    setMessages([]);
    setBookmarkedProjects([]);
  };

  // Add project
  const addProject = async (projectData) => {
    try {
      setLoading(true);
      const newProject = await api.projectsAPI.createProject(projectData);
      setProjects([newProject, ...projects]);
      await loadProjects(); // Reload to get updated data
      return newProject;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update project
  const updateProject = async (projectId, updates) => {
    try {
      setLoading(true);
      const updatedProject = await api.projectsAPI.updateProject(projectId, updates);
      setProjects(projects.map(p => p._id === projectId || p.id === projectId ? updatedProject : p));
      return updatedProject;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      setLoading(true);
      await api.projectsAPI.deleteProject(projectId);
      setProjects(projects.filter(p => (p._id || p.id) !== projectId));
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Approve project
  const approveProject = async (projectId) => {
    try {
      setLoading(true);
      const updatedProject = await api.projectsAPI.approveProject(projectId);
      setProjects(projects.map(p => (p._id || p.id) === projectId ? updatedProject : p));
      return updatedProject;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reject project
  const rejectProject = async (projectId) => {
    try {
      setLoading(true);
      const updatedProject = await api.projectsAPI.rejectProject(projectId);
      setProjects(projects.map(p => (p._id || p.id) === projectId ? updatedProject : p));
      return updatedProject;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Invest in project
  const investInProject = async (projectId, amount) => {
    try {
      setLoading(true);
      const newInvestment = await api.investmentsAPI.createInvestment({
        projectId,
        amount: parseInt(amount)
      });
      setInvestments([...investments, newInvestment]);
      await loadProjects(); // Reload projects to get updated funding
      await loadInvestments(); // Reload investments
      return newInvestment;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Toggle bookmark
  const toggleBookmark = async (projectId) => {
    try {
      const response = await api.bookmarksAPI.toggleBookmark(projectId);
      if (response.bookmarked) {
        setBookmarkedProjects([...bookmarkedProjects, projectId]);
      } else {
        setBookmarkedProjects(bookmarkedProjects.filter(id => id !== projectId));
      }
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Add news
  const addNews = async (newsItem) => {
    try {
      setLoading(true);
      const newNews = await api.newsAPI.createNews(newsItem);
      setNews([newNews, ...news]);
      return newNews;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      await api.notificationsAPI.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        (n._id || n.id) === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Add message
  const addMessage = async (message) => {
    try {
      setLoading(true);
      const newMessage = await api.messagesAPI.sendMessage(message);
      setMessages([...messages, newMessage]);
      return newMessage;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Submit contact form
  const submitContact = async (contactData) => {
    try {
      setLoading(true);
      const response = await api.contactAPI.submitContact(contactData);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    projects,
    investments,
    news,
    notifications,
    messages,
    bookmarkedProjects,
    darkMode,
    loading,
    error,
    setDarkMode,
    login,
    register,
    logout,
    addProject,
    updateProject,
    deleteProject,
    approveProject,
    rejectProject,
    investInProject,
    toggleBookmark,
    addNews,
    markNotificationAsRead,
    addMessage,
    submitContact,
    loadProjects,
    loadInvestments,
    loadNews,
    loadNotifications,
    loadMessages,
    loadBookmarks,
    loadAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
