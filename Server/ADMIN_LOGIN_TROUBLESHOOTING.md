# Admin Login Troubleshooting Guide

## 🔍 Common Issues and Solutions

### Issue 1: "Invalid credentials"

**Possible causes:**
- Admin user doesn't exist in database
- Wrong password
- Wrong email

**Solution:**
1. **Check if admin exists:**
   ```bash
   cd Server
   npm run test-admin
   ```

2. **If admin doesn't exist, create it:**
   ```bash
   npm run create-admin
   ```

3. **Verify credentials:**
   - Email: `admin@agriwealth.com`
   - Password: `admin123` (default)
   - **Make sure you selected "Admin" role in the dropdown!**

---

### Issue 2: "Invalid role"

**Cause:** You selected the wrong role in the login form.

**Solution:**
1. Make sure you select **"Admin"** in the role dropdown
2. The role must match what's in the database
3. Check the role with: `npm run test-admin`

---

### Issue 3: "User not found"

**Cause:** Admin account doesn't exist in MongoDB.

**Solution:**
```bash
cd Server
npm run create-admin
```

---

### Issue 4: Password doesn't work

**Possible causes:**
- Password was changed
- Wrong password entered
- Password has special characters

**Solution:**
1. **Test the password:**
   ```bash
   npm run test-admin
   ```

2. **If password was changed:**
   - Use the password you set
   - Or create a new admin account

3. **Reset admin password:**
   - Delete the admin user from MongoDB
   - Run `npm run create-admin` again

---

## ✅ Step-by-Step Login Process

### Step 1: Verify Admin Exists
```bash
cd Server
npm run test-admin
```

This will show:
- ✅ If admin exists
- ✅ If password is correct
- ✅ If role is correct

### Step 2: Start Backend
```bash
cd Server
npm run dev
```

Make sure you see:
```
MongoDB Connected: ...
Server running on port 5000
```

### Step 3: Start Frontend
```bash
cd Client
npm run dev
```

### Step 4: Login
1. Go to: `http://localhost:5173/login`
2. **IMPORTANT:** Select **"Admin"** in the role dropdown
3. Enter email: `admin@agriwealth.com`
4. Enter password: `admin123`
5. Click "Sign In"

---

## 🧪 Test Admin Login

### Method 1: Use Test Script
```bash
cd Server
npm run test-admin
```

### Method 2: Test via API
```bash
# Using curl
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@agriwealth.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Method 3: Check MongoDB Directly
1. Go to MongoDB Atlas
2. Browse Collections → `users`
3. Find user with email: `admin@agriwealth.com`
4. Check:
   - `role` field = `"admin"`
   - `email` is correct
   - User exists

---

## 🔧 Quick Fixes

### Fix 1: Create Admin (If Missing)
```bash
cd Server
npm run create-admin
```

### Fix 2: Reset Admin Password
1. Delete admin user from MongoDB
2. Run: `npm run create-admin`

### Fix 3: Check Role in Database
1. Open MongoDB Atlas
2. Find user: `admin@agriwealth.com`
3. Verify `role` = `"admin"`
4. If not, update it to `"admin"`

---

## 📋 Default Admin Credentials

After running `npm run create-admin`:

- **Email:** `admin@agriwealth.com`
- **Password:** `admin123`
- **Role:** `admin`

⚠️ **Change password after first login!**

---

## 🐛 Debug Checklist

Check each item:

- [ ] Backend server is running (`npm run dev` in Server folder)
- [ ] Frontend server is running (`npm run dev` in Client folder)
- [ ] MongoDB connection is working
- [ ] Admin user exists in database (`npm run test-admin`)
- [ ] Role is set to "admin" in database
- [ ] Password is correct (default: `admin123`)
- [ ] Selected "Admin" role in login form dropdown
- [ ] Email is correct: `admin@agriwealth.com`
- [ ] No typos in email or password
- [ ] Browser console shows no errors
- [ ] Network tab shows API call to `/api/auth/login`

---

## 🆘 Still Not Working?

### Check Backend Logs
Look at the terminal where backend is running for error messages.

### Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors

### Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to login
4. Check the `/api/auth/login` request:
   - Status code
   - Response body
   - Request payload

### Common Error Messages

**"Invalid credentials"**
- Wrong password or email
- User doesn't exist

**"Invalid role"**
- Wrong role selected in dropdown
- Role mismatch in database

**"Network error"**
- Backend not running
- CORS issue
- Wrong API URL

---

## ✅ Success Indicators

When login works, you should:
1. ✅ See redirect to `/admin/dashboard`
2. ✅ See admin dashboard with admin features
3. ✅ Token stored in localStorage
4. ✅ User data in AppContext

---

## 📞 Need More Help?

1. Run diagnostic: `npm run test-admin`
2. Check backend logs
3. Check browser console
4. Verify MongoDB connection
5. Test API directly with curl

**Most common issue:** Not selecting "Admin" role in the dropdown! Make sure you select it! 🎯

