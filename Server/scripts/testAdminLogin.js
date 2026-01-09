// Test admin login
// Run with: node scripts/testAdminLogin.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const testAdminLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if admin exists
    const admin = await User.findOne({ email: 'admin@agriwealth.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('\n📝 To create admin, run:');
      console.log('   npm run create-admin\n');
      process.exit(1);
    }

    console.log('✅ Admin user found!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', admin.email);
    console.log('Name:', admin.name);
    console.log('Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test password
    const testPassword = 'admin123';
    const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
    
    if (isPasswordValid) {
      console.log('✅ Password is correct!');
      console.log('   Default password "admin123" works.\n');
    } else {
      console.log('❌ Password is incorrect!');
      console.log('   The password has been changed from default.');
      console.log('   Use the password you set, or reset it.\n');
    }

    // Check role
    if (admin.role === 'admin') {
      console.log('✅ Role is correct (admin)\n');
    } else {
      console.log('❌ Role mismatch!');
      console.log(`   Current role: ${admin.role}`);
      console.log('   Expected: admin');
      console.log('\n   To fix, update in MongoDB or run:');
      console.log('   npm run create-admin\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Login Credentials:');
    console.log('   Email: admin@agriwealth.com');
    console.log('   Password: admin123 (if not changed)');
    console.log('   Role: admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🌐 Test login at: http://localhost:5173/login');
    console.log('   Make sure to select "Admin" role in the dropdown!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testAdminLogin();


