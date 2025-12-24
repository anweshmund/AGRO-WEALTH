import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, mockProjects, mockInvestments, mockNews, mockNotifications, mockMessages } from '../data/mockData';

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
  const [projects, setProjects] = useState(mockProjects);
  const [investments, setInvestments] = useState(mockInvestments);
  const [news, setNews] = useState(mockNews);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [messages, setMessages] = useState(mockMessages);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    const savedBookmarks = localStorage.getItem('bookmarkedProjects');
    if (savedBookmarks) {
      setBookmarkedProjects(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarkedProjects', JSON.stringify(bookmarkedProjects));
  }, [bookmarkedProjects]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `proj${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      amountRaised: 0,
      investors: 0,
      approved: false,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects([newProject, ...projects]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, ...updates } : p));
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const approveProject = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, approved: true, status: 'active' } : p
    ));
  };

  const rejectProject = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, approved: false, status: 'rejected' } : p
    ));
  };

  const investInProject = (projectId, amount) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newInvestment = {
        id: `inv${Date.now()}`,
        investorId: currentUser.id,
        projectId: projectId,
        projectTitle: project.title,
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        expectedReturn: project.expectedReturn,
        currentValue: amount
      };
      setInvestments([...investments, newInvestment]);
      updateProject(projectId, {
        amountRaised: project.amountRaised + amount,
        investors: project.investors + 1
      });
      return newInvestment;
    }
  };

  const toggleBookmark = (projectId) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const addNews = (newsItem) => {
    const newNews = {
      ...newsItem,
      id: `news${Date.now()}`,
      author: currentUser.name,
      date: new Date().toISOString().split('T')[0]
    };
    setNews([newNews, ...news]);
    return newNews;
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: `msg${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    setMessages([...messages, newMessage]);
    return newMessage;
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
    setDarkMode,
    login,
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
    addMessage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

