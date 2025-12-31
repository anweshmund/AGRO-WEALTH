# Fix Admin Password Issue

## 🔍 Problem Identified

Your admin account exists, but the password has been changed from the default.

**Current Status:**
- ✅ Admin user exists
- ✅ Role is correct (admin)
- ❌ Password doesn't match "admin123"

## 🔧 Solution: Reset Admin Password

### Option 1: Reset Password (Interactive)

```bash
cd Server
npm run reset-admin
```

This will:
1. Ask you to enter a new password
2. Reset the admin password
3. Show you the new credentials

### Option 2: Recreate Admin Account

```bash
cd Server
npm run create-admin
```

**Note:** This will fail if admin already exists. You need to delete the admin user first from MongoDB, or use Option 1.

### Option 3: Delete and Recreate

1. **Delete admin from MongoDB:**
   - Go to MongoDB Atlas
   - Browse Collections → `users`
   - Find user with email: `admin@agriwealth.com`
   - Delete the document

2. **Create new admin:**
   ```bash
   cd Server
   npm run create-admin
   ```

## ✅ After Resetting Password

1. **Login at:** `http://localhost:5173/login`
2. **Select role:** Admin
3. **Email:** `admin@agriwealth.com`
4. **Password:** (the new password you set)

## 🚀 Quick Fix Command

```bash
cd Server
npm run reset-admin
```

Then enter your new password when prompted!

