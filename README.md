<<<<<<< HEAD

# 🚀 User Management System

<div align="center">
  


A full-stack application for managing user accounts with advanced features and security.

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

## 📋 Table of Contents
- [Live Demos](#-live-demos)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#-configuration)
- [Database Access](#-database-access)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [First Login](#-first-login)
- [Contributing](#-contributing)
- [Team](#-team)

## 🌐 Live Demos
- **Frontend**: [https://user-management-system-angular-master.vercel.app](https://user-management-system-angular-master.vercel.app)
- **Backend API**: [https://user-management-system-angular-master-production.up.railway.app](https://user-management-system-angular-master-production.up.railway.app)

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration with Email Verification
- JWT Authentication with Refresh Tokens
- Role-Based Access Control (Admin/User)
- Password Reset via Email
- Account Status Management (Active/Inactive)
- First-time admin account auto-creation (no verification needed)

### 📱 User Interface
- Modern and Responsive Design
- User-friendly Dashboard
- Account Management Interface
- Profile Settings
- Admin Control Panel

### 🛡️ Security
- Password Encryption with bcryptjs
- Token-based Authentication
- Secure Email Verification via SMTP
- Session Management
- Input Validation with Joi

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 17
- **UI Library**: Bootstrap 5
- **Icons**: Font Awesome 6
- **HTTP Client**: Angular HttpClient
- **Forms**: Reactive Forms
- **Routing**: Angular Router
- **Hosting**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Email**: Nodemailer (Gmail SMTP)
- **Validation**: Joi
- **Documentation**: Swagger UI
- **Hosting**: Railway

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL
- npm or yarn
- Angular CLI
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JJAYTECH/Full-Stack-Application-User-management.git
   cd Full-Stack-Application-User-management
Backend Setup

bash
Copy
Edit
cd backend
npm install
Frontend Setup

bash
Copy
Edit
cd frontend
npm install
⚙️ Configuration
Email Configuration
Go to your Google Account settings

Enable 2-Step Verification

Generate an App Password:

Go to Security → App Passwords

Select 'Mail' and your device

Copy the generated password

Update the SMTP_PASS in your .env file

🗄️ Database Access (MySQL)
You can connect to your remote MySQL server using this command:

bash
Copy
Edit
mysql -h 153.92.15.31 -u u875409848_canete -p u875409848_canete
Then enter the password when prompted:

pgsql
Copy
Edit
Password: 9T2Z5$3UKkgSYzE
Replacing Database Config in Code
Open your backend/config/config.json (or .env if using dotenv)

Replace the development configuration with:

json
Copy
Edit
{
  "username": "u875409848_canete",
  "password": "9T2Z5$3UKkgSYzE",
  "database": "u875409848_canete",
  "host": "153.92.15.31",
  "dialect": "mysql"
}
🔍 Common MySQL Commands
📋 List Tables
sql
Copy
Edit
SHOW TABLES;
View all users:
sql
Copy
Edit
SELECT id, email, firstName, lastName, role FROM accounts;
Add a new department:
sql
Copy
Edit
INSERT INTO departments (name, description, createdAt, updatedAt)
VALUES ('Engineering', 'Core development team', NOW(), NOW());
Update employee department:
sql
Copy
Edit
UPDATE employees SET departmentId = 1 WHERE id = 1;
Delete a request by ID:
sql
Copy
Edit
DELETE FROM requests WHERE id = 5;
Get all active employees:
sql
Copy
Edit
SELECT * FROM employees WHERE status = 'active';
📚 API Documentation
https://user-management-system-angular-master-production.up.railway.app/api-docs

🌐 Deployment
Backend Deployment (Railway)
Connect your GitHub repository to Railway

Select the backend directory

Configure environment variables or use config.json

Deploy

Frontend Deployment (Vercel)
Connect your GitHub repository to Vercel

Select the frontend directory

Configure build settings:

Build Command: npm run build

Output Directory: dist/frontend

Deploy

🔑 First Login
The system automatically creates an admin account on first launch

Subsequent accounts require email verification

Email notifications are sent via Gmail SMTP (sender: huntersungjinwoo321@gmail.com)

Admin account:
Email: drewgigants@gmail.com
Password: asd123

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

👥 Team
Canete Jr. Ernesto

Matthew Roldan

Jammy Rivas

<div align="center"> © 2025 User Management System | MIT License </div> ```
=======
<<<<<<< HEAD
# User Management System

Diaz_Backend Branch

Frontend - https://full-stack-application-user-management.vercel.app
Backend - https://full-stack-application-user-management.onrender.com

## Overview

This is a comprehensive User Management System built with a modern tech stack. The application provides a complete solution for managing users, employees, departments, workflows, and requests. It features a responsive frontend with dark mode UI and a secure, scalable backend API.

## Project Structure

The project is organized into two main components:

- **`/frontend`** - Angular 15 application
- **`/backend`** - Node.js RESTful API

## Technology Stack

### Frontend
- Angular 15.2.0
- RxJS 7.8.2
- Socket.IO Client
- TypeScript 4.9.5
- Bootstrap (with dark mode theming)

### Backend
- Node.js with Express
- MySQL/PostgreSQL with Sequelize ORM
- JWT Authentication
- Swagger API Documentation

## Features

- **User Authentication**
  - Login/Register
  - Email verification
  - Password reset
  - JWT with refresh token mechanism
  - Role-based access control

- **Employee Management**
  - Employee profiles
  - Department assignment
  - Transfer workflows

- **Department Management**
  - Create/edit departments
  - Assign employees to departments
  - Track department statistics

- **Request System**
  - Equipment requests
  - Resource allocation
  - Approval workflows

- **Workflow Management**
  - Status tracking
  - Approval processes
  - Activity logging

- **Admin Dashboard**
  - User statistics
  - System overview
  - Administrative controls

- **Modern UI**
  - Dark mode support
  - Responsive design
  - Intuitive navigation

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MySQL or PostgreSQL database
- NPM or Yarn

### Setting Up the Backend
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your database in `config.json`
4. Start the server:
   ```
   npm start
   ```
   
The backend API will be available at http://localhost:4000 and Swagger documentation at http://localhost:4000/api-docs

### Setting Up the Frontend
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

The frontend application will be available at http://localhost:4200

## Development

For backend development with auto-reload:
```
cd backend
npm run dev
```

For frontend development:
```
cd frontend
npm start
```

## Deployment

The project includes Docker support for containerized deployment. For production deployment, set the appropriate environment variables in the backend's `.env` file or through your deployment platform.
=======
# Full-Stack-Application-User-management
>>>>>>> frontend-backend_CANETE
>>>>>>> frontend-backend_CANETE
