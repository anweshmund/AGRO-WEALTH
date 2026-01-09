// Simple script to reset admin password to default
// Run with: node scripts/resetAdminPasswordSimple.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const resetAdminPasswordSimple = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find admin user
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
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Reset to default password (pre-save hook will hash it automatically)
    const newPassword = 'admin123';
    admin.password = newPassword;
    await admin.save();

    console.log('✅ Password reset successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: admin@agriwealth.com');
    console.log('New Password: admin123');
    console.log('Role: admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 You can now login at: http://localhost:5173/login');
    console.log('   ⚠️  IMPORTANT: Select "Admin" role in the dropdown!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdminPasswordSimple();

