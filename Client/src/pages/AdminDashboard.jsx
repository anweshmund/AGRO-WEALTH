import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiUsers, FiFolder, FiDollarSign, FiFileText } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import NewsForm from '../components/NewsForm';

const AdminDashboard = () => {
  const { projects, news, addNews, approveProject, rejectProject } = useApp();
  const [showNewsForm, setShowNewsForm] = useState(false);

  const pendingProjects = projects.filter(p => p.status === 'pending' || !p.approved);
  const totalUsers = 750; // Mock data
  const totalProjects = projects.length;
  const totalInvestments = projects.reduce((sum, p) => sum + p.amountRaised, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform operations and content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiFolder className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Investments</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalInvestments.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
                <p className="text-3xl font-bold text-gray-900">{pendingProjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects Pending Approval</h2>
          {pendingProjects.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600">No projects pending approval.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingProjects.map(project => (
                <Card key={project.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{project.cropType}</span>
                          <span>•</span>
                          <span>{project.location}</span>
                          <span>•</span>
                          <span>Goal: ₹{project.fundingGoal.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">By: {project.farmerName}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => approveProject(project.id)}
                      >
                        <FiCheck /> Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => rejectProject(project.id)}
                      >
                        <FiX /> Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* News Management */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">News & Updates</h2>
            <Button onClick={() => setShowNewsForm(true)}>
              <FiFileText /> Add News
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map(item => (
              <Card key={item.id} className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs text-green-600 font-semibold">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
                  <p className="text-xs text-gray-500 mt-4">{item.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* News Form Modal */}
        {showNewsForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add News Article</h2>
                <button
                  onClick={() => setShowNewsForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <NewsForm
                onSubmit={(data) => {
                  addNews(data);
                  setShowNewsForm(false);
                }}
                onCancel={() => setShowNewsForm(false)}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

