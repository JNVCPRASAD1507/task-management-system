
# Task Management System - Architecture

## 1. Overview

The Task Management System is a full-stack web application designed to manage users, tasks, comments, attachments, notifications, dashboards, and audit logs.

The system uses:

- React
- TypeScript
- FastAPI
- Python
- PostgreSQL
- SQLAlchemy
- Alembic
- JWT Authentication
- REST APIs
- Pytest
- Postman

---

# 2. High-Level Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │   TypeScript + MUI   │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌──────────────────────┐
                    │     FastAPI API      │
                    │       Routers        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Services       │
                    │   Business Logic     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Repositories     │
                    │   Database Queries   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     SQLAlchemy ORM   │
                    │        Models        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │       Database       │
                    └──────────────────────┘

                    