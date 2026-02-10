
## UI Preview

### Login
![Login Page](./photos/login.png)

### Register
![Register Page](./screenshots/register.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

## Features
- JWT-based authentication (Register / Login / Logout)
- Protected dashboard routes
- User profile fetched from backend
- Full CRUD operations on tasks
- Search and filter functionality
- Client-side and server-side form validation
- Responsive UI using TailwindCSS

## Tech Stack
**Frontend**
- React.js
- TailwindCSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt for password hashing

## Security Practices
- Passwords hashed using bcrypt
- JWT-based authentication middleware
- Protected API routes
- Input validation on both client and server

## Scalability Notes
- Centralized API layer on frontend
- Modular backend architecture (routes, middleware, models)
- Easily extendable for role-based access control
- Can be scaled using:
  - Refresh tokens & HTTP-only cookies
  - Redis caching
  - Docker & CI/CD pipelines
  - API Gateway and rate limiting

## How to Run Locally
1. Clone the repository
2. Run backend:
3.  Run frontend:

