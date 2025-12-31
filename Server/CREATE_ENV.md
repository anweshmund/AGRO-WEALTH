# How to Create .env File

## 📍 Location: Create in the `Server` folder

The `.env` file must be created **inside the `Server` directory**, at the same level as `server.js`.

```
AGRI-WEALTH/
└── Server/
    ├── .env          ← CREATE THIS FILE HERE
    ├── server.js
    ├── package.json
    └── ...
```

## 🎯 Method 1: Create Manually (Easiest)

1. Open the `Server` folder in your file explorer
2. Right-click → New → Text Document
3. Name it `.env` (make sure it starts with a dot)
4. If Windows asks about the extension, click "Yes"
5. Open the file and paste this content:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/agriwealth?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
FRONTEND_URL=http://localhost:5173
```

6. Replace the placeholder values (see below)
7. Save the file

## 🎯 Method 2: Using VS Code

1. Open the `Server` folder in VS Code
2. Click "New File" icon
3. Name it `.env`
4. Paste the content above
5. Replace placeholder values
6. Save (Ctrl+S)

## 🎯 Method 3: Using Terminal/Command Line

**Windows PowerShell:**
```powershell
cd Server
New-Item -Path .env -ItemType File
notepad .env
```

**Windows CMD:**
```cmd
cd Server
type nul > .env
notepad .env
```

**Mac/Linux:**
```bash
cd Server
touch .env
nano .env
```

## 📝 What to Put in .env

Copy this template and replace the values:

```env
# Server Port
PORT=5000

# Environment
NODE_ENV=development

# MongoDB Atlas Connection String
# Get this from MongoDB Atlas → Clusters → Connect → Connect your application
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/agriwealth?retryWrites=true&w=majority

# JWT Secret (any random string)
JWT_SECRET=agri_wealth_secret_key_2024_secure_random

# Frontend URL (where your React app runs)
FRONTEND_URL=http://localhost:5173
```

## 🔑 How to Get MongoDB Atlas Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in to your account
3. Click "Clusters" → Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `agriwealth`

**Example:**
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/agriwealth?retryWrites=true&w=majority
```

## ✅ Verify .env File is Created

After creating the file, check:
- File is named exactly `.env` (not `.env.txt` or `env`)
- File is in the `Server` folder
- File contains all required variables

## 🚀 Test It

Start your server:
```bash
cd Server
npm run dev
```

You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

If you see errors, check:
- `.env` file exists in `Server` folder
- All values are filled in (no `<username>` or `<password>` placeholders)
- No extra spaces around `=` signs
- MongoDB password is URL-encoded if it has special characters

## 🔒 Security Reminder

- ✅ `.env` is already in `.gitignore` (won't be committed)
- ❌ Never share your `.env` file
- ❌ Never commit `.env` to Git
- ✅ Use different values for production

