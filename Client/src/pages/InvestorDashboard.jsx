import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiBookmark, FiTrendingUp, FiDollarSign, FiPieChart } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import { cropTypes, locations } from '../data/mockData';

const InvestorDashboard = () => {
  const { projects, investments, bookmarkedProjects, toggleBookmark } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRange, setFilterRange] = useState('');

  const activeProjects = projects.filter(p => p.status === 'active' && p.approved);
  const myInvestments = investments.filter(inv => inv.investorId === 'investor1');
  const totalInvested = myInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = myInvestments.reduce((sum, inv) => sum + (inv.currentValue - inv.amount), 0);

  const filteredProjects = activeProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = !filterCrop || project.cropType === filterCrop;
    const matchesLocation = !filterLocation || project.location === filterLocation;
    const matchesRange = !filterRange || (
      filterRange === 'low' && project.fundingGoal < 500000 ||
      filterRange === 'medium' && project.fundingGoal >= 500000 && project.fundingGoal < 1000000 ||
      filterRange === 'high' && project.fundingGoal >= 1000000
    );
    return matchesSearch && matchesCrop && matchesLocation && matchesRange;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Investor Dashboard</h1>
          <p className="text-gray-600">Discover and invest in sustainable agriculture projects</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Invested</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalInvested.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Returns</p>
                <p className="text-3xl font-bold text-green-600">+₹{totalReturns.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Investments</p>
                <p className="text-3xl font-bold text-gray-900">{myInvestments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiPieChart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Crops</option>
              {cropTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              value={filterRange}
              onChange={(e) => setFilterRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Ranges</option>
              <option value="low">Low (&lt; ₹5L)</option>
              <option value="medium">Medium (₹5L - ₹10L)</option>
              <option value="high">High (&gt; ₹10L)</option>
            </select>
          </div>
        </Card>

        {/* Projects Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Projects</h2>
          {filteredProjects.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600">No projects found matching your filters.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleBookmark(project.id)}
                      className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <FiBookmark
                        className={`w-5 h-5 ${
                          bookmarkedProjects.includes(project.id)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">
                          ₹{project.amountRaised.toLocaleString('en-IN')} / ₹{project.fundingGoal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((project.amountRaised / project.fundingGoal) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{project.cropType} • {project.location}</span>
                      <span className="font-semibold text-green-600">{project.expectedReturn}% return</span>
                    </div>

                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* My Investments */}
        {myInvestments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Investments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myInvestments.map(investment => {
                const project = projects.find(p => p.id === investment.projectId);
                return (
                  <Card key={investment.id} className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{investment.projectTitle}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invested:</span>
                        <span className="font-semibold">₹{investment.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Value:</span>
                        <span className="font-semibold text-green-600">₹{investment.currentValue.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Return:</span>
                        <span className="font-semibold text-green-600">
                          +₹{(investment.currentValue - investment.amount).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Return:</span>
                        <span className="font-semibold">{investment.expectedReturn}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/projects/${investment.projectId}`)}
                      className="w-full mt-4 text-green-600 hover:text-green-700 font-semibold text-sm"
                    >
                      View Project →
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;

