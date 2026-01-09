

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const changeUserPassword = async () => {
  try {
    const email = process.argv[2];
    const newPassword = process.argv[3];

    if (!email || !newPassword) {
      console.log('❌ Error: Email and new password are required!');
      console.log('\n📝 Usage:');
      console.log('   node scripts/changeUserPassword.js <email> <new_password>');
      console.log('\n💡 Example:');
      console.log('   node scripts/changeUserPassword.js admin@agriwealth.com myNewPassword123\n');
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.log('❌ Error: Password must be at least 6 characters!\n');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      console.log(`❌ User not found with email: ${email}`);
      console.log('\n💡 Make sure the email is correct.\n');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ User found!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', user.email);
    console.log('Name:', user.name);
    console.log('Role:', user.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Update password (pre-save hook will hash it automatically)
    user.password = newPassword;
    await user.save();

    console.log('✅ Password changed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', user.email);
    console.log('New Password:', newPassword);
    console.log('Role:', user.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 User can now login with the new password\n');
    console.log('⚠️  SECURITY: Keep this password secure and do not share it!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

changeUserPassword();

