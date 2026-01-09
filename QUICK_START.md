# Quick Start Guide

## 🚀 Get Your Backend Running in 5 Minutes

### Step 1: Install Dependencies
```bash
cd Server
npm install
```

### Step 2: Set Up MongoDB Atlas (Free)

1. **Create Account**: Go to https://www.mongodb.com/cloud/atlas and sign up (free)

2. **Create Cluster**: 
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `agriwealth` (or your choice)
   - Password: Create a strong password (save it!)
   - Click "Add User"

4. **Whitelist IP**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `agriwealth`

### Step 3: Configure Environment

1. **Create `.env` file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** and add:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://agriwealth:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/agriwealth?retryWrites=true&w=majority
   JWT_SECRET=change_this_to_a_random_string_12345
   FRONTEND_URL=http://localhost:5173
   ```

   **Generate JWT_SECRET** (optional):
   ```bash
   # On Mac/Linux:
   openssl rand -base64 32
   
   # Or just use any random string like: my_super_secret_key_2024
   ```

### Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
Environment: development
```

### Step 5: Test the API

Open your browser or use Postman/curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","message":"Agri-Wealth API is running",...}
```

### Step 6: Create Your First User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@agriwealth.com",
    "password": "admin123",
    "role": "admin",
    "phone": "+91 9876543210",
    "location": "India"
  }'
```

Save the `token` from the response - you'll need it for authenticated requests!

## ✅ You're All Set!

Your backend is now running and ready to connect to your frontend.

## Common Issues

**"MongoDB connection failed"**
- Check your connection string in `.env`
- Verify password is correct (no special characters need encoding)
- Make sure IP is whitelisted in MongoDB Atlas

**"JWT_SECRET is not defined"**
- Make sure `.env` file exists and has JWT_SECRET set

**"Port already in use"**
- Change PORT in `.env` to a different number (e.g., 5001)

## Next Steps

1. Update your frontend to use `http://localhost:5000` as the API base URL
2. Test authentication endpoints
3. Start creating projects and investments!

For detailed documentation, see [README.md](./README.md)

