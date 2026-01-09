// Comprehensive diagnostic script for admin login issues
// Run with: node scripts/diagnoseAdminLogin.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

dotenv.config();

const diagnoseAdminLogin = async () => {
  console.log('🔍 Admin Login Diagnostic Tool\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let issuesFound = [];
  let allGood = true;

  // Check 1: Environment Variables
  console.log('1️⃣  Checking Environment Variables...');
  if (!process.env.MONGODB_URI) {
    console.log('   ❌ MONGODB_URI is missing!');
    issuesFound.push('MONGODB_URI is not set in .env file');
    allGood = false;
  } else {
    console.log('   ✅ MONGODB_URI is set');
  }

  if (!process.env.JWT_SECRET) {
    console.log('   ❌ JWT_SECRET is missing!');
    issuesFound.push('JWT_SECRET is not set in .env file - this will cause login to fail');
    allGood = false;
  } else {
    console.log('   ✅ JWT_SECRET is set');
  }

  console.log('');

  // Check 2: MongoDB Connection
  console.log('2️⃣  Testing MongoDB Connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('   ✅ Successfully connected to MongoDB\n');
  } catch (error) {
    console.log('   ❌ Failed to connect to MongoDB');
    console.log(`   Error: ${error.message}\n`);
    issuesFound.push(`MongoDB connection failed: ${error.message}`);
    allGood = false;
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('❌ Cannot proceed with further checks due to MongoDB connection failure.\n');
    process.exit(1);
  }

  // Check 3: Admin User Exists
  console.log('3️⃣  Checking if Admin User Exists...');
  let admin;
  try {
    admin = await User.findOne({ email: 'admin@agriwealth.com' });
    if (!admin) {
      console.log('   ❌ Admin user not found!');
      issuesFound.push('Admin user does not exist in database');
      allGood = false;
      console.log('\n   💡 Solution: Run "npm run create-admin" to create admin user\n');
    } else {
      console.log('   ✅ Admin user found!');
      console.log(`   Name: ${admin.name}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Role: ${admin.role}\n`);
    }
  } catch (error) {
    console.log(`   ❌ Error checking admin: ${error.message}\n`);
    issuesFound.push(`Error checking admin user: ${error.message}`);
    allGood = false;
  }

  // Check 4: Admin Role
  if (admin) {
    console.log('4️⃣  Checking Admin Role...');
    if (admin.role !== 'admin') {
      console.log(`   ❌ Role mismatch! Current role: "${admin.role}", Expected: "admin"`);
      issuesFound.push(`Admin role is "${admin.role}" but should be "admin"`);
      allGood = false;
    } else {
      console.log('   ✅ Role is correct (admin)\n');
    }
  }

  // Check 5: Password Test
  if (admin) {
    console.log('5️⃣  Testing Password...');
    const testPassword = 'admin123';
    try {
      const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
      if (isPasswordValid) {
        console.log('   ✅ Default password "admin123" works\n');
      } else {
        console.log('   ⚠️  Default password "admin123" does not work');
        console.log('   💡 Password has been changed from default\n');
        issuesFound.push('Password has been changed from default "admin123"');
      }
    } catch (error) {
      console.log(`   ❌ Error testing password: ${error.message}\n`);
      issuesFound.push(`Password test error: ${error.message}`);
      allGood = false;
    }
  }

  // Check 6: JWT Token Generation
  console.log('6️⃣  Testing JWT Token Generation...');
  if (!process.env.JWT_SECRET) {
    console.log('   ❌ Cannot test - JWT_SECRET is missing\n');
  } else if (!admin) {
    console.log('   ⚠️  Cannot test - Admin user not found\n');
  } else {
    try {
      const token = generateToken(admin._id);
      if (token) {
        console.log('   ✅ Token generation successful');
        console.log(`   Token preview: ${token.substring(0, 20)}...\n`);
      }
    } catch (error) {
      console.log(`   ❌ Token generation failed: ${error.message}\n`);
      issuesFound.push(`JWT token generation failed: ${error.message}`);
      allGood = false;
    }
  }

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📋 DIAGNOSTIC SUMMARY\n');

  if (allGood && admin) {
    console.log('✅ All checks passed! Admin login should work.\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Login Credentials:');
    console.log('   Email: admin@agriwealth.com');
    console.log('   Password: admin123 (if not changed)');
    console.log('   Role: Admin (select in dropdown)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 Login at: http://localhost:5173/login');
    console.log('   ⚠️  IMPORTANT: Select "Admin" role in the dropdown!\n');
  } else {
    console.log('❌ Issues Found:\n');
    issuesFound.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
    console.log('\n');

    // Provide solutions
    console.log('💡 Recommended Solutions:\n');
    
    if (issuesFound.some(i => i.includes('JWT_SECRET'))) {
      console.log('   1. Add JWT_SECRET to your .env file:');
      console.log('      JWT_SECRET=your_secret_key_here\n');
    }
    
    if (issuesFound.some(i => i.includes('Admin user does not exist'))) {
      console.log('   2. Create admin user:');
      console.log('      npm run create-admin\n');
    }
    
    if (issuesFound.some(i => i.includes('Role mismatch'))) {
      console.log('   3. Fix admin role in MongoDB or recreate admin:');
      console.log('      npm run create-admin\n');
    }
    
    if (issuesFound.some(i => i.includes('Password has been changed'))) {
      console.log('   4. Reset admin password:');
      console.log('      npm run reset-admin\n');
    }
  }

  await mongoose.connection.close();
  process.exit(allGood ? 0 : 1);
};

diagnoseAdminLogin();

