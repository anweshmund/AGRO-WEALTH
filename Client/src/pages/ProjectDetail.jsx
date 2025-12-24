import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookmark, FiCalendar, FiMapPin, FiDollarSign, FiUsers, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentUser, toggleBookmark, bookmarkedProjects, investInProject } = useApp();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
        </Card>
      </div>
    );
  }

  const progress = (project.amountRaised / project.fundingGoal) * 100;
  const isBookmarked = bookmarkedProjects.includes(project.id);
  const canInvest = currentUser?.role === 'investor' && project.status === 'active' && project.approved;

  const handleInvest = () => {
    const amount = parseInt(investmentAmount);
    if (amount && amount >= 10000) {
      investInProject(project.id, amount);
      setShowInvestModal(false);
      setInvestmentAmount('');
      alert(`Successfully invested ₹${amount.toLocaleString('en-IN')} in ${project.title}!`);
    } else {
      alert('Minimum investment is ₹10,000');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <FiArrowLeft /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleBookmark(project.id)}
                  className="absolute top-4 right-4 p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <FiBookmark
                    className={`w-6 h-6 ${
                      isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    project.status === 'active' ? 'bg-green-100 text-green-700' :
                    project.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-gray-600">{project.cropType}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <FiMapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{project.duration} months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiUsers className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Investors</p>
                      <p className="font-semibold">{project.investors}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiDollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Expected Return</p>
                      <p className="font-semibold">{project.expectedReturn}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Farmer Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About the Farmer</h2>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt={project.farmerName}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">{project.farmerName}</p>
                  <p className="text-gray-600">Experienced farmer specializing in {project.cropType}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Investment Details</h2>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Funding Goal</span>
                  <span className="font-semibold">₹{project.fundingGoal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Amount Raised</span>
                  <span className="font-semibold text-green-600">₹{project.amountRaised.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 text-center">{progress.toFixed(1)}% funded</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="font-semibold text-green-600">{project.expectedReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{project.duration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date</span>
                  <span className="font-semibold">{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              {canInvest ? (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowInvestModal(true)}
                >
                  Invest Now
                </Button>
              ) : (
                <div className="text-center text-gray-600 text-sm">
                  {currentUser?.role !== 'investor' && 'Sign in as investor to invest'}
                  {currentUser?.role === 'investor' && project.status !== 'active' && 'Project is not active'}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Invest Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Invest in {project.title}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount (₹)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount (min ₹10,000)"
                min="10000"
              />
              <p className="text-sm text-gray-600 mt-2">
                Expected return: {investmentAmount ? `₹${((parseInt(investmentAmount) || 0) * (1 + project.expectedReturn / 100)).toLocaleString('en-IN')}` : '--'}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleInvest}
              >
                Confirm Investment
              </Button>
              <Button
                variant="outline"
                onClick={() => { setShowInvestModal(false); setInvestmentAmount(''); }}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;

