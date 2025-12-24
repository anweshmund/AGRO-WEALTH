import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiDollarSign, FiShield } from 'react-icons/fi';
import Card from '../components/Card';

const RoleSelection = () => {
  const roles = [
    {
      id: 'farmer',
      title: 'Farmer',
      description: 'Create farm projects, connect with investors, and grow your agricultural business',
      icon: FiUser,
      color: 'green',
      link: '/signup?role=farmer'
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Discover investment opportunities in sustainable agriculture and support farmers',
      icon: FiDollarSign,
      color: 'amber',
      link: '/signup?role=investor'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage platform operations, approve projects, and oversee the community',
      icon: FiShield,
      color: 'blue',
      link: '/login?role=admin'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select how you want to participate in the AgroWealth platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const colorClasses = {
              green: {
                bg: 'bg-green-100',
                text: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700'
              },
              amber: {
                bg: 'bg-amber-100',
                text: 'text-amber-600',
                button: 'bg-amber-600 hover:bg-amber-700'
              },
              blue: {
                bg: 'bg-blue-100',
                text: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700'
              }
            };
            const colors = colorClasses[role.color];
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={role.link}>
                  <Card className="p-8 text-center h-full hover:shadow-xl transition-shadow">
                    <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`w-10 h-10 ${colors.text}`} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{role.title}</h2>
                    <p className="text-gray-600 mb-6">{role.description}</p>
                    <div className={`inline-block px-6 py-3 ${colors.button} text-white rounded-lg font-semibold transition-colors`}>
                      Continue as {role.title}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;

