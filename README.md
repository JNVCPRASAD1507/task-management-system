
# Task Management System

A full-stack Task Management System built with **FastAPI, React, TypeScript, Material UI, PostgreSQL, JWT Authentication, and Docker**.

The application provides role-based task management for administrators, managers, and members.

---

## Features

### Authentication

- User registration
- User login
- JWT authentication
- Logout
- Current-user authentication
- Password validation
- Protected routes
- Role-based access control

### User Roles

The system supports three roles:

- Admin
- Manager
- Member

### User Management

Admins can:

- View users
- Create users
- Update users
- Delete users
- Change user roles
- Activate/deactivate users

### Task Management

Users can:

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Assign tasks
- Change task status
- Set task priority
- Set due dates
- Track task progress

### Comments

Users can:

- Add comments
- View comments
- Update comments
- Delete comments

### Attachments

Users can:

- Upload task attachments
- View attachments
- Download attachments
- Delete attachments

### Notifications

The application supports:

- Task notifications
- Assignment notifications
- Comment notifications
- Notification status
- Mark notification as read

### Dashboard

The dashboard provides:

- Task statistics
- Task status summary
- Priority information
- User-related information
- Recent activities

### Profile

Users can:

- View their profile
- Update their name
- Update their email
- View their role
- View account status

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- React Hook Form
- Zod
- Axios

## Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT
- PostgreSQL
- Pytest

## Development Tools

- Git
- GitHub
- Docker
- Docker Compose

---

# Project Structure

```text
task-management-system/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── types/
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
├── tests/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── README.md



                    ┌─────────────────────┐
                    │       Browser       │
                    │   React + TypeScript│
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
          ┌───────────┐ ┌───────────┐ ┌────────────┐
          │   Auth    │ │   Tasks   │ │   Users    │
          └───────────┘ └───────────┘ └────────────┘
                 │             │             │
                 └─────────────┼─────────────┘
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    └─────────────────────┘



