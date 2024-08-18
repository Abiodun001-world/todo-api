# Simple Todo API with Node.js and PostgreSQL

## Description

This project implements a simple Todo API with CRUD operations, user authentication, and PostgreSQL as the database.

## Features

- User registration, login, logout, password reset, and forgot password functionality
- CRUD operations on todo items
- User authentication via JWT tokens
- Secure password storage with bcrypt
- Test coverage with Jest and Supertest

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abiodun001-world/todo-api.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with your environment variables:
   ```env
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

4. Create the database and tables by running:
   ```bash
   node initDb.js
   ```

## Running the Application

To start the server, run:
```bash
npm start
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Auth Endpoints

- **POST** `/auth/signup`: Register a new user
  - Request Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully", "token": "JWT token" }`

- **POST** `/auth/signin`: Log in a user
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "message": "User signed in successfully", "token": "JWT token" }`

- **POST** `/auth/signout`: Log out a user
  - Response: `{ "message": "User signed out successfully" }`

- **POST** `/auth/reset-password`: Reset a user's password (requires authentication)
  - Request Body: `{ "email": "string", "newPassword": "string" }`
  - Response: `{ "message": "Password reset successfully" }`

- **POST** `/auth/forgot-password`: Send a password reset link to a user
  - Request Body: `{ "email": "string" }`
  - Response: `{ "message": "Password reset link sent" }`

### Todo Endpoints

- **POST** `/api/todos`: Create a new todo (requires authentication)
  - Request Body: `{ "title": "string", "description": "string" }`
  - Response: `{ "id": "number", "title": "string", "description": "string" }`

- **GET** `/api/todos`: Get all todos for the authenticated user
  - Response: `[ { "id": "number", "title": "string", "description": "string" } ]`

- **GET** `/api/todos/:id`: Get a specific todo by ID (requires authentication)
  - Response: `{ "id": "number", "title": "string", "description": "string" }`

- **PUT** `/api/todos/:id`: Update a todo by ID (requires authentication)
  - Request Body: `{ "title": "string", "description": "string" }`
  - Response: `{ "id": "number", "title": "string", "description": "string" }`

- **DELETE** `/api/todos/:id`: Delete a todo by ID (requires authentication)
  - Response: `{ "message": "Todo deleted successfully" }`

## Running Tests

To run tests, use:
```bash
npm test
```