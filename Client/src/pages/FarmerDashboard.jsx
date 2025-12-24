import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiBell, FiTrendingUp, FiDollarSign, FiUsers } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import ProjectForm from '../components/ProjectForm';

const FarmerDashboard = () => {
  const { currentUser, projects, notifications, addProject, updateProject, deleteProject } = useApp();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const myProjects = projects.filter(p => p.farmerId === currentUser?.id);
  const activeProjects = myProjects.filter(p => p.status === 'active');
  const pendingProjects = myProjects.filter(p => p.status === 'pending');
  const totalRaised = myProjects.reduce((sum, p) => sum + p.amountRaised, 0);
  const totalGoal = myProjects.reduce((sum, p) => sum + p.fundingGoal, 0);
  const unreadNotifications = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  const handleFormSubmit = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      setEditingProject(null);
    } else {
      addProject(projectData);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{myProjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Amount Raised</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalRaised.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">{activeProjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Notifications</p>
                <p className="text-3xl font-bold text-gray-900">{unreadNotifications}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FiBell className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
          <Button onClick={() => { setEditingProject(null); setShowForm(true); }}>
            <FiPlus /> Create New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {myProjects.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600 mb-4">You haven't created any projects yet.</p>
            <Button onClick={() => setShowForm(true)}>Create Your First Project</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'active' ? 'bg-green-500 text-white' :
                      project.status === 'pending' ? 'bg-amber-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
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
                    <span>{project.cropType}</span>
                    <span>{project.investors} investors</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <FiEye /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </h2>
                <button
                  onClick={() => { setShowForm(false); setEditingProject(null); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ProjectForm
                project={editingProject}
                onSubmit={handleFormSubmit}
                onCancel={() => { setShowForm(false); setEditingProject(null); }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;

