# Admin Account Setup Guide

## 🎯 How to Create an Admin Account

There are **3 ways** to create an admin account:

---

## Method 1: Register Through Frontend (Easiest)

1. **Start your frontend server:**
   ```bash
   cd Client
   npm run dev
   ```

2. **Go to signup page:**
   - Visit: `http://localhost:5173/signup?role=admin`
   - Or go to `/role-selection` and select "Admin"

3. **Fill in the form:**
   - Name: Your name
   - Email: `admin@agriwealth.com` (or any email)
   - Password: Choose a strong password
   - Phone & Location: Optional

4. **Click "Create Account"**
   - Account is created in MongoDB
   - You're automatically logged in

5. **Login:**
   - Go to `/login`
   - Select role: **Admin**
   - Enter your email and password

---

## Method 2: Use the Script (Recommended for First Admin)

1. **Make sure backend is set up:**
   ```bash
   cd Server
   # Make sure .env file exists with MONGODB_URI
   ```

2. **Run the admin creation script:**
   ```bash
   node scripts/createAdmin.js
   ```

3. **Default credentials:**
   - Email: `admin@agriwealth.com`
   - Password: `admin123`
   - **⚠️ Change this password immediately after first login!**

4. **Login:**
   - Go to `http://localhost:5173/login`
   - Select role: **Admin**
   - Email: `admin@agriwealth.com`
   - Password: `admin123`

---

## Method 3: Create via MongoDB Atlas (Advanced)

1. **Go to MongoDB Atlas:**
   - Open your cluster
   - Click "Browse Collections"

2. **Find the `users` collection:**
   - Navigate to your database → `users` collection

3. **Insert a new document:**
   ```json
   {
     "name": "Admin User",
     "email": "admin@agriwealth.com",
     "password": "$2a$10$...", // Hashed password (use script to generate)
     "role": "admin",
     "phone": "+91 9876543210",
     "location": "India",
     "isVerified": true,
     "createdAt": "2024-01-01T00:00:00.000Z",
     "updatedAt": "2024-01-01T00:00:00.000Z"
   }
   ```

   **Note:** You need to hash the password first. Use the script method instead.

---

## 🔐 Default Admin Credentials (From Script)

If you used the script:
- **Email:** `admin@agriwealth.com`
- **Password:** `admin123`
- **Role:** `admin`

**⚠️ SECURITY WARNING:** Change this password immediately after first login!

---

## ✅ Verify Admin Account

After creating admin account:

1. **Login:**
   - Go to `/login`
   - Select "Admin" role
   - Enter credentials

2. **Check Dashboard:**
   - Should redirect to `/admin/dashboard`
   - You should see admin features:
     - Approve/Reject projects
     - Manage users
     - Create news
     - View all data

---

## 🔄 Change Admin Password

### Option 1: Through Frontend
1. Login as admin
2. Go to `/profile`
3. Update password (if profile page has this feature)

### Option 2: Through API
```bash
# Update user endpoint (requires authentication)
PUT /api/users/:id
{
  "password": "new_password"
}
```

### Option 3: Reset via Script
1. Delete the admin user from database
2. Run the script again with new password

---

## 🛡️ Security Best Practices

1. ✅ **Use strong passwords** (min 8 characters, mix of letters, numbers, symbols)
2. ✅ **Change default password** immediately
3. ✅ **Don't share admin credentials**
4. ✅ **Use different emails** for different admin accounts
5. ✅ **Enable 2FA** if available (future feature)

---

## 📝 Create Multiple Admins

You can create multiple admin accounts:

1. **Via Frontend:** Register with different emails, select "Admin" role
2. **Via Script:** Modify the script to create different admins
3. **Via API:** Use the registration endpoint with `role: "admin"`

---

## 🆘 Troubleshooting

### "Admin account not working"
- ✅ Check if user exists in MongoDB
- ✅ Verify `role` field is set to `"admin"`
- ✅ Check password is correct
- ✅ Make sure backend is running

### "Cannot access admin dashboard"
- ✅ Verify you're logged in
- ✅ Check user role in database
- ✅ Clear browser cache/localStorage
- ✅ Try logging out and back in

### "Script fails to run"
- ✅ Check MongoDB connection string in `.env`
- ✅ Make sure MongoDB is accessible
- ✅ Verify all dependencies are installed

---

## 🚀 Quick Start

**Fastest way to get admin access:**

```bash
# 1. Start backend
cd Server
npm run dev

# 2. In another terminal, create admin
cd Server
node scripts/createAdmin.js

# 3. Start frontend
cd Client
npm run dev

# 4. Login at http://localhost:5173/login
#    Role: Admin
#    Email: admin@agriwealth.com
#    Password: admin123
```

---

**That's it!** You now have admin access to manage your Agri-Wealth platform! 🎉

