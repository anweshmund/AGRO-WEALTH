# Agri-Wealth Backend Server

Backend API server for the Agri-Wealth agricultural investment platform built with Node.js, Express, and MongoDB Atlas.

## Features

- 🔐 **Authentication & Authorization** - JWT-based authentication with role-based access control (Farmer, Investor, Admin)
- 👥 **User Management** - User registration, login, and profile management
- 🌾 **Project Management** - Create, update, delete, and approve/reject agricultural projects
- 💰 **Investment System** - Invest in projects, track investments, and manage returns
- 📰 **News Management** - Create and manage news articles
- 🔔 **Notifications** - Real-time notifications for users
- 💬 **Messaging** - Internal messaging system between users
- 📧 **Contact Form** - Contact form submissions
- ⭐ **Bookmarks** - Bookmark favorite projects

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

## Installation

### Step 1: Clone the repository

```bash
cd Server
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (choose the free tier)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
5. Whitelist your IP address:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP
6. Get your connection string:
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

### Step 4: Configure environment variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/agriwealth?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   FRONTEND_URL=http://localhost:5173
   ```

   **Important:**
   - Replace `<username>` and `<password>` with your MongoDB Atlas database user credentials
   - Replace `<cluster-url>` with your actual cluster URL
   - Change `JWT_SECRET` to a random secure string (you can generate one using: `openssl rand -base64 32`)
   - Update `FRONTEND_URL` if your frontend runs on a different port

### Step 5: Run the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Projects
- `GET /api/projects` - Get all projects (with optional query params: status, approved, farmerId, cropType, location)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Farmer/Admin)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PUT /api/projects/:id/approve` - Approve project (Admin)
- `PUT /api/projects/:id/reject` - Reject project (Admin)

### Investments
- `GET /api/investments` - Get investments (with optional query params: investorId, projectId, status)
- `GET /api/investments/:id` - Get single investment
- `POST /api/investments` - Create investment (Investor/Admin)
- `PUT /api/investments/:id` - Update investment (Admin)

### News
- `GET /api/news` - Get all news (with optional query params: category, limit)
- `GET /api/news/:id` - Get single news item
- `POST /api/news` - Create news (Admin)
- `PUT /api/news/:id` - Update news (Admin)
- `DELETE /api/news/:id` - Delete news (Admin)

### Notifications
- `GET /api/notifications` - Get user notifications (with optional query param: read)
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification

### Messages
- `GET /api/messages` - Get messages (with optional query param: type=sent|received)
- `GET /api/messages/:id` - Get single message
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete message

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (Admin)
- `PUT /api/contact/:id/replied` - Mark contact as replied (Admin)

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks
- `GET /api/bookmarks/check/:projectId` - Check if project is bookmarked
- `POST /api/bookmarks` - Toggle bookmark

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access Control

- **Farmer**: Can create and manage their own projects
- **Investor**: Can invest in projects and manage their investments
- **Admin**: Full access to all features including project approval/rejection

## Example API Requests

### Register a User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "farmer",
  "phone": "+91 9876543210",
  "location": "Punjab, India"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "role": "farmer"
}
```

### Create a Project (with authentication token)
```bash
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Organic Wheat Farm Expansion",
  "cropType": "Wheat",
  "location": "Punjab, India",
  "description": "Expanding organic wheat production...",
  "fundingGoal": 4000000,
  "duration": 12,
  "expectedReturn": 15,
  "image": "https://images.unsplash.com/..."
}
```

## Project Structure

```
Server/
├── config/
│   └── db.js              # Database configuration
├── controllers/           # Route controllers
│   ├── authController.js
│   ├── userController.js
│   ├── projectController.js
│   ├── investmentController.js
│   ├── newsController.js
│   ├── notificationController.js
│   ├── messageController.js
│   ├── contactController.js
│   └── bookmarkController.js
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/                # MongoDB models
│   ├── User.js
│   ├── Project.js
│   ├── Investment.js
│   ├── News.js
│   ├── Notification.js
│   ├── Message.js
│   ├── Contact.js
│   └── Bookmark.js
├── routes/                # API routes
│   ├── auth.js
│   ├── users.js
│   ├── projects.js
│   ├── investments.js
│   ├── news.js
│   ├── notifications.js
│   ├── messages.js
│   ├── contact.js
│   └── bookmarks.js
├── utils/
│   └── generateToken.js   # JWT token generation
├── .env.example           # Environment variables example
├── .gitignore
├── package.json
├── server.js              # Main server file
└── README.md
```

## Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "message": "Error message here"
}
```

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong JWT_SECRET** - Generate a random secure string
3. **Keep MongoDB credentials secure** - Don't share your connection string
4. **Use HTTPS in production** - Always use HTTPS for production deployments
5. **Validate input** - All endpoints validate required fields
6. **Password hashing** - Passwords are automatically hashed using bcrypt

## Deployment

### Deploying to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create agri-wealth-api`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```
5. Deploy: `git push heroku main`

### Deploying to Railway

1. Connect your GitHub repository
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Deploying to Render

1. Create a new Web Service
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

### JWT Token Issues
- Make sure JWT_SECRET is set in `.env`
- Verify token is included in Authorization header
- Check token expiration (default: 30 days)

### CORS Issues
- Update FRONTEND_URL in `.env` to match your frontend URL
- Check that CORS middleware is properly configured

## Support

For issues or questions, please check:
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
- Express.js documentation: https://expressjs.com/
- Mongoose documentation: https://mongoosejs.com/

## License

ISC

