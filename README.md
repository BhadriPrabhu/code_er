# CODE ER

A coding assessment platform built for live test-taking, leaderboard tracking, and admin management.

## Overview

CODE ER is a React + Vite frontend with an Express + PostgreSQL backend. It is designed for coding contests and student assessments, where users can:
- log in
- take coding tests
- submit answers
- view their performance
- allow admins to manage participants and scores

## Features

- User login and role-based access
- Coding test interface
- Test submission and result tracking
- Admin dashboard for viewing and managing users
- Leaderboard and score management
- Persistent client state for current user session

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Zustand
- Tailwind CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- dotenv
- pg

## Setup Instructions

### 2. Install dependencies

cd client  
npm install

cd ../server  
npm install

### 3. Configure environment variables

Create a .env file inside the server folder:

PORT=5000  
DATABASE_URL=postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME

### 4. Start the backend

cd server  
npm start

### 5. Start the frontend

cd client  
npm run dev

## Environment

- Frontend runs on Vite dev server
- Backend runs on Express
- PostgreSQL database required

## Notes

- The current project stores user data in PostgreSQL.
- Passwords should be hashed before production use.
- CORS and authentication should be locked down before deployment.

## Author

**Bhadri Prabhu K**

## License

This project is currently for educational and internal use.

## Future Improvements

- Password hashing with bcrypt
- JWT authentication
- Secure admin authentication
- Production-ready CORS settings
- Docker support
- Automated testing
