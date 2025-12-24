// Mock data for AgroWealth Platform

export const mockUsers = {
  farmer1: {
    id: 'farmer1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    location: 'Punjab, India',
    bio: 'Third-generation farmer specializing in organic crops',
    phone: '+91 98765 43210',
    joinDate: '2023-01-15'
  },
  investor1: {
    id: 'investor1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'investor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    location: 'Delhi, India',
    bio: 'Sustainable agriculture investor',
    phone: '+91 98765 43211',
    joinDate: '2023-02-20',
    totalInvested: 10000000,
    activeInvestments: 8
  },
  admin1: {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@agriwealth.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
  }
};

export const mockProjects = [
  {
    id: 'proj1',
    farmerId: 'farmer1',
    farmerName: 'John Smith',
    title: 'Organic Wheat Farm Expansion',
    cropType: 'Wheat',
    location: 'Punjab, India',
    description: 'Expanding our organic wheat production to meet growing demand. This project includes new irrigation systems and sustainable farming practices.',
    fundingGoal: 4000000,
    amountRaised: 2600000,
    duration: 12,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    expectedReturn: 15,
    investors: 23,
    approved: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'proj2',
    farmerId: 'farmer1',
    farmerName: 'John Smith',
    title: 'Sustainable Corn Production',
    cropType: 'Corn',
    location: 'Haryana, India',
    description: 'Implementing sustainable corn farming techniques with advanced irrigation and organic fertilizers.',
    fundingGoal: 6000000,
    amountRaised: 1440000,
    duration: 18,
    startDate: '2024-02-01',
    endDate: '2025-08-01',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    expectedReturn: 18,
    investors: 12,
    approved: true,
    createdAt: '2024-01-25'
  },
  {
    id: 'proj3',
    farmerId: 'farmer1',
    farmerName: 'John Smith',
    title: 'Organic Vegetable Garden',
    cropType: 'Vegetables',
    location: 'Maharashtra, India',
    description: 'Small-scale organic vegetable production focusing on tomatoes, peppers, and leafy greens.',
    fundingGoal: 2400000,
    amountRaised: 0,
    duration: 6,
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    expectedReturn: 12,
    investors: 0,
    approved: false,
    createdAt: '2024-02-15'
  },
  {
    id: 'proj4',
    farmerId: 'farmer1',
    farmerName: 'John Smith',
    title: 'Apple Orchard Modernization',
    cropType: 'Fruits',
    location: 'Karnataka, India',
    description: 'Modernizing our apple orchard with new equipment and sustainable farming practices.',
    fundingGoal: 8000000,
    amountRaised: 3600000,
    duration: 24,
    startDate: '2024-01-01',
    endDate: '2026-01-01',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop',
    expectedReturn: 20,
    investors: 35,
    approved: true,
    createdAt: '2023-12-20'
  },
  {
    id: 'proj5',
    farmerId: 'farmer1',
    farmerName: 'John Smith',
    title: 'Rice Paddy Expansion',
    cropType: 'Rice',
    location: 'Uttar Pradesh, India',
    description: 'Expanding rice production with water-efficient farming methods.',
    fundingGoal: 4800000,
    amountRaised: 2240000,
    duration: 12,
    startDate: '2024-02-15',
    endDate: '2025-02-15',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
    expectedReturn: 16,
    investors: 18,
    approved: true,
    createdAt: '2024-02-01'
  }
];

export const mockInvestments = [
  {
    id: 'inv1',
    investorId: 'investor1',
    projectId: 'proj1',
    projectTitle: 'Organic Wheat Farm Expansion',
    amount: 400000,
    date: '2024-01-20',
    status: 'active',
    expectedReturn: 15,
    currentValue: 460000
  },
  {
    id: 'inv2',
    investorId: 'investor1',
    projectId: 'proj2',
    projectTitle: 'Sustainable Corn Production',
    amount: 800000,
    date: '2024-02-05',
    status: 'active',
    expectedReturn: 18,
    currentValue: 944000
  },
  {
    id: 'inv3',
    investorId: 'investor1',
    projectId: 'proj4',
    projectTitle: 'Apple Orchard Modernization',
    amount: 1200000,
    date: '2024-01-05',
    status: 'active',
    expectedReturn: 20,
    currentValue: 1440000
  }
];

export const mockNews = [
  {
    id: 'news1',
    title: 'Sustainable Farming Practices on the Rise',
    content: 'Farmers across the country are adopting more sustainable farming practices, leading to better yields and environmental protection.',
    author: 'Admin',
    date: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop',
    category: 'Sustainability'
  },
  {
    id: 'news2',
    title: 'New Investment Opportunities in Organic Agriculture',
    content: 'The organic agriculture sector is experiencing unprecedented growth, creating new investment opportunities for forward-thinking investors.',
    author: 'Admin',
    date: '2024-02-18',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
    category: 'Investment'
  },
  {
    id: 'news3',
    title: 'Technology Revolutionizing Modern Farming',
    content: 'From AI-powered crop monitoring to automated irrigation systems, technology is transforming how we farm.',
    author: 'Admin',
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    category: 'Technology'
  },
  {
    id: 'news4',
    title: 'Climate-Smart Agriculture: The Future of Farming',
    content: 'Farmers are adapting to climate change through innovative techniques that ensure food security for future generations.',
    author: 'Admin',
    date: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop',
    category: 'Climate'
  }
];

export const mockNotifications = [
  {
    id: 'notif1',
    userId: 'farmer1',
    type: 'investment',
    message: 'New investment of ₹4,00,000 received for Organic Wheat Farm Expansion',
    date: '2024-02-20',
    read: false
  },
  {
    id: 'notif2',
    userId: 'farmer1',
    type: 'project',
    message: 'Your project "Organic Vegetable Garden" is pending approval',
    date: '2024-02-18',
    read: false
  },
  {
    id: 'notif3',
    userId: 'farmer1',
    type: 'message',
    message: 'New message from investor Sarah Johnson',
    date: '2024-02-15',
    read: true
  }
];

export const mockMessages = [
  {
    id: 'msg1',
    from: 'investor1',
    fromName: 'Sarah Johnson',
    to: 'farmer1',
    toName: 'John Smith',
    subject: 'Interest in Organic Wheat Project',
    content: 'Hi John, I\'m very interested in your Organic Wheat Farm Expansion project. Could we schedule a call to discuss the details?',
    date: '2024-02-18',
    read: false
  },
  {
    id: 'msg2',
    from: 'farmer1',
    fromName: 'John Smith',
    to: 'investor1',
    toName: 'Sarah Johnson',
    subject: 'Re: Interest in Organic Wheat Project',
    content: 'Hi Sarah, thank you for your interest! I\'d be happy to discuss the project. Let me know your availability.',
    date: '2024-02-19',
    read: true
  }
];

export const cropTypes = ['Wheat', 'Corn', 'Rice', 'Vegetables', 'Fruits', 'Cotton', 'Soybeans', 'Barley', 'Sugarcane', 'Potato'];
export const locations = ['Punjab, India', 'Haryana, India', 'Uttar Pradesh, India', 'Maharashtra, India', 'Karnataka, India', 'Tamil Nadu, India', 'Gujarat, India', 'Rajasthan, India'];

