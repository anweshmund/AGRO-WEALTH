// Helper functions

// Normalize ID - backend uses _id, frontend might use id
export const getId = (item) => {
  return item?._id || item?.id || item;
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format currency
export const formatCurrency = (amount) => {
  return `₹${amount?.toLocaleString('en-IN') || '0'}`;
};

