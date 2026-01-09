
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const changeAdminPassword = async () => {
  try {
   
    const newPassword = process.argv[2];

    if (!newPassword) {
      console.log('❌ Error: New password is required!');
      console.log('\n📝 Usage:');
      console.log('   node scripts/changeAdminPassword.js <new_password>');
      console.log('\n💡 Example:');
      console.log('   node scripts/changeAdminPassword.js myNewPassword123\n');
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.log('❌ Error: Password must be at least 6 characters!\n');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@agriwealth.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('\n📝 To create admin, run:');
      console.log('   npm run create-admin\n');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ Admin user found!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', admin.email);
    console.log('Name:', admin.name);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Update password (pre-save hook will hash it automatically)
    admin.password = newPassword;
    await admin.save();

    console.log('✅ Password changed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: admin@agriwealth.com');
    console.log('New Password:', newPassword);
    console.log('Role: admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 You can now login at: http://localhost:5173/login');
    console.log('   ⚠️  IMPORTANT: Select "Admin" role in the dropdown!\n');
    console.log('⚠️  SECURITY: Keep this password secure and do not share it!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

changeAdminPassword();

