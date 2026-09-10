

# Task Management System - Database Schema

## 1. Overview

The Task Management System uses PostgreSQL as the relational database.

SQLAlchemy is used as the ORM layer, and Alembic is used for database migrations.

Database tables:

1. users
2. tasks
3. comments
4. attachments
5. notifications
6. audit_logs

---

# 2. Entity Relationship Overview

```text
                    ┌─────────────────────┐
                    │       users         │
                    ├─────────────────────┤
                    │ id (PK)             │
                    │ full_name            │
                    │ email (UNIQUE)       │
                    │ hashed_password      │
                    │ role                 │
                    │ status               │
                    │ is_active            │
                    │ created_at           │
                    │ updated_at           │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              │               │                │
              ▼               ▼                ▼
        ┌───────────┐   ┌────────────┐   ┌──────────────┐
        │  tasks    │   │  comments  │   │notifications │
        └─────┬─────┘   └────────────┘   └──────────────┘
              │
       ┌──────┴─────────┐
       │                │
       ▼                ▼
┌──────────────┐  ┌──────────────┐
│  comments    │  │ attachments  │
└──────────────┘  └──────────────┘

users
  │
  └──────────────► audit_logs

  