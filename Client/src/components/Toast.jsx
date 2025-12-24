import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`min-w-[300px] p-4 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-green-50 border border-green-200' :
              toast.type === 'error' ? 'bg-red-50 border border-red-200' :
              toast.type === 'info' ? 'bg-blue-50 border border-blue-200' :
              'bg-amber-50 border border-amber-200'
            }`}
          >
            {toast.type === 'success' && <FiCheckCircle className="w-5 h-5 text-green-600" />}
            {toast.type === 'error' && <FiXCircle className="w-5 h-5 text-red-600" />}
            {toast.type === 'info' && <FiInfo className="w-5 h-5 text-blue-600" />}
            {toast.type === 'warning' && <FiAlertCircle className="w-5 h-5 text-amber-600" />}
            <p className={`flex-1 ${
              toast.type === 'success' ? 'text-green-800' :
              toast.type === 'error' ? 'text-red-800' :
              toast.type === 'info' ? 'text-blue-800' :
              'text-amber-800'
            }`}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;

