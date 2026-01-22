# Blog API 📝✨

A comprehensive RESTful API for blog management built with Node.js and Express, featuring complete CRUD operations and secure authentication mechanisms. Perfect for learning backend development and building full-stack blog applications.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Blog Post Endpoints](#blog-post-endpoints)
  - [User Endpoints](#user-endpoints)
- [Authentication Flow](#authentication-flow)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Blog API is a practice project designed to master CRUD (Create, Read, Update, Delete) operations and authentication in a Node.js environment. It provides a robust backend system for managing blog posts, user authentication, and authorization.

## ✨ Features

### Core Functionality
- **Complete CRUD Operations**: Create, read, update, and delete blog posts
- **User Authentication**: Secure registration and login system
- **Authorization**: Role-based access control
- **JWT Tokens**: Secure token-based authentication
- **Password Encryption**: Bcrypt password hashing
- **Input Validation**: Request data validation
- **Error Handling**: Centralized error management

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Protected routes
- Input sanitization
- CORS enabled
- Rate limiting (optional)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Validation**: Express Validator
- **Architecture**: MVC Pattern

## 📁 Project Structure

```
BlogApi/
├── config/              # Configuration files (database, JWT settings)
├── controllers/         # Request handlers and business logic
├── database/            # Database connection and setup
├── middlewares/         # Custom middleware (auth, validation, error handling)
├── models/              # Database models/schemas
├── routes/              # API route definitions
├── utills/              # Utility functions and helpers
├── .gitignore          # Git ignore file
├── example.js          # Example usage/testing file
├── package.json        # Dependencies and scripts
├── package-lock.json   # Locked dependency versions
└── server.js           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **MongoDB** 
- **Postman** (for API testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Oluwakemilola/BlogApi.git
   cd BlogApi
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   Ensure your database server is running and create a new database for the project.

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/blogapi
# OR for PostgreSQL/MySQL
# DATABASE_URL=postgresql://user:password@localhost:5432/blogapi

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password
```

### Running the Application

**Development Mode:**
```bash
npm start
# or with nodemon
npm run dev
```

**Production Mode:**
```bash
npm run production
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

#### Logout
```http
GET /auth/logout
Authorization: Bearer {token}
```

### Blog Post Endpoints

#### Get All Posts
```http
GET /posts
```

**Query Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Number of posts per page
- `sort` (optional): Sort field (e.g., -createdAt)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  },
  "data": [
    {
      "id": "1",
      "title": "My First Blog Post",
      "content": "This is the content...",
      "author": {
        "id": "123",
        "name": "John Doe"
      },
      "createdAt": "2024-01-22T10:00:00Z",
      "updatedAt": "2024-01-22T10:00:00Z"
    }
  ]
}
```

#### Get Single Post
```http
GET /posts/:id
```

#### Create Post (Protected)
```http
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My New Blog Post",
  "content": "This is the content of my blog post...",
  "tags": ["nodejs", "express", "tutorial"],
  "category": "Technology"
}
```

#### Update Post (Protected)
```http
PUT /posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post (Protected)
```http
DELETE /posts/:id
Authorization: Bearer {token}
```

### User Endpoints

#### Get User Profile
```http
GET /users/:id
```

#### Update User Profile (Protected)
```http
PUT /users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Software developer..."
}
```

## 🔐 Authentication Flow

1. **User Registration**
   - User submits registration form
   - Password is hashed using bcrypt
   - User data is saved to database
   - JWT token is generated and returned

2. **User Login**
   - User submits credentials
   - Password is verified against hashed password
   - JWT token is generated and returned

3. **Protected Routes**
   - Client sends JWT token in Authorization header
   - Middleware verifies token
   - User data is attached to request object
   - Route handler processes the request

### Example Token Usage

```javascript
// In your frontend or API client
const token = 'your_jwt_token_here';

fetch('http://localhost:5000/api/v1/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Post content...'
  })
});
```

## 🗄 Database Models

### User Model

```javascript
{
  id: ObjectId/UUID,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  avatar: String,
  bio: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Post Model

```javascript
{
  id: ObjectId/UUID,
  title: String (required),
  content: String (required),
  author: ObjectId/UUID (ref: User),
  tags: [String],
  category: String,
  published: Boolean (default: true),
  views: Number (default: 0),
  likes: Number (default: 0),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Comment Model (Optional)

```javascript
{
  id: ObjectId/UUID,
  content: String (required),
  author: ObjectId/UUID (ref: User),
  post: ObjectId/UUID (ref: Post),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## 🛡️ Middleware

### Authentication Middleware

Located in `middlewares/auth.js`, this middleware:
- Verifies JWT tokens
- Attaches user data to request object
- Protects routes from unauthorized access

```javascript
const protect = async (req, res, next) => {
  // Verify token and attach user to request
};
```

### Authorization Middleware

```javascript
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user role is authorized
  };
};
```

### Validation Middleware

Located in `middlewares/validation.js`:
- Validates request body data
- Sanitizes input
- Returns validation errors

### Error Handler Middleware

Centralized error handling for consistent error responses.

## ⚠️ Error Handling

The API uses a centralized error handling system:

```json
{
  "success": false,
  "error": "Error message here",
  "statusCode": 400
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🧪 Testing

### Manual Testing with Postman

1. Import the API endpoints into Postman
2. Set up environment variables (base URL, token)
3. Test each endpoint with sample data

### Example Test File

Check `example.js` for usage examples and testing scenarios.

### Running Tests

```bash
npm test
```

## 📈 Learning Outcomes

This project demonstrates:
- ✅ RESTful API design principles
- ✅ CRUD operations implementation
- ✅ JWT authentication and authorization
- ✅ Password hashing and security
- ✅ Middleware usage in Express
- ✅ Database modeling and relationships
- ✅ Error handling best practices
- ✅ Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Oluwakemilola**

- GitHub: [@Oluwakemilola](https://github.com/Oluwakemilola)
- Project Link: [https://github.com/Oluwakemilola/BlogApi](https://github.com/Oluwakemilola/BlogApi)

## 🙏 Acknowledgments

- Built as a learning project for mastering CRUD operations and authentication
- Thanks to the Node.js and Express.js communities for excellent documentation

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [JWT.io](https://jwt.io/)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

⭐ **Star this repository** if you found it helpful for learning!

💬 **Questions or suggestions?** Feel free to open an issue!
