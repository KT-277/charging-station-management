Charging Station Management System
Overview
This is a full-stack web application for managing electric vehicle charging stations. The frontend is built with Vue.js, Tailwind CSS, Font Awesome, Leaflet for maps, and Vue Toastification for notifications. The backend is a Node.js/Express API with MongoDB for data storage, handling user authentication and charger management.
Features

User Authentication: Register and login with username, password, full name, and email.
Charger Management: Add, edit, delete, and filter charging stations (name, location, status, power output, connector type).
Map View: Display charging stations on an interactive map using Leaflet.
Responsive Design: Full-screen layout with green theme, Poppins font, and optimized for mobile, tablet, and PC.
Toast Notifications: Success/error messages for user actions.

Project Structure
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chargers.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── main.css
│   │   ├── components/
│   │   │   ├── Login.vue
│   │   │   ├── ChargerList.vue
│   │   │   └── MapView.vue
│   │   └── App.vue
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md

Prerequisites

Node.js (v16 or later)
MongoDB Atlas account
Git
GitHub account
Render account

Setup Instructions
Backend

Navigate to backend:cd backend


Install dependencies:npm install


Create a .env file:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/charging_station?retryWrites=true&w=majority
JWT_SECRET=your-secure-jwt-secret
PORT=5000


Start the backend:npm start



Frontend

Navigate to frontend:cd frontend


Install dependencies:npm install


Update API base URL in Login.vue, ChargerList.vue, and MapView.vue to point to the deployed backend (e.g., https://charging-station-backend.onrender.com).
Start the frontend:npm run dev



Deployment
Frontend (GitHub Pages)

Build the frontend:cd frontend
npm run build


Configure vite.config.js with base: '/charging-station-management/'.
Use GitHub Actions workflow (.github/workflows/deploy-frontend.yml) to deploy to GitHub Pages.
Access at https://github.com/KT-277/charging-station-management.

Backend (Render)

Create a MongoDB Atlas cluster and get the connection string.
Deploy the backend directory on Render with environment variables (MONGODB_URI, JWT_SECRET, PORT).
Access API at https://charging-station-backend.onrender.com.

API Endpoints

POST /api/auth/register: Register a user (username, password, fullName, email).
POST /api/auth/login: Login and get JWT token.
GET /api/chargers: List all chargers.
POST /api/chargers: Add a charger (requires JWT).
PUT /api/chargers/:id: Update a charger (requires JWT).
DELETE /api/chargers/:id: Delete a charger (requires JWT).

Technologies

Frontend: Vue.js, Tailwind CSS, Font Awesome, Leaflet, Vue Toastification
Backend: Node.js, Express, MongoDB, JWT, bcrypt
Deployment: GitHub Pages (frontend), Render (backend), MongoDB Atlas (database)

Testing

Frontend: Access the deployed URL and test login, registration, charger management, and map view.
Backend: Use Postman to test API endpoints (e.g., register, login, CRUD chargers).
Database: Verify data in MongoDB Atlas (users, chargers collections).

License
MIT License
Contact
For issues, contact [krishitharani@gmail.com].
