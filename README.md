# CODE ER

A coding assessment platform for live test-taking, results tracking, and admin management.

## Overview

CODE ER is a full-stack assessment platform with a React + Vite frontend and an Express backend (PostgreSQL data store). It supports user login, timed coding tests, submissions, result tracking, and an admin dashboard for managing users and leaderboards.

## Key Features

*   **Anti-Cheat & Proctoring Engine:** Ensures assessment integrity by automatically detecting tab-switching and fullscreen exits, logging all monitoring events with precise timestamps.
*   **Rich Coding Environment:** Integrated with the Monaco code editor (the engine behind VS Code), providing a professional test-taking interface with support for multiple programming languages.
*   **Automated Evaluation & Leaderboards:** Automatically calculates scores based on expected outputs and generates dynamic, rank-sorted leaderboards to track performance history.
*   **Bulk Admin Operations:** Simplifies user management by allowing administrators to seamlessly onboard test-takers in bulk via Excel/CSV uploads and download comprehensive performance reports.
*   **Dynamic Assessment Control:** Gives admins granular control to assign specific question sets, set test duration constraints per user, and enforce strict start/end access windows.
*   **Secure Role-Based Access:** Features a hardened JWT-based authentication system (with 12-hour expiry) ensuring strict separation between standard test-takers and administrative dashboards.

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

## Author

Originally created by Bhadri Prabhu K - https://github.com/BhadriPrabhu
