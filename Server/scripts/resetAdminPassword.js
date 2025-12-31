// Reset admin password
// Run with: node scripts/resetAdminPassword.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const resetAdminPassword = async () => {
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
      rl.close();
      process.exit(1);
    }

    console.log('✅ Admin user found!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', admin.email);
    console.log('Name:', admin.name);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Get new password
    const newPassword = await question('Enter new password (min 6 characters): ');
    
    if (newPassword.length < 6) {
      console.log('\n❌ Password must be at least 6 characters!');
      rl.close();
      process.exit(1);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    console.log('\n✅ Password reset successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: admin@agriwealth.com');
    console.log('New Password:', newPassword);
    console.log('Role: admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 You can now login at: http://localhost:5173/login');
    console.log('   Select role: Admin\n');

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
};

resetAdminPassword();

