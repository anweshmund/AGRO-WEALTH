import React from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

const News = () => {
  const { news } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Agriculture News & Updates</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest trends and developments in sustainable agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                <p className="text-xs text-gray-500 mt-4">By {item.author}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

