# 🧴 SkinBuddy Backend

This is the backend API for **SkinBuddy**, a skincare-focused eCommerce web application. It handles authentication, user management, product and category management, cart and order operations, and more using Node.js, Express, and MongoDB.

🌐 **Frontend Live Site**: [https://skin-buddy-chi.vercel.app/](https://skin-buddy-chi.vercel.app/)

---

## 🧩 Key Features

- 🔐 JWT-based User Authentication
- 📦 Product & Category Management 
- 🛒 Cart Functionality
- 📬 Order Management
- 📁 File Upload Support 
- 🧪 API tested via Postman (and integrated with frontend)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer** for file uploads 
- **CORS** and **dotenv** for environment management

---

## 📁 Folder Structure

/backend
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # API route definitions
├── middleware/ # Authentication middleware
├── utils/ # Helper functions
├── uploads/ # Uploaded files (if any)
├── .env # Environment variables
├── index.js # Entry point
└── package.json
