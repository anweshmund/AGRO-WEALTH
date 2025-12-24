# Agri Wealth - Frontend Application

A modern, interactive React.js frontend for a farmer support and investment platform.

## Features

### User Roles

1. **Farmer**
   - Create and manage farm projects
   - Track funding progress
   - View investor interest
   - Manage notifications

2. **Investor**
   - Browse available projects
   - Filter by crop, location, and investment range
   - Invest in projects
   - Track investment portfolio
   - Bookmark favorite projects

3. **Admin**
   - Approve/reject projects
   - Manage platform content
   - Post agriculture news
   - View platform statistics

## Tech Stack

- **React.js** - UI framework
- **React Router DOM** - Routing
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Recharts** - Charts (for future use)
- **React Icons** - Icon library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Demo Credentials

### Farmer
- Email: `john@example.com`
- Password: (any)
- Role: Farmer

### Investor
- Email: `sarah@example.com`
- Password: (any)
- Role: Investor

### Admin
- Email: `admin@agriwealth.com`
- Password: (any)
- Role: Admin

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React Context for state management
├── data/          # Mock data
└── App.jsx        # Main app component with routing
```

## Features Implemented

✅ Landing page with hero section
✅ Role selection page
✅ Login/Signup pages
✅ Farmer dashboard with project management
✅ Investor dashboard with filtering and investment
✅ Admin dashboard with project approval
✅ Project listing and detail pages
✅ News & updates page
✅ About, Contact, Profile pages
✅ 404 error page
✅ Responsive design
✅ Interactive UI with animations
✅ Mock data integration

## Notes

- All data is mock/static data stored in JSON format
- No backend integration - ready for backend connection
- Authentication is simulated (no real auth logic)
- All interactions update local state only
