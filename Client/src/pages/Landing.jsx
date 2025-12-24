import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/logo.png" alt="AgroWealth Logo" className="h-8 w-auto" />
              <span className="text-green-400 font-semibold">We grow beyond crops</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Driving Growth the Green Way
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Connect with Agriculture & Organic Farms — where every message plants a seed of collaboration, growth, and a greener tomorrow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/role-selection">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get Started <FiArrowRight />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AgroWealth?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering farmers and connecting them with investors for sustainable agricultural growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Pure Growth</h3>
              <p className="text-gray-600">
                Let's stay connected and grow together naturally. Support sustainable farming practices.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Field Connect</h3>
              <p className="text-gray-600">
                Connect directly with farmers and investors. Build meaningful partnerships.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Investment</h3>
              <p className="text-gray-600">
                Invest in agriculture projects with transparent returns and sustainable impact.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Active Farmers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-gray-200">Investors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">₹16Cr+</div>
              <div className="text-gray-200">Funded Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-gray-200">Active Projects</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Grow Together?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our platform today and be part of the sustainable agriculture revolution
            </p>
            <Link to="/role-selection">
              <Button variant="primary" size="lg">
                Get Started <FiArrowRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

