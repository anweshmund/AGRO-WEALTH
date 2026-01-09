// Test password comparison directly
// Run with: node scripts/testPasswordComparison.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const testPasswordComparison = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const admin = await User.findOne({ email: 'admin@agriwealth.com' });
    
    if (!admin) {
      console.log('❌ Admin not found!');
      process.exit(1);
    }

    console.log('✅ Admin found!');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Password hash (first 20 chars):', admin.password.substring(0, 20) + '...\n');

    const testPasswords = ['admin123', 'Admin123', 'ADMIN123', ' admin123', 'admin123 '];
    
    console.log('Testing password comparisons:\n');
    
    for (const testPwd of testPasswords) {
      try {
        const isValid = await admin.comparePassword(testPwd);
        console.log(`Password: "${testPwd}"`);
        console.log(`  Length: ${testPwd.length}`);
        console.log(`  Valid: ${isValid ? '✅ YES' : '❌ NO'}\n`);
      } catch (error) {
        console.log(`Password: "${testPwd}"`);
        console.log(`  Error: ${error.message}\n`);
      }
    }

    // Test direct bcrypt comparison
    console.log('Testing direct bcrypt comparison:\n');
    const testPwd = 'admin123';
    const directCompare = await bcrypt.compare(testPwd, admin.password);
    console.log(`Direct bcrypt.compare("${testPwd}", hash): ${directCompare ? '✅ YES' : '❌ NO'}\n`);

    // Show what password should be
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('To reset password, run: npm run change-admin-password <new_password>');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

testPasswordComparison();


