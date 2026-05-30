# CODE ER

A coding assessment platform for live test-taking, results tracking, and admin management.

## Overview

CODE ER is a full-stack assessment platform with a React + Vite frontend and an Express backend (PostgreSQL data store). It supports user login, timed coding tests, submissions, result tracking, and an admin dashboard for managing users and leaderboards.

## Tech stack

- Frontend: React, Vite, Axios, Zustand
- Styling: Tailwind CSS / plain CSS (project contains App.css / index.css)
- Backend: Node.js, Express
- Database: PostgreSQL (uses `pg`)
- Dev tooling: npm, dotenv

## Repository structure

- `client/` — React application (Vite)
	- `src/` — app source
		- `api/` — API helper(s)
		- `components/` — shared components
		- `screens/` — pages (login, test, admin, etc.)
		- `store/` — client state
- `server/` — Express backend
	- `controllers/` — route handlers
	- `routes/` — route definitions
	- `middleware/` — auth and helpers
	- `config/` — DB config (`config/db.js`)
	- `sample_data.txt`, `table.txt` — helper data files

## Quickstart

Requirements:

- Node.js (>=16) and npm
- PostgreSQL (local or remote)

1. Install dependencies (client and server):

```bash
cd client
npm install

cd ../server
npm install
```

2. Configure environment variables (see next section).

3. Start the backend (from `server/`):

```bash
cd server
npm start
```

4. Start the frontend (from `client/`):

```bash
cd client
npm run dev
```

Open the frontend at the Vite dev URL (normally http://localhost:5173) and the API at the backend `PORT` (default 5000).

## Environment variables

Create a `.env` file in `server/` with values similar to:

```
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
JWT_SECRET=your_jwt_secret_here
```
