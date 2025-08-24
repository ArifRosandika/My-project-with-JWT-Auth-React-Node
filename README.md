# My-project-with-JWT-Auth-React-Node
Full-stack authentication system built with React, Node.js, Express, and MySQL using JWT for secure login, token refresh, and protected routes.

🛡️ JWT Authentication with React & Node.js

A full-stack authentication system built using React (Frontend) and Node.js + Express (Backend) with JWT (JSON Web Token) for secure authentication.
This project demonstrates how to implement access tokens, refresh tokens, interceptors, and protected routes in a modern web application.

🚀 Features

🔑 User Authentication (Login, Logout, Register)

🔄 Token Refresh Mechanism (Access Token + Refresh Token)

🛡️ Protected API Routes with JWT Middleware

👤 User Dashboard with Secure Access

🌐 Axios Interceptor for Auto Token Refresh

🍪 HttpOnly Cookies for Refresh Token (more secure against XSS)

🗄️ MySQL Database Integration

🛠️ Tech Stack

> FRONTEND

⚛️ React (Hooks, useState, useEffect, react-router-dom)

📡 Axios (API requests + interceptors)

> BACKEND

🟢 Node.js + Express.js

🔑 JWT (jsonwebtoken)

🗄️ Sequelize ORM + MySQL

🍪 Cookie Parser (for HttpOnly refresh token)

🔄 CORS Middleware

📂 Project Structure
jwt-auth-app/
│
├── backend/               # Express.js Backend
│   ├── config/            # DB & JWT Config
│   ├── controllers/       # Authentication & User Controllers
│   ├── middleware/        # JWT Verification Middleware
│   ├── models/            # Sequelize Models (User, etc.)
│   ├── router/            # API Routes
|   ├── .env               # Secret Token
│   └── index.js           # Entry Point
|
│
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # UI Components
│   │   ├── pages/         # Login, Dashboard, Register, Navbar
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚡ Getting Started
1️⃣ Clone Repository
git clone https://github.com/ArifRosandika/FullStack_Project_With_Express&React.git
cd FullStack_Project_With_Express&React

2️⃣ Backend Setup
cd Backend
npm install


Configure your MySQL Database in /config/Database.js. Example:

const { Sequelize } = require("sequelize");
const db = new Sequelize("your table database name", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});


Run backend:

npm run dev

3️⃣ Frontend Setup
cd Frontend
npm install
npm start

🔑 API Endpoints
Method	Endpoint	Description
POST	/login	User login (returns token)
GET	/token	Refresh access token
GET	/users	Get all users (protected)
DELETE	/logout	Logout (clear refresh token)
🖥️ Demo Screenshots
Login Page

Dashboard

📚 Learning Purpose

This project was built as a learning project to understand:

- How JWT works in frontend & backend

- How to handle expired tokens automatically

- How to secure refresh tokens with HttpOnly cookies

- How to protect routes in React

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📜 License

This project is licensed under the MIT License.
