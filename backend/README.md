<<<<<<< HEAD
# User Management System (Node.js + PostgreSQL + Sequelize)

A full-stack backend system for managing user accounts, including registration, email verification, login/logout, password reset, and role-based access control.

---

## 🚀 Features

- ✅ User Registration with Email Verification
- 🔐 Login with JWT & Refresh Token support
- 🔁 Secure Token Rotation and Revocation
- 🛡️ Role-Based Authorization (Admin/User)
- 📩 Password Reset via Email
- 📄 API Documentation via Swagger UI
- 🔍 Input Validation with Joi
- 📦 Sequelize ORM for PostgreSQL

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** + **Sequelize**
- **JWT** + **bcryptjs**
- **Nodemailer** (Ethereal email)
- **Swagger UI** for API documentation
- **Thunder Client / Postman** for testing

---

## 📁 Project Structure


---

## locate the backend folder
```bash
cd backend
```

## ⚙️ Setup Instructions

### 1. 📦 Install dependencies

```bash
# Install base dependencies
npm install

# Install Express and middleware
npm install express dotenv body-parser cookie-parser cors rootpath

# Install Sequelize and PostgreSQL
npm install sequelize
npm install pg pg-hstore

# Install authentication and security
npm install bcryptjs jsonwebtoken express-jwt joi

# Install email and documentation
npm install nodemailer swagger-ui-express yamljs

# Install development dependencies
npm install --save-dev nodemon
```

### 2. 🐳 Docker Setup (Optional)

If you're using Docker, the Dockerfile is already configured with PostgreSQL dependencies. Build and run with:

```bash
# Build the Docker image
docker build -t groupk-backend .

# Run the container
docker run -p 4000:4000 groupk-backend
```

▶️ Run the app
```bash
npm run dev
Visit: http://localhost:4000
```

🔑 API Endpoints
Method | Endpoint | Description
POST | /accounts/register | Register new user
POST | /accounts/authenticate | Login
POST | /accounts/refresh-token | Refresh JWT
POST | /accounts/revoke-token | Revoke a refresh token
POST | /accounts/verify-email | Verify email with token
POST | /accounts/forgot-password | Request password reset
POST | /accounts/reset-password | Reset password via token
GET | /accounts/ | Admin: View all accounts
GET | /accounts/:id | View account by ID

📚 API Documentation
Visit: http://localhost:4000/api-docs/#/

🧪 Test User Registration
Example JSON body:
{
  "title": "Mr",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "password": "Test1234",
  "confirmPassword": "Test1234",
  "acceptTerms": true
}

📩 Email 
Use Real Email for Registering an Account. See the token on spam for the link of the token

👨‍💻 Made by
CANETE. 2025 🚀
=======
# User Management System - Backend

## Overview

This is the Node.js backend for the User Management System. It provides a RESTful API for managing users, employees, departments, workflows, and requests. The backend implements secure authentication, authorization, email verification, and data management functionality.

## Technology Stack

- **Node.js** with Express
- **MySQL/PostgreSQL** database with Sequelize ORM
- **JWT** for authentication with refresh tokens
- **bcryptjs** for password hashing
- **Nodemailer** for email services
- **Swagger UI Express** for API documentation

## Core Features

- JWT authentication with refresh token mechanism
- Role-based access control (Admin vs User roles)
- Email verification for user registration
- Password reset functionality
- CRUD operations for users, employees, departments, and requests
- Workflow management and approval system
- API documentation with Swagger

## API Endpoints

### Authentication Endpoints

- `POST /accounts/authenticate` - Authenticate user credentials
- `POST /accounts/refresh-token` - Refresh JWT using refresh token
- `POST /accounts/revoke-token` - Revoke refresh token (logout)
- `POST /accounts/register` - Register a new user account
- `POST /accounts/verify-email` - Verify email address
- `POST /accounts/forgot-password` - Request password reset
- `POST /accounts/validate-reset-token` - Validate password reset token
- `POST /accounts/reset-password` - Reset password using token

### Account Management Endpoints

- `GET /accounts` - Get all accounts (Admin only)
- `GET /accounts/:id` - Get account by ID
- `POST /accounts` - Create a new account (Admin only)
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

### Employee Endpoints

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create a new employee (Admin only)
- `PUT /employees/:id` - Update employee (Admin only)
- `DELETE /employees/:id` - Delete employee (Admin only)
- `POST /employees/:id/transfer` - Transfer employee to a different department (Admin only)

### Department Endpoints

- `GET /departments` - Get all departments
- `GET /departments/:id` - Get department by ID
- `POST /departments` - Create a new department (Admin only)
- `PUT /departments/:id` - Update department (Admin only)
- `DELETE /departments/:id` - Delete department (Admin only)

### Workflow Endpoints

- `GET /workflows` - Get all workflows
- `GET /workflows/employee/:employeeId` - Get workflows by employee ID
- `GET /workflows/:id` - Get workflow by ID
- `POST /workflows` - Create a new workflow
- `PUT /workflows/:id/status` - Update workflow status (Admin only)

### Request Endpoints

- `GET /requests` - Get all requests (Admin only)
- `GET /requests/employee/:employeeId` - Get requests by employee ID
- `GET /requests/:id` - Get request by ID
- `POST /requests` - Create a new request
- `PUT /requests/:id` - Update request (Admin only)
- `PUT /requests/:id/status` - Update request status (Admin only)
- `DELETE /requests/:id` - Delete request (Admin only)

### Analytics Endpoints

- `GET /accounts/analytics/user-stats` - Get user statistics (Admin only)
- `GET /accounts/analytics/online-users` - Get online users (Admin only)

## Project Structure

- `/accounts` - Account management and authentication logic
- `/employees` - Employee management routes and controllers
- `/departments` - Department management routes and controllers
- `/requests` - Request management routes and controllers
- `/workflows` - Workflow management routes and controllers
- `/_helpers` - Helper functions, database configuration, and utilities
- `/_middleware` - Authentication and error handling middleware
- `server.js` - Main application entry point
- `config.json` - Application configuration
- `swagger.yaml` - API documentation

## Database Models

- `Account` - User account information
- `Employee` - Employee information linked to user accounts
- `Department` - Department information
- `Workflow` - Workflow tracking for employee operations
- `Request` - Employee requests (equipment, leaves, etc.)
- `RefreshToken` - JWT refresh tokens for authentication

## Setup and Deployment

### Prerequisites

- Node.js (v14 or later)
- MySQL or PostgreSQL database

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Configure your database in `config.json`

3. Start the server:
   ```
   npm start
   ```

4. For development with auto-reload:
   ```
   npm run dev
   ```

## API Documentation

Swagger documentation is available at `/api-docs` when the server is running.

## Environment Variables

- `NODE_ENV` - Set to 'production' for production environment
- `PORT` - Server port (default: 4000)
- `SECRET` - JWT secret key
- `EMAIL_FROM` - Sender email address
- `EMAIL_SERVER` - SMTP server
- `EMAIL_PORT` - SMTP port
- `EMAIL_USERNAME` - SMTP username
- `EMAIL_PASSWORD` - SMTP password

## Docker Support

The project includes a Dockerfile for containerized deployment.
>>>>>>> frontend-backend_CANETE
