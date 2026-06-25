# Electro Pi — Project & Task Management API

A TypeScript-based backend API for project and task management, built with Express, MongoDB, Mongoose, JWT auth, and email verification support.

## Features

- User registration with email verification and password hashing
- User login returning JWT access and refresh tokens
- Protected project and task routes requiring valid JWT
- Create, read, update, delete projects
- Create, read, update, delete tasks inside projects
- Task filtering by status and priority
- Pagination support on list endpoints
- Role-based access control for delete operations (Admin-only)
- Email sending using Nodemailer for verification
- Seed script to populate demo user, project, and tasks

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Zod validation
- Nodemailer email sending
- Redis connection support

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance or Atlas cluster
- Redis instance (optional but configured)

### Install dependencies

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

### Run the app

```bash
npm run start
```

The server starts on the port configured in `.env`.

### Seed demo data

```bash
npm run seed
```

This script creates a demo admin user, a sample project, and sample tasks.

## API Endpoints

### Auth

- `POST /api/v1/auth/registration`
  - Body: `{ name, email, password, confirmPassword }`
- `POST /api/v1/auth/verify_email`
  - Body: `{ email, code }`
- `POST /api/v1/auth/login`
  - Body: `{ email, password }`

### Projects

All project endpoints require `Authorization: Bearer <token>`.

- `POST /api/v1/projects/createProject`
  - Body: `{ title, description, status }`
- `GET /api/v1/projects/memberProject`
  - Query: `?page=1&limit=10`
- `GET /api/v1/projects/getProjectById/:id`
- `PATCH /api/v1/projects/updateProject/:id`
  - Body: `{ title?, description?, status? }`
- `DELETE /api/v1/projects/daleteProject/:id`
  - Admin only

### Tasks

All task endpoints require `Authorization: Bearer <token>`.

- `POST /api/v1/tasks/createTask/:projectId`
  - Body: `{ title, description }`
- `GET /api/v1/tasks/getProjectTasks/:id`
  - Query: `?page=1&limit=10`
- `GET /api/v1/tasks/getTaskById/:id`
- `PATCH /api/v1/tasks/updateTask/:id`
  - Body: `{ title?, description?, status?, priority?, dueDate? }`
- `DELETE /api/v1/tasks/deleteTask/:id`
  - Admin only
- `GET /api/v1/tasks/filterTasks/:projectId`
  - Query: `?status=pending&priority=High`

## Environment Variables

See `.env.example` for required configuration.

## Notes

- Passwords are hashed using `bcrypt` before saving.
- JWT configuration supports admin and member token secrets.
- Email verification uses Gmail credentials via Nodemailer.
- The application is organized in layered architecture: routes → controllers → services → models.

## Useful Commands

- `npm install` — install dependencies
- `npm run start` — run the server
- `npm run seed` — seed demo data

