import React from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';

const Profile = () => {
  const { currentUser, projects, investments } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-12 text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </Card>
      </div>
    );
  }

  const userProjects = projects.filter(p => p.farmerId === currentUser.id);
  const userInvestments = investments.filter(inv => inv.investorId === currentUser.id);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentUser.name}</h1>
                <p className="text-gray-600 mb-4">{currentUser.email}</p>
                {currentUser.location && (
                  <p className="text-gray-600 mb-2">📍 {currentUser.location}</p>
                )}
                {currentUser.phone && (
                  <p className="text-gray-600 mb-2">📞 {currentUser.phone}</p>
                )}
                {currentUser.bio && (
                  <p className="text-gray-700 mt-4">{currentUser.bio}</p>
                )}
                <div className="mt-4">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </span>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </Card>

          {currentUser.role === 'farmer' && userProjects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map(project => (
                  <Card key={project.id} className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{project.cropType}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Raised:</span>
                      <span className="font-semibold">₹{project.amountRaised.toLocaleString('en-IN')}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentUser.role === 'investor' && userInvestments.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Investments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userInvestments.map(investment => (
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
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

