# Social Media Platform - Full Stack Project

**Team Members:** Enguerrand, Romain, Olivier

## Live Deployment

- **Frontend**: [https://hackaton-project-frontend.vercel.app/](https://hackaton-project-frontend.vercel.app/)
- **Backend API**: [https://hackaton-project-backend.vercel.app/](https://hackaton-project-backend.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Authentication System](#authentication-system)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Scripts](#scripts)
- [Production Build](#production-build)

---

## Overview

This is a full-stack social media platform built with a **Node.js/Express backend** and **Vue 3 frontend** in a monorepo structure. Users can register, authenticate, create posts, comment, and interact with content.

### Key Features

- User authentication with JWT tokens
- Create, read, update, and delete posts
- Comment system on posts
- User profile management
- Responsive UI with Tailwind CSS
- Type-safe codebase with TypeScript

---

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Language**: TypeScript (v5.9.3)
- **Database**: MongoDB with Mongoose ODM (v8.19.1)
- **Authentication**: Custom JWT implementation
- **Validation**: Zod (v4.1.12)
- **Password Hashing**: bcrypt (v6.0.0)
- **Dependency Injection**: tsyringe (v4.10.0)
- **Scheduling**: node-cron (v4.2.1)

### Frontend

- **Framework**: Vue 3 (v3.5.22) with Composition API
- **Build Tool**: Vite (v7.1.7)
- **Language**: TypeScript (v5.9.0)
- **Styling**: Tailwind CSS v4 (v4.1.14)
- **State Management**: Pinia (v3.0.3) with persistence
- **Routing**: Vue Router (v4.5.1)
- **HTTP Client**: Axios (v1.12.2)
- **UI Components**: Reka UI (v2.5.1) + Radix Vue (v1.9.17)
- **Icons**: Lucide Vue Next (v0.545.0)

---

## Project Structure

```
hackaton-project/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express app entry point
│   │   ├── config/                # Database configuration
│   │   ├── controllers/           # Request handlers
│   │   ├── services/              # Business logic layer
│   │   ├── models/                # Mongoose schemas
│   │   ├── middlewares/           # Auth & error handling
│   │   ├── routes/                # API endpoints
│   │   ├── schemas/               # Zod validation schemas
│   │   ├── types/                 # TypeScript interfaces
│   │   ├── errors/                # Custom error classes
│   │   ├── schedulers/            # Scheduled tasks (token cleanup)
│   │   └── seeders/               # Database seeding
│   ├── dist/                      # Compiled JavaScript
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── main.ts                # Vue app entry
│   │   ├── App.vue                # Root component
│   │   ├── api/                   # API client functions
│   │   ├── views/                 # Page components
│   │   ├── components/            # Reusable UI components
│   │   ├── router/                # Vue Router config
│   │   ├── stores/                # Pinia stores
│   │   ├── types/                 # TypeScript interfaces
│   │   ├── lib/                   # Utilities
│   │   └── assets/                # Static assets
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env
│
├── CLAUDE.md                      # Project guidelines
└── README.md
```

---

## Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas)

### Clone Repository

```bash
git clone <repository-url>
cd hackaton-project
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/hackaton-db
TOKEN_SECRET=your-secret-key-here
TOKEN_EXPIRY=1
NODE_ENV=development
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_BASE_URL=http://localhost:3000
```

---

## Development

### Start Backend Development Server

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:3000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Database Operations

```bash
cd backend

# Initialize database
npm run db:init

# Seed database with demo data
npm run db:seed

# Test database connection
npm run db:connect

# Drop database (caution!)
npm run db:drop
```

---

## API Documentation

### Base URL

- **Local**: `http://localhost:3000/api`
- **Production**: `https://hackaton-project-backend.vercel.app/api`

### Authentication

Protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

---

### User Routes

#### Register User

```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstname": "John",
  "lastname": "Doe",
  "avatar": "https://example.com/avatar.jpg",  // optional
  "description": "User bio"                     // optional
}
```

**Response (201 Created):**

```json
{
  "message": "User created",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "avatar": "https://example.com/avatar.jpg",
    "description": "User bio",
    "createdAt": "2025-10-19T...",
    "updatedAt": "2025-10-19T..."
  }
}
```

#### Login User

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "message": "User logged in",
  "user": { ... },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Logout User

```http
POST /api/users/logout
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "message": "User logged out"
}
```

#### Get All Users

```http
GET /api/users
```

**Response (200 OK):**

```json
{
  "users": [
    {
      "_id": "...",
      "email": "user@example.com",
      "firstname": "John",
      "lastname": "Doe",
      ...
    }
  ]
}
```

#### Get User by ID

```http
GET /api/users/:userId
```

#### Update User

```http
PUT /api/users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstname": "Jane",
  "description": "Updated bio"
}
```

**Note**: Users can only update their own profile.

#### Delete User

```http
DELETE /api/users/:userId
Authorization: Bearer <token>
```

**Note**: Users can only delete their own account. Deletes all associated posts.

---

### Post Routes

#### Get All Posts

```http
GET /api/posts
```

**Response (200 OK):**

```json
{
  "posts": [
    {
      "_id": "...",
      "title": "My First Post",
      "content": "Post content here...",
      "userId": {
        "_id": "...",
        "firstname": "John",
        "lastname": "Doe",
        "email": "user@example.com",
        "avatar": "..."
      },
      "createdAt": "2025-10-19T...",
      "updatedAt": "2025-10-19T..."
    }
  ]
}
```

Posts are sorted by creation date (newest first) and populate user details.

#### Get Post by ID

```http
GET /api/posts/:postId
```

#### Create Post

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Post Title",
  "content": "Post content here..."
}
```

**Response (201 Created):**

```json
{
  "message": "Post created",
  "post": { ... }
}
```

#### Update Post

```http
PUT /api/posts/:postId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Note**: Users can only update their own posts.

#### Delete Post

```http
DELETE /api/posts/:postId
Authorization: Bearer <token>
```

**Note**: Users can only delete their own posts.

---

### Comment Routes

#### Get All Comments

```http
GET /api/comments
```

#### Get Comment by ID

```http
GET /api/comments/:commentId
```

#### Create Comment

```http
POST /api/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "postId": "...",
  "content": "Great post!"
}
```

#### Update Comment

```http
PUT /api/comments/:commentId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated comment"
}
```

**Note**: Users can only update their own comments.

#### Delete Comment

```http
DELETE /api/comments/:commentId
Authorization: Bearer <token>
```

**Note**: Users can only delete their own comments.

---

### Health Check

```http
GET /
```

**Response:**

```json
{
  "message": "API is running"
}
```

---

## Authentication System

### Custom JWT Implementation

The platform uses a custom JWT authentication system:

1. **User Registration/Login**: User provides email and password
2. **Password Validation**: Password verified using bcrypt
3. **Token Generation**: JWT token created with payload containing:
   - `userId`: User's MongoDB ObjectId
   - `expiresAt`: Token expiration timestamp
   - `ipAdress`: User's IP address
   - `userAgent`: User's browser/device info
4. **Token Storage**: Token is hashed and stored in MongoDB `Token` collection
5. **Client Storage**: Raw token sent to client (stored in Pinia store + localStorage)
6. **Request Authentication**: Client sends token in `Authorization: Bearer <token>` header
7. **Token Verification**: `AuthMiddleware.authenticate()` verifies token on protected routes
8. **Token Expiry**: Tokens expire after 1 hour (configurable via `TOKEN_EXPIRY`)
9. **Cleanup**: Scheduled task periodically removes expired tokens

### Authorization

- Service-layer authorization ensures users can only modify their own resources
- Controllers validate ownership before update/delete operations
- Example: `UserService.updateUser()` verifies `user._id === userId`

---

## Database Schema

### User Collection

```typescript
{
  _id: ObjectId,
  email: string,           // unique, lowercase, required
  password: string,        // hashed with bcrypt, required
  firstname: string,       // required
  lastname: string,        // required
  avatar?: string,         // optional
  description?: string,    // optional, max 500 chars
  createdAt: Date,         // auto-generated
  updatedAt: Date          // auto-generated
}
```

**Features**:
- Email must be unique
- Password automatically hashed on save
- Deleting a user cascades to delete all their posts

### Post Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId,        // ref to User, required
  title: string,           // required, max 100 chars
  content: string,         // required, max 1000 chars
  createdAt: Date,         // auto-generated
  updatedAt: Date          // auto-generated
}
```

**Features**:
- Post queries populate user details (firstname, lastname, email, avatar)
- Posts sorted by creation date (newest first)

### Comment Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId,        // ref to User, required
  postId: ObjectId,        // ref to Post, required
  content: string,         // required
  createdAt: Date,         // auto-generated
  updatedAt: Date          // auto-generated
}
```

### Token Collection

```typescript
{
  _id: ObjectId,
  token: string,           // hashed, required
  userId: ObjectId,        // ref to User, required
  expiresAt: Date,         // required
  ipAdress: string,        // required
  userAgent: string,       // required
  createdAt: Date,         // auto-generated
  updatedAt: Date          // auto-generated
}
```

**Features**:
- Tokens are hashed before storage
- Expired tokens automatically cleaned by scheduler

---

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/hackaton-db` |
| `TOKEN_SECRET` | Secret key for JWT signing | `your-secret-key-here` |
| `TOKEN_EXPIRY` | Token expiry in hours | `1` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | Backend API URL | `http://localhost:3000` |

---

## Architecture

### Backend Architecture

**Layered Architecture Pattern:**

```
HTTP Request → Route → Middleware → Controller → Service → Model → MongoDB
```

**Layers:**

1. **Routes** (`src/routes/`): Define API endpoints and attach middleware
2. **Middlewares** (`src/middlewares/`):
   - `AuthMiddleware`: JWT token verification for protected routes
   - `ErrorMiddleware`: Global error handling and formatting
3. **Controllers** (`src/controllers/`): Handle HTTP requests/responses, validate input with Zod
4. **Services** (`src/services/`): Business logic layer, authorization checks, data orchestration
5. **Models** (`src/models/`): Mongoose schemas defining MongoDB collections

**Dependency Injection:**
- Uses `tsyringe` for automatic dependency resolution
- Controllers decorated with `@injectable()`
- Services auto-resolved and injected into controllers

**Request Flow Example:**

```
POST /api/posts
  ↓
PostRoute
  ↓
AuthMiddleware.authenticate() → Verify JWT token
  ↓
PostController.createPost() → Validate with Zod schema
  ↓
PostService.createPost() → Business logic
  ↓
PostModel.create() → MongoDB operation
  ↓
Response sent to client
```

### Frontend Architecture

**Vue 3 Composition API with:**

- **Views** (`src/views/`): Full page components (Home, Login, Register)
- **Components** (`src/components/`): Reusable UI components
- **Router** (`src/router/`): Client-side routing configuration
- **Stores** (`src/stores/`): Pinia state management with persistence
- **API** (`src/api/`): HTTP client functions using Axios
- **Types** (`src/types/`): TypeScript interfaces for type safety

**State Management:**

```typescript
// Auth Store (src/stores/auth.ts)
{
  token: string | null,
  user: User | null,
  isAuthenticated: computed(() => !!token),
  setAuth(token, user),
  clearAuth()
}
```

- Persisted to localStorage via `pinia-plugin-persistedstate`
- Automatically restored on page refresh

---

## Scripts

### Backend Scripts

```bash
# Development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Initialize database
npm run db:init

# Seed database with demo data
npm run db:seed

# Test database connection
npm run db:connect

# Drop database (caution!)
npm run db:drop
```

### Frontend Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Type checking only
npm run type-check

# Build without type checking
npm run build-only

# Preview production build
npm run preview

# Lint and fix code
npm run lint

# Format code with Prettier
npm run format
```

---

## Production Build

### Backend

```bash
cd backend
npm run build    # Compiles TypeScript to dist/
npm start        # Runs compiled JavaScript
```

The compiled code is output to `backend/dist/` directory.

### Frontend

```bash
cd frontend
npm run build    # Builds optimized production bundle
npm run preview  # Preview production build locally
```

The production build is output to `frontend/dist/` directory.

### Deployment

This project is deployed on **Vercel**:

- **Frontend**: Automatically built and deployed from `frontend/` directory
- **Backend**: Automatically built and deployed from `backend/` directory

Both deployments use the respective `.env` files configured in Vercel's environment variables.

---

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "errors": [...],        // Validation errors (if applicable)
  "details": { ... }      // Additional error context
}
```

### Error Types

- **400 VALIDATION_ERROR**: Invalid request data (Zod validation failed)
- **401 UNAUTHORIZED**: Missing or invalid authentication token
- **403 FORBIDDEN**: User not authorized to perform action
- **404 NOT_FOUND**: Resource not found
- **409 CONFLICT**: Duplicate resource (e.g., email already exists)
- **500 INTERNAL_SERVER_ERROR**: Unexpected server error

### Custom Error Classes

Located in `backend/src/errors/`:

- `BaseError`: Base error factory
- `UserError`: User-related errors
- `PostError`: Post-related errors
- `CommentError`: Comment-related errors
- `TokenError`: Authentication errors
- `PasswordError`: Password validation errors
- `EmailError`: Email validation errors
- `ObjectIdError`: Invalid MongoDB ObjectId errors

---

## Validation

### Zod Schemas

Request validation is handled by Zod schemas defined in `backend/src/schemas/`.

**Example - User Registration Schema:**

```typescript
{
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
  avatar: z.string().url().optional(),
  description: z.string().max(500).optional()
}
```

**Example - Post Creation Schema:**

```typescript
{
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000)
}
```

Validation errors automatically return 400 status with detailed error messages.

---

## Scheduled Tasks

### Token Cleanup Scheduler

- **Location**: `backend/src/schedulers/token.scheduler.ts`
- **Purpose**: Automatically removes expired tokens from the database
- **Technology**: node-cron
- **Initialization**: Automatically started when the Express app boots

**Scheduler Structure:**

```
index.scheduler.ts (orchestrator)
  └── token.scheduler.ts (cleanup task)
```

---

## Code Style

- **TypeScript** throughout both frontend and backend
- **Backend**: CommonJS modules (`require`/`module.exports`)
- **Frontend**: ES modules (`import`/`export`)
- **Commit Messages**: Gitmoji convention (`:recycle:`, `:heavy_plus_sign:`, `:lipstick:`, etc.)
- **Code Formatting**: Prettier with ESLint

---

## Contributing

This is a hackathon project created by **Enguerrand**, **Romain**, and **Olivier**.

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes with descriptive commit messages (using gitmoji)
3. Test your changes locally (backend + frontend)
4. Create a pull request to `main`
5. Wait for review and merge

---

## License

This project is created for educational purposes.

---

## Support

For issues, questions, or contributions, please contact the team members:
- Enguerrand
- Romain
- Olivier
