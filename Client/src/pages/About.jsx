import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';
import Card from '../components/Card';

const About = () => {
  const values = [
    {
      icon: FiTarget,
      title: 'Our Mission',
      description: 'To connect farmers with investors and create sustainable growth in agriculture'
    },
    {
      icon: FiUsers,
      title: 'Community First',
      description: 'Building a strong community of farmers, investors, and agriculture enthusiasts'
    },
    {
      icon: FiTrendingUp,
      title: 'Sustainable Growth',
      description: 'Promoting environmentally responsible farming practices and long-term success'
    },
    {
      icon: FiHeart,
      title: 'Transparency',
      description: 'Ensuring clear communication and honest relationships between all parties'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">About AgroWealth</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Empowering farmers and connecting them with investors for sustainable agricultural growth
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AgroWealth is a revolutionary platform that bridges the gap between farmers seeking funding 
              and investors looking for sustainable agriculture opportunities. We believe in the power of 
              collaboration and the importance of supporting local agriculture.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our platform provides farmers with the resources they need to expand their operations, 
              implement sustainable practices, and grow their businesses. At the same time, we offer 
              investors transparent, impactful investment opportunities in the agriculture sector.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Together, we're building a greener, more sustainable future for agriculture.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

