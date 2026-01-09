// Test the login API endpoint directly
// Run with: node scripts/testLoginAPI.js

import dotenv from 'dotenv';
dotenv.config();

const testLoginAPI = async () => {
  const API_URL = process.env.API_URL || 'http://localhost:5000/api';
  
  const credentials = {
    email: 'admin@agriwealth.com',
    password: 'admin123',
    role: 'admin'
  };

  console.log('🧪 Testing Login API\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Credentials:');
  console.log('  Email:', credentials.email);
  console.log('  Password:', credentials.password);
  console.log('  Role:', credentials.role);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    console.log('📡 Sending POST request to:', `${API_URL}/auth/login`);
    console.log('Request body:', JSON.stringify(credentials, null, 2));
    console.log('');

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    console.log('📥 Response Status:', response.status, response.statusText);
    console.log('Response Body:', JSON.stringify(data, null, 2));
    console.log('');

    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('User:', data.name);
      console.log('Email:', data.email);
      console.log('Role:', data.role);
      console.log('Token:', data.token ? `${data.token.substring(0, 20)}...` : 'Missing');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('❌ Login failed!');
      console.log('Error message:', data.message);
      console.log('');
      
      if (response.status === 401) {
        console.log('💡 Possible issues:');
        console.log('   1. Wrong email or password');
        console.log('   2. Role mismatch (selected role doesn\'t match user role)');
        console.log('   3. User doesn\'t exist in database');
        console.log('');
        console.log('🔧 Try running: npm run diagnose-admin');
      }
    }

    process.exit(response.ok ? 0 : 1);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('💡 Possible issues:');
    console.log('   1. Backend server is not running');
    console.log('   2. Wrong API URL');
    console.log('   3. Network/CORS issue');
    console.log('');
    console.log('🔧 Make sure backend is running: npm run dev');
    process.exit(1);
  }
};

testLoginAPI();

